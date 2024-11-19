import { EmailItem } from './EmailItem';

interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  important: boolean;
}

interface EmailListProps {
  emails: Email[];
  selectedEmail: number | null;
  onSelectEmail: (id: number) => void;
}

export function EmailList({ emails, selectedEmail, onSelectEmail }: EmailListProps) {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-custom-dark">
      <div className="border-b border-gray-200 dark:border-gray-700/50">
        <div className="px-6 py-4">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            isSelected={selectedEmail === email.id}
            onSelect={onSelectEmail}
          />
        ))}
      </div>
    </div>
  );
}