import { EmailProvider, EmailOptions } from './types';
import * as nodemailer from 'nodemailer';

export class SMTPProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;

  constructor(config: nodemailer.TransportOptions) {
    this.transporter = nodemailer.createTransport(config);
  }

  async connect(): Promise<void> {
    await this.transporter.verify();
  }

  async disconnect(): Promise<void> {
    this.transporter.close();
  }

  async fetchEmails(): Promise<any[]> {
    throw new Error('SMTP provider does not support fetching emails');
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.transporter.options.auth?.user,
      to: options.to,
      subject: options.subject,
      text: options.body,
      html: options.html,
      attachments: options.attachments
    });
  }
}