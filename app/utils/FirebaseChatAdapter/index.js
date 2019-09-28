/* eslint-disable arrow-body-style */
import FirebaseAPI from '../FirebaseAPI'

const firebaseChat = new FirebaseAPI();

export const connectApp = (userId, accessToken) => {
  return new Promise((resolve, reject) => {
    firebaseChat.signIn(accessToken).then(cred => {
      // replace with function to convert user to desired structure
      const user = ((u) => u)(cred.user);
      resolve(user);
    }).catch(error => {
      reject(error);
    });
  });
};

export const disconnectApp = () => firebaseChat.signOut()

export const getUserIsOnline = userId => {
  return new Promise((resolve, reject) => {
    firebaseChat.getDocument('users', userId).then(docChange => {
      resolve(docChange.is_online)
    }).catch(error => {
      reject(error);
    })
  });
};


export const createGroupChannel = userIds => {
  const channel = {};
  channel.isPublic = false;
  channel.isEphemeral = false;
  channel.isDistinct = false;
  channel.operators = userIds;
  channel.members = {};
  userIds.forEach(userId => {
    channel.members[userId] = true
  });
  return new Promise((resolve, reject) => {
    firebaseChat.saveChannel(channel).then(() => {
      resolve();
    }).catch(error => {
      reject(error);
    })
  });
};

export const getMyGroupChannels = () => {
  const userId = firebaseChat.user.id;
  return firebaseChat.getCollectionList('channels', {
    fieldPath: `members.${userId}`,
    opStr: '==',
    value: true,
  }, {
    fieldPath: 'created_at',
    directionStr: 'desc',
  }, 10);
};

export const getChannelById = (channelId) => {
  return firebaseChat.getDocument('channel', channelId);
};

export const loadPreviousMessages = channelId => {
  return firebaseChat.loadMessages(channelId);
};

export const sendUserMessage = (channelId, messageParams) => {
  const userId = firebaseChat.user.id;
  const { message, data, customType } = messageParams;
  const messageObject = {};
  messageObject.message = message;
  messageObject.data = data;
  messageObject.customType = customType;
  return firebaseChat.saveMessage(userId, channelId, messageObject)
};

export const sendFileMessage = (channelId, messageParams) => {
  const userId = firebaseChat.user.id;
  const { file, name, type, size, data, customType } = messageParams;
  const messageObject = { file, name, type, size, data, customType };
  return firebaseChat.saveMessage(userId, channelId, messageObject);
};

export const registerMessageHandler = (handler, handlerType) => {
  return new Promise((resolve, reject) => {
    try {
      if (handlerType === 'onMessageReceived') {
        firebaseChat.setHandler('messages', 'added', handler)
      } else if (handlerType === 'onUserReceivedInvitation') {
        firebaseChat.setHandler('channels', 'modified', handler)
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  })
};

export const getTotalUnreadChannelCount = () => {
  const userId = firebaseChat.user.id;
  return new Promise((resolve, reject) => {
    firebaseChat.getCollectionList('channels', [{
      fieldPath: `members.${userId}`,
      opStr: '==',
      value: true,
    }, {
      fieldPath: `unread_message_count.${userId}`,
      opStr: '>',
      value: 0,
    }], {
      fieldPath: 'created_at',
      directionStr: 'desc',
    }).then(collectionList => {
      resolve(collectionList.length)
    }).catch(e => {
      reject(e)
    });
  });
};

export const getTotalUnreadMessageCount = () => {
  const userId = firebaseChat.user.id;
  return new Promise((resolve, reject) => {
    firebaseChat.getCollectionList('channels', [{
      fieldPath: `members.${userId}`,
      opStr: '==',
      value: true,
    }, {
      fieldPath: `unread_message_count.${userId}`,
      opStr: '>',
      value: 0,
    }], {
      fieldPath: 'created_at',
      directionStr: 'desc',
    }).then(collectionList => {
      let count = 0;
      collectionList.forEach(channel => {
        count += channel.unread_message_count[userId]
      });
      resolve(count)
    }).catch(e => {
      reject(e)
    });
  });
};

export const markAsRead = channelId => {
  const userId = firebaseChat.user.id;
  return new Promise((resolve, reject) => {
    firebaseChat.saveChannel({
      id: channelId,
      [`unread_message_count.${userId}`]: 0,
    })
      .then(resolve)
      .catch(reject)
  })
};
