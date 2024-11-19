import auth0 from 'auth0-js';

const auth0Client = new auth0.WebAuth({
  domain: process.env.VITE_AUTH0_DOMAIN || '',
  clientID: process.env.VITE_AUTH0_CLIENT_ID || '',
  redirectUri: process.env.VITE_AUTH0_CALLBACK_URL,
  responseType: 'token id_token',
  scope: 'openid profile email'
});

export const auth = {
  login: () => {
    return window.electron.auth.login();
  },
  logout: () => {
    return window.electron.auth.logout();
  },
  handleAuthentication: async () => {
    return new Promise((resolve, reject) => {
      auth0Client.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.accessToken) {
          return reject(new Error('Invalid auth result'));
        }
        resolve(authResult);
      });
    });
  }
};