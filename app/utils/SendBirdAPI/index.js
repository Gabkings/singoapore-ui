import SendBird from 'sendbird';
// import uuid from 'uuid/v4';

const APP_ID = process.env.SENDBIRD_APP_ID;
const sb = new SendBird({ appId: APP_ID });

export const connectApp = (userId, accessToken) => {
  const USER_ID = userId;
  const ACCESS_TOKEN = accessToken;
  return new Promise((resolve, reject) => {
    sb.connect(
      USER_ID,
      ACCESS_TOKEN,
      (sendBirdUser, error) => {
        if (error) {
          reject(error);
        }
        resolve(sendBirdUser);
      },
    );
  });
};

export const disconnectApp = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    sb.disconnect(() => {
      // A current user is discconected from SendBird server.
      resolve();
    });
  });

export const getUserIsOnline = userId =>
  new Promise((resolve, reject) => {
    const applicationUserListQuery = sb.createUserListQuery([userId]);
    applicationUserListQuery.next((users, error) => {
      if (error) {
        reject(error);
      }
      if (users[0].connectionStatus === sb.User.ONLINE) {
        // User.connectionStatus consists of NON_AVAILABLE, ONLINE, and OFFLINE.
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });

export const createGroupChannel = userIds => {
  const params = new sb.GroupChannelParams();
  params.isPublic = false;
  params.isEphemeral = false;
  params.isDistinct = false;
  params.addUserIds(userIds);
  params.operators = userIds;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.createChannel(params, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      resolve(groupChannel);
    });
  });
};

export const getMyGroupChannels = () => {
  const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
  channelListQuery.includeEmpty = true;
  channelListQuery.limit = 20; // pagination limit could be set up to 100

  if (channelListQuery.hasNext) {
    return new Promise((resolve, reject) => {
      channelListQuery.next((channelList, error) => {
        if (error) {
          reject(error);
        }
        resolve(channelList);
      });
    });
  }
  return null;
};

export const getChannelByUrl = ({ channelUrl }) =>
  new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(groupChannel);
    });
  });

export const loadPreviousMessages = groupChannel => {
  const prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
  prevMessageListQuery.limit = 100;
  prevMessageListQuery.reverse = false;
  return new Promise((resolve, reject) => {
    prevMessageListQuery.load((messages, error) => {
      if (error) {
        reject(error);
      }
      resolve(messages);
    });
  });
};

export const sendUserMessage = (channel, messageParams) => {
  const { message, data, customType } = messageParams;
  const params = new sb.UserMessageParams();
  params.message = message;
  params.data = data;
  params.customType = customType;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channel.url, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      groupChannel.sendUserMessage(params, (msg, e) => {
        if (e) {
          reject(e);
        }
        resolve(msg);
      });
    });
  });
};

export const sendFileMessage = (channel, messageParams) => {
  const { file, name, type, size, data, customType } = messageParams;
  return new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channel.url, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      groupChannel.sendFileMessage(
        file,
        name,
        type,
        size,
        data,
        customType,
        (fileMessage, e) => {
          if (e) {
            reject(e);
          }
          resolve(fileMessage);
        },
      );
    });
  });
};

export const registerMessageHandler = (handler, handlerType) => {
  const channelHandlerId = handlerType;
  return new Promise((resolve, reject) => {
    try {
      const ChannelHandler = new sb.ChannelHandler();
      ChannelHandler[handlerType] = handler;
      sb.addChannelHandler(channelHandlerId, ChannelHandler);
      resolve(ChannelHandler);
    } catch (e) {
      reject(e);
    }
  });
};

export const getTotalUnreadChannelCount = () =>
  new Promise((resolve, reject) => {
    sb.getTotalUnreadChannelCount((count, error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(count);
    });
  });

export const getTotalUnreadMessageCount = () =>
  new Promise((resolve, reject) => {
    sb.getTotalUnreadMessageCount((count, error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(count);
    });
  });

export const markAsRead = channel =>
  new Promise((resolve, reject) => {
    sb.GroupChannel.getChannel(channel.url, (groupChannel, error) => {
      if (error) {
        reject(error);
      }
      resolve(groupChannel.markAsRead());
    });
  });
