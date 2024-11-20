import { useState, useRef, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Recipient {
  name: string;
  email: string;
}

interface EmailRecipientInputProps {
  label: string;
  recipients: Recipient[];
  onAddRecipient: (recipient: Recipient) => void;
  onRemoveRecipient: (email: string) => void;
}

export function EmailRecipientInput({
  label,
  recipients,
  onAddRecipient,
  onRemoveRecipient
}: EmailRecipientInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        return;
      }

      // Extract name if provided in format "Name <email@example.com>"
      const nameMatch = inputValue.match(/(.*?)\s*<(.+@.+)>/);
      const recipient: Recipient = nameMatch
        ? { name: nameMatch[1], email: nameMatch[2] }
        : { name: inputValue.split('@')[0], email: inputValue };

      onAddRecipient(recipient);
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">{label}</span>
      <div className="flex-1 flex flex-wrap items-center gap-2 p-2 min-h-[2.5rem] border-0 border-b border-gray-200 dark:border-gray-700">
        {recipients.map((recipient) => (
          <div
            key={recipient.email}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
          >
            <span>{recipient.name} &lt;{recipient.email}&gt;</span>
            <button
              onClick={() => onRemoveRecipient(recipient.email)}
              className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[200px] bg-transparent border-0 focus:ring-0 p-0 text-sm"
          placeholder={recipients.length === 0 ? "Enter recipient email" : ""}
        />
      </div>
    </div>
  );
}