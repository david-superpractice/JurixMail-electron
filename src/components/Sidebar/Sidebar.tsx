import { useState } from 'react';
import { 
  InboxIcon, 
  ClockIcon, 
  HashtagIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  BoltIcon,
  ListBulletIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { SidebarItem } from './SidebarItem';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedInbox, setExpandedInbox] = useState(true);
  const [expandedSent, setExpandedSent] = useState(false);

  const accounts = [
    { email: 'david@legalboost.co', unread: 3 },
    { email: 'hello@legalboost.co', unread: 1 },
    { email: 'david@superpractice.com', unread: 5 }
  ];

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  return (
    <div className="w-64 bg-white dark:bg-custom-dark border-r border-gray-200 dark:border-gray-700/50 flex flex-col h-full">
      <div className="p-4">
        <button className="w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2.5 flex items-center justify-between hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
          <span className="font-medium">New Message</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-sm bg-gray-700 dark:bg-gray-600 rounded px-1 py-0.5 text-gray-300">⌘</span>
            <span className="text-sm bg-gray-700 dark:bg-gray-600 rounded px-1 py-0.5 text-gray-300">N</span>
          </div>
        </button>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {/* Main Email Section */}
        <div className="space-y-1">
          <button
            onClick={() => setExpandedInbox(!expandedInbox)}
            className="flex items-center w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
          >
            {expandedInbox ? <ChevronDownIcon className="h-4 w-4 mr-2" /> : <ChevronRightIcon className="h-4 w-4 mr-2" />}
            All Inboxes
          </button>
          
          {expandedInbox && accounts.map((account) => (
            <SidebarItem
              key={account.email}
              icon={<InboxIcon />}
              label={account.email}
              count={account.unread}
              description="Inbox"
            />
          ))}

          <button
            onClick={() => setExpandedSent(!expandedSent)}
            className="flex items-center w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
          >
            {expandedSent ? <ChevronDownIcon className="h-4 w-4 mr-2" /> : <ChevronRightIcon className="h-4 w-4 mr-2" />}
            All Sent
          </button>
          
          {expandedSent && accounts.map((account) => (
            <SidebarItem
              key={account.email}
              icon={<PaperAirplaneIcon />}
              label={account.email}
              description="Sent"
            />
          ))}

          <SidebarItem icon={<ClockIcon />} label="Snoozed" />
          <SidebarItem icon={<DocumentTextIcon />} label="Drafts" />
          <SidebarItem icon={<HashtagIcon />} label="Channels" />
        </div>

        {/* AI Assistant Section */}
        <div className="mt-6">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              AI Assistant
            </h3>
          </div>
          
          <SidebarItem icon={<ListBulletIcon />} label="Agenda" />
          <SidebarItem icon={<BoltIcon />} label="Follow Up" />
          <SidebarItem icon={<SparklesIcon />} label="Important" />
          <SidebarItem icon={<Cog6ToothIcon />} label="Rules" />
        </div>
      </nav>

      <div className="mt-auto">
        <div className="p-4">
          <ThemeSwitcher onChange={handleThemeChange} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <BoltIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Assistant</span>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            4.2 hours saved this week
          </div>
        </div>
      </div>
    </div>
  );
}