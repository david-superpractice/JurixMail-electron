import { 
  StarIcon, 
  ChevronDownIcon,
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AIAssistant } from './AIAssistant';

interface EmailDetailProps {
  selectedEmail: number | null;
  onReply: () => void;
  onReplyAll: () => void;
  onForward: () => void;
}

export function EmailDetail({ selectedEmail, onReply, onReplyAll, onForward }: EmailDetailProps) {
  const aiSuggestions = [
    "Draft a detailed response based on past correspondence",
    "Schedule a meeting for tomorrow afternoon",
    "Draft a response acknowledging receipt",
    "Share calendar availability for discussion"
  ];

  if (!selectedEmail) {
    return (
      <div className="w-1/2 bg-white dark:bg-custom-dark border-l border-gray-200 dark:border-gray-700/50 p-6">
        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          Select an email to view
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-white dark:bg-custom-dark border-l border-gray-200 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Q4 Marketing Strategy Review</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <StarIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <ChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-300 font-medium">SJ</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium dark:text-white">Sarah Johnson</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">sarah@company.com</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onReply}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full tooltip-trigger"
            title="Reply"
          >
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={onReplyAll}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full tooltip-trigger"
            title="Reply All"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={onForward}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full tooltip-trigger"
            title="Forward"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          <Menu as="div" className="relative">
            <Menu.Button
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full tooltip-trigger"
              title="AI Actions"
            >
              <SparklesIcon className="h-5 w-5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Draft Response
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Mark as Important
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Remind Me
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Add to AI Training Data
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>Hi Team,</p>
        <p className="mt-4">
          I've reviewed the proposed marketing strategy for Q4 and have some thoughts I'd like to share. Overall, 
          the direction looks solid, but there are a few areas where I think we can make improvements.
        </p>
        <p className="mt-4">
          Can we schedule a meeting to discuss these points in detail? I'm available tomorrow afternoon.
        </p>
        <p className="mt-4">Best regards,<br />Sarah</p>
      </div>

      <AIAssistant suggestions={aiSuggestions} />
    </div>
  );
}