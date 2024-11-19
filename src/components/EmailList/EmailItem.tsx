import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';

interface EmailItemProps {
  email: {
    id: number;
    sender: string;
    subject: string;
    preview: string;
    time: string;
    unread: boolean;
    important: boolean;
  };
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export function EmailItem({ email, isSelected, onSelect }: EmailItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700/50 cursor-pointer 
        ${isSelected 
          ? 'bg-blue-50 dark:bg-blue-900/20' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
        }
        ${email.unread ? 'bg-white dark:bg-custom-dark' : 'bg-gray-50/50 dark:bg-gray-800/10'}`}
      onClick={() => onSelect(email.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-blue-500' : 'bg-transparent'}`} />
          <div>
            <h3 className={`text-sm font-medium ${
              email.unread 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {email.sender}
            </h3>
            <p className={`text-sm ${
              email.unread 
                ? 'font-medium text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {email.subject}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {email.preview}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">{email.time}</span>
          {email.important && (
            <StarIcon className="h-5 w-5 text-yellow-400" />
          )}
        </div>
      </div>
    </motion.div>
  );
}