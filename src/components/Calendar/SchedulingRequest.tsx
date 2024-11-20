import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';

interface SchedulingRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (emails: string[], link: string) => void;
}

interface SchedulingLink {
  id: string;
  name: string;
  duration: string;
  link: string;
}

interface Recipient {
  email: string;
  name: string;
}

const sampleLinks: SchedulingLink[] = [
  {
    id: '1',
    name: "30 Minute Meeting",
    duration: "30 min",
    link: "https://calendar.app/david/30min"
  },
  {
    id: '2',
    name: "60 Minute Meeting",
    duration: "1 hour",
    link: "https://calendar.app/david/60min"
  },
  {
    id: '3',
    name: "Quick Chat",
    duration: "15 min",
    link: "https://calendar.app/david/15min"
  }
];

export function SchedulingRequest({ isOpen, onClose, onSend }: SchedulingRequestProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLink, setSelectedLink] = useState<SchedulingLink | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        return;
      }

      const newRecipient: Recipient = {
        name: inputValue.split('@')[0],
        email: inputValue.trim()
      };

      if (!recipients.some(r => r.email === newRecipient.email)) {
        setRecipients([...recipients, newRecipient]);
      }
      setInputValue('');
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r.email !== email));
  };

  const handleSend = () => {
    if (recipients.length > 0 && selectedLink) {
      onSend(recipients.map(r => r.email), selectedLink.link);
      onClose();
    }
  };

  const handleClose = () => {
    setRecipients([]);
    setInputValue('');
    setSelectedLink(null);
    onClose();
  };

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={handleClose}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-lg font-medium">
                Send Scheduling Request
              </Dialog.Title>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send to
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2 min-h-[2.5rem] border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                  {recipients.map((recipient) => (
                    <div
                      key={recipient.email}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{recipient.email}</span>
                      <button
                        onClick={() => removeRecipient(recipient.email)}
                        className="p-0.5 hover:bg-blue-200 rounded-full"
                      >
                        <XMarkIconMini className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={recipients.length === 0 ? "Enter email address" : ""}
                    className="flex-1 min-w-[120px] border-0 focus:ring-0 p-0 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select scheduling link
                </label>
                <div className="space-y-2">
                  {sampleLinks.map(link => (
                    <button
                      key={link.id}
                      onClick={() => setSelectedLink(link)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                        selectedLink?.id === link.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <LinkIcon className="h-5 w-5 text-gray-400" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{link.name}</div>
                          <div className="text-sm text-gray-500">{link.duration}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={recipients.length === 0 || !selectedLink}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}