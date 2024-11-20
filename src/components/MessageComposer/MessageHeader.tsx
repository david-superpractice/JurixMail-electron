import { useState } from 'react';
import { EmailRecipientInput } from './EmailRecipientInput';

interface Recipient {
  name: string;
  email: string;
}

interface MessageHeaderProps {
  mode: 'new' | 'reply' | 'forward';
  replyTo?: string;
  subject?: string;
}

export function MessageHeader({ mode, replyTo, subject }: MessageHeaderProps) {
  const [toRecipients, setToRecipients] = useState<Recipient[]>(
    replyTo ? [{ name: replyTo.split('@')[0], email: replyTo }] : []
  );
  const [ccRecipients, setCcRecipients] = useState<Recipient[]>([]);
  
  const handleAddToRecipient = (recipient: Recipient) => {
    if (!toRecipients.some(r => r.email === recipient.email)) {
      setToRecipients([...toRecipients, recipient]);
    }
  };

  const handleAddCcRecipient = (recipient: Recipient) => {
    if (!ccRecipients.some(r => r.email === recipient.email)) {
      setCcRecipients([...ccRecipients, recipient]);
    }
  };

  const handleRemoveToRecipient = (email: string) => {
    setToRecipients(toRecipients.filter(r => r.email !== email));
  };

  const handleRemoveCcRecipient = (email: string) => {
    setCcRecipients(ccRecipients.filter(r => r.email !== email));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col space-y-2">
        <EmailRecipientInput
          label="To:"
          recipients={toRecipients}
          onAddRecipient={handleAddToRecipient}
          onRemoveRecipient={handleRemoveToRecipient}
        />

        <EmailRecipientInput
          label="Cc:"
          recipients={ccRecipients}
          onAddRecipient={handleAddCcRecipient}
          onRemoveRecipient={handleRemoveCcRecipient}
        />

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">Subject:</span>
          <input
            type="text"
            defaultValue={subject}
            className="flex-1 p-2 text-sm border-0 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
            placeholder="Enter subject"
          />
        </div>
      </div>
    </div>
  );
}