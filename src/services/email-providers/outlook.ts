import { EmailProvider, EmailOptions } from './types';
import { Client } from '@microsoft/microsoft-graph-client';

export class OutlookProvider implements EmailProvider {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
  }

  async connect(): Promise<void> {
    // Microsoft OAuth flow will be handled in electron/main.js
  }

  async disconnect(): Promise<void> {
    // Implement token revocation
  }

  async fetchEmails(): Promise<any[]> {
    const response = await this.client
      .api('/me/messages')
      .top(100)
      .select('subject,from,receivedDateTime,bodyPreview')
      .orderBy('receivedDateTime DESC')
      .get();

    return response.value.map(this.parseOutlookMessage);
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    await this.client.api('/me/sendMail').post({
      message: {
        subject: options.subject,
        body: {
          contentType: options.html ? 'html' : 'text',
          content: options.html || options.body
        },
        toRecipients: [
          {
            emailAddress: {
              address: options.to
            }
          }
        ]
      }
    });
  }

  private parseOutlookMessage(message: any): any {
    // Parse Outlook message format into standardized email format
    // Implementation details
    return message;
  }
}