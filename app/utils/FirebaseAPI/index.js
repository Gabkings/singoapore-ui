/* eslint-disable arrow-body-style,no-console */
import * as firebase from 'firebase';

const projectId = "sghomeneeds-chat";

const apiKey = "AIzaSyAtVSfKPPEuXRn6PagoWIVkaU7VnzvoNeE";

const defaultConfig = {
  apiKey,
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
  authDomain: `${projectId}.firebaseapp.com`,
  messagingSenderId: "61146949837",
  projectId,
};

export default class FirebaseAPI {
  constructor(config){
    const app = firebase.initializeApp(config || defaultConfig);
    this.app = app;
    this.user = null;
    this.deleteMessageHandler = null;
    this.addMessageHandler = null;
    this.editMessageHandler = null;
    this.handlers = {}
  };

  signIn = (token) => {
    return firebase.auth().signInWithCustomToken(token).then((cred) => {
      if (cred.user) {
        this.user = cred.user;
      }
      return cred;
    })
  };

  signOut = () => {
    return firebase.auth().signOut().then(() => {
      this.user = null;
    })
  };

  setHandler = (collection, changeType, handler) => {
    this.handlers[`${collection}_${changeType}`] = handler;
  };

  getHandler = (collection, changeType) => {
    return this.handlers[`${collection}_${changeType}`];
  };

  setAuthStateChangeHandler = (handler) => {
    // handler takes user as arg
    firebase.auth().onAuthStateChanged(handler);
  };

  getProfileUrl = () => firebase.auth().currentUser.photoURL || 'https://i.pravatar.cc/100'

  getUserName = () => firebase.auth().currentUser.displayName;

  isUserSignedIn = () => !!firebase.auth().currentUser;

  saveChannel = (channelObject) => {
    const { members } = channelObject;
    const channelId = Object.keys(members).map(m => m.toString()).sort().join('_')
    return firebase.firestore().collection('channels').doc(channelId).set({
      ...channelObject,
      members,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }, {
      merge: true,
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error writing new channel to Firebase Database', error);
    });
  }

  saveMessage = (userId, channelId, messageObject) => {

    firebase.firestore().collection('messages').doc(`${channelId}_${userId}_${(new Date).getTime()}`).set({
      ...messageObject,
      channel: {
        id: channelId,
      },
      user: {
        id: userId,
      },
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    }, {
      merge: true,
    }).then(() => {
      const query = firebase.firestore().collection('channels').doc(channelId);
      query.get().then(channel => {
        const otherUserId = Object.keys(channel.members).filter(uid => uid !== userId)[0];
        query.set({
          [`unread_message_count.${otherUserId}`]: channel.unread_message_count[otherUserId] + 1,
        }, {
          merge: true,
        })
      });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error writing new message to Firebase Database', error);
    });
  };

  handleSnapshot = (collection) => {
    return (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docChange = {
          id: change.doc,
          ...change.doc.data(),
        };
        const handler = this.getHandler(collection, change.type);
        if (handler) {
          handler(docChange)
        }
      });

    }
  };

  loadCollectionList = (collection, where, orderBy, limit) => {
    const query = firebase.firestore()
      .collection(collection)
      .where(where.fieldPath, where.opStr, where.value)
      .orderBy(orderBy.fieldPath, orderBy.directionStr)
      .limit(limit);
    query.onSnapshot(this.handleSnapshot(collection));
  };

  loadDocument = (collection, documentId) => {
    const query = firebase.firestore()
      .collection(collection)
      .doc(documentId);
    query.onSnapshot((document) => {
      const docChange = {
        id: document.id,
        ...document.data(),
      };
      const handler = this.getHandler(collection, 'changed');
      if (handler) {
        handler(docChange)
      }
    });
  };

  getDocument = (collection, documentId) => {
    const query = firebase.firestore()
      .collection(collection)
      .doc(documentId);
    return query.get().then(document => {
      const docChange = {
        id: document.id,
        ...document.data(),
      };
      return docChange
    })
  };

  getCollectionList = (collection, where, orderBy, limit) => {
    let query = firebase.firestore()
      .collection(collection)
      .orderBy(orderBy.fieldPath, orderBy.directionStr)
      .limit(limit);
    if (Array.isArray(where)) {
      where.forEach(w => {
        query = query.where(w.fieldPath, w.opStr, w.value)
      })
    } else {
      query = query.where(where.fieldPath, where.opStr, where.value)
    }
    return query.get().then((documents) => {
      return documents.map(d => ({
        id: d.id,
        ...d.data(),
      }))
    })
  }

  loadUser = (userId) => {
    this.loadDocument('users', userId);
  };

  loadChannels = (userId) => {
    this.loadCollectionList('channels', {
      fieldPath: `members.${userId}`,
      opStr: '==',
      value: true,
    }, {
      fieldPath: 'created_at',
      directionStr: 'desc',
    }, 10);
  };

  loadMessages = (channelId) => {
    this.loadCollectionList('messages', {
      fieldPath: 'channel.id',
      opStr: '==',
      value: channelId,
    }, {
      fieldPath: 'created_at',
      directionStr: 'desc',
    }, 10);
  };

  saveImageMessage = (userId, channelId, messageObject, file) => {
    firebase.firestore().collection('messages').add({
      ...messageObject,
      file,
      channel: {
        id: channelId,
      },
      user: {
        id: userId,
      },
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    }).then((messageRef) => {
      // 2 - Upload the image to Cloud Storage.
      const filePath = `${firebase.auth().currentUser.uid}/${messageRef.id}/${file.name}`;
      return firebase.storage().ref(filePath).put(file).then((fileSnapshot) => {
        // 3 - Generate a public URL for the file.
        return fileSnapshot.ref.getDownloadURL().then((url) => {
          // 4 - Update the chat message placeholder with the image's URL.
          return messageRef.update({
            imageUrl: url,
            storageUri: fileSnapshot.metadata.fullPath,
          });
        });
      });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('There was an error uploading a file to Cloud Storage:', error);
    });
  };

  saveMessagingDeviceToken = () => {
    firebase.messaging().getToken().then((currentToken) => {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        firebase.firestore().collection('fcmTokens').doc(currentToken)
          .set({uid: firebase.auth().currentUser.uid});
      } else {
        // Need to request permissions to show notifications.
        this.requestNotificationsPermissions();
      }
    }).catch((error) => {
      console.error('Unable to get messaging token.', error);
    });
  };

  requestNotificationsPermissions = () => {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(() => {
      // Notification permission granted.
      this.saveMessagingDeviceToken();
    }).catch((error) => {
      console.error('Unable to get permission to notify.', error);
    });
  }
}
