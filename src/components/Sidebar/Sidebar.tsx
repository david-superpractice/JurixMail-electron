import { 
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon, 
  HashtagIcon,
  SparklesIcon,
  CalendarIcon,
  ArrowPathRoundedSquareIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  StarIcon,
  CalendarDaysIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { SidebarItem } from './SidebarItem';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useState } from 'react';

interface SidebarProps {
  onNewMessage: () => void;
  onCalendarClick: () => void;
}

export function Sidebar({ onNewMessage, onCalendarClick }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    inboxes: false,
    sent: false
  });

  const handleThemeChange = (theme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-white dark:bg-custom-dark border-r border-gray-200 dark:border-gray-700/50 flex flex-col h-full">
      <div className="p-4">
        <button 
          onClick={onNewMessage}
          className="w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2.5 flex items-center justify-between hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="font-medium">New Message</span>
          <div className="flex items-center space-x-1">
            <span className="text-gray-400 text-sm">⌘</span>
            <span className="text-gray-400 text-sm">N</span>
          </div>
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="px-3 py-2 space-y-1">
          <div>
            <button
              onClick={() => toggleSection('inboxes')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="w-5 h-5 mr-3">
                {expandedSections.inboxes ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <span className="flex-1">All Inboxes</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                10
              </span>
            </button>
            {expandedSections.inboxes && (
              <div className="ml-9 mt-1 space-y-1">
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">david@legalboost.co</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    3
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">hello@legalboost.co</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    5
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">david@superpractice.com</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    2
                  </span>
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('sent')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="w-5 h-5 mr-3">
                {expandedSections.sent ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <span className="flex-1">All Sent</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                245
              </span>
            </button>
            {expandedSections.sent && (
              <div className="ml-9 mt-1 space-y-1">
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">david@legalboost.co</span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">hello@legalboost.co</span>
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  <span className="flex-1 truncate">david@superpractice.com</span>
                </a>
              </div>
            )}
          </div>

          <SidebarItem icon={<DocumentTextIcon />} label="Drafts" count={2} />
          <SidebarItem icon={<ClockIcon />} label="Reminders" />
        </div>

        <div className="mt-6">
          <div className="px-3 mb-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <HashtagIcon className="h-5 w-5" />
              <span>CHANNELS</span>
            </div>
          </div>
          <div className="px-3 py-2 space-y-1">
            <SidebarItem 
              icon={<span className="text-gray-400 dark:text-gray-500">#</span>} 
              label="general"
            />
            <SidebarItem 
              icon={<span className="text-gray-400 dark:text-gray-500">#</span>} 
              label="marketing"
            />
            <SidebarItem 
              icon={<span className="text-gray-400 dark:text-gray-500">#</span>} 
              label="support"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="px-3 mb-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <CalendarDaysIcon className="h-5 w-5" />
              <span>CALENDAR</span>
            </div>
          </div>
          <div className="px-3 py-2 space-y-1">
            <SidebarItem 
              icon={<CalendarDaysIcon />} 
              label="My Calendar" 
              description="View schedule"
              onClick={onCalendarClick}
            />
            <SidebarItem 
              icon={<UserGroupIcon />} 
              label="Book a Meeting" 
              description="Share your availability"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="px-3 mb-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <SparklesIcon className="h-5 w-5" />
              <span>AI ASSISTANT</span>
            </div>
          </div>
          <div className="px-3 py-2 space-y-1">
            <SidebarItem 
              icon={<CalendarIcon />} 
              label="Agenda" 
              count={5}
              description="Priority emails & tasks"
            />
            <SidebarItem 
              icon={<StarIcon />} 
              label="Important" 
              count={3}
              description="AI & manual priority"
            />
            <SidebarItem 
              icon={<ArrowPathRoundedSquareIcon />} 
              label="Reminders" 
              count={3}
              description="Awaiting responses"
            />
            <SidebarItem 
              icon={<CogIcon />} 
              label="Rules" 
              description="Manage AI preferences"
            />
          </div>
        </div>
      </nav>

      <div className="mt-auto">
        <div className="px-3 mb-4">
          <ThemeSwitcher onChange={handleThemeChange} />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
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