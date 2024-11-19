export interface EmailAccount {
  id: string;
  type: 'gmail' | 'outlook' | 'smtp';
  email: string;
  name: string;
  provider: string;
  connected: boolean;
  primary: boolean;
}

export interface EmailProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  fetchEmails(): Promise<any[]>;
  sendEmail(options: EmailOptions): Promise<void>;
}

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}