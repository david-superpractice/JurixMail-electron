const { google } = require('googleapis');
const { PublicClientApplication } = require('@azure/msal-node');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

class EmailProviderManager {
  constructor(store) {
    this.store = store;
  }

  async addAccount(account) {
    const accounts = this.store.get('emailAccounts', []);
    const newAccount = {
      ...account,
      id: uuidv4(),
      connected: true,
      primary: accounts.length === 0
    };
    
    this.store.set('emailAccounts', [...accounts, newAccount]);
    return newAccount;
  }

  async removeAccount(accountId) {
    const accounts = this.store.get('emailAccounts', []);
    this.store.set('emailAccounts', accounts.filter(acc => acc.id !== accountId));
  }

  async getAccounts() {
    return this.store.get('emailAccounts', []);
  }
}

module.exports = { EmailProviderManager };