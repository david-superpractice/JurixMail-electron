import { format } from 'date-fns';
import { CalendarEvent } from './types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface CalendarSidebarProps {
  currentDate: Date;
  events: CalendarEvent[];
  accounts: Array<{ email: string; enabled: boolean; }>;
  enabledAccounts: string[];
  onToggleAccount: (email: string) => void;
}

export function CalendarSidebar({ 
  currentDate, 
  events,
  accounts,
  enabledAccounts,
  onToggleAccount
}: CalendarSidebarProps) {
  const todaysEvents = events.filter(
    event => format(event.start, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
  );

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-custom-dark p-4">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search teammates"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-custom-dark text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">My calendars</h3>
        <div className="space-y-2">
          {accounts.map(account => (
            <label key={account.email} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-blue-600"
                checked={enabledAccounts.includes(account.email)}
                onChange={() => onToggleAccount(account.email)}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{account.email}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Today's Events</h3>
        <div className="space-y-3">
          {todaysEvents.map(event => (
            <div
              key={event.id}
              className="p-2 rounded-md bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {event.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {format(event.start, 'h:mma')} - {format(event.end, 'h:mma')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}