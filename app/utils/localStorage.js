const TOKEN = 'token';

export const getToken = () => localStorage.getItem(TOKEN);

export const storeToken = token => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
