import { generateApiActions } from './apiUtil';

import {
  connectApp,
  getMyGroupChannels,
  loadPreviousMessages,
  sendFileMessage,
  sendUserMessage,
  registerMessageHandler,
  getTotalUnreadChannelCount,
  getTotalUnreadMessageCount,
  markAsRead,
  getChannelByUrl,
  getUserIsOnline,
  disconnectApp,
} from '../utils/SendBirdAPI';

export const CHAT_USER = {
  MODEL: 'CHAT_USER',
  CONNECT: generateApiActions('CHAT_USER', 'CONNECT'),
  DISCONNECT: generateApiActions('CHAT_USER', 'DISCONNECT'),
  ONLINE_STATUS: generateApiActions('CHAT_USER', 'ONLINE_STATUS'),
};

export const CHANNELS = {
  MODEL: 'CHANNELS',
  LIST: generateApiActions('CHANNELS', 'LIST'),
  MARK_READ: generateApiActions('CHANNELS', 'MARK_READ'),
  CHANGE: generateApiActions('CHANNELS', 'CHANGE'),
  UPDATE_ONLINE_STATUS: generateApiActions('CHANNELS', 'UPDATE_ONLINE_STATUS'),
};

export const MESSAGES = {
  MODEL: 'MESSAGES',
  LIST: generateApiActions('MESSAGES', 'LIST'),
  SEND: generateApiActions('MESSAGES', 'SEND'),
  RECEIVE: generateApiActions('MESSAGES', 'RECEIVE'),
};

export const UNREAD_COUNT = {
  MODEL: 'UNREAD_COUNT',
  CHANNEL: generateApiActions('UNREAD_COUNT', 'CHANNEL'),
  MESSAGE: generateApiActions('UNREAD_COUNT', 'MESSAGE'),
};

export const HANDLER = {
  MODEL: 'HANDLER',
  REGISTER: generateApiActions('HANDLER', 'REGISTER'),
};

export function connectUser({ userId, accessToken }) {
  return connectApp(userId, accessToken);
}

export function disconnectUser() {
  return disconnectApp();
}

export function getUserOnlineStatus({ userId }) {
  return getUserIsOnline(userId);
}

export function getUnreadChannelCount() {
  return getTotalUnreadChannelCount();
}

export function getUnreadMessageCount() {
  return getTotalUnreadMessageCount();
}

export function markChannelAsRead({ channel }) {
  return markAsRead(channel);
}

export function listChannels() {
  return getMyGroupChannels();
}

export function getChannels(channelUrl) {
  return getChannelByUrl({ channelUrl });
}

export function listMessages({ channel }) {
  return loadPreviousMessages(channel);
}

export function sendMessage({ channel, messageType, messageParams }) {
  if (messageType === 'file') {
    return sendFileMessage(channel, messageParams);
  }
  return sendUserMessage(channel, messageParams);
}

export function registerHandler({ handler, handlerType }) {
  return registerMessageHandler(handler, handlerType);
}
