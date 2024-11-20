import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon, PlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MeetingScheduler } from './MeetingScheduler';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'week' | 'month';
  onViewChange: (view: 'week' | 'month') => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevWeek,
  onNextWeek,
  onToday
}: CalendarHeaderProps) {
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrevWeek}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onNextWeek}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onToday}
              className="h-8 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Today
            </button>
            <button
              onClick={() => setShowScheduler(true)}
              className="h-8 px-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 flex items-center space-x-3"
            >
              <span>Schedule Meeting</span>
              <div className="flex items-center space-x-1 text-xs">
                <span className="text-gray-400">⌘</span>
                <span className="text-gray-400">M</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative">
            <Menu.Button className="h-8 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
              <LinkIcon className="h-4 w-4" />
              <span>Scheduling Links</span>
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
              <Menu.Items className="absolute right-0 mt-2 w-[400px] origin-top-right bg-white dark:bg-custom-dark rounded-md shadow-xl ring-1 ring-black/5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700 z-50">
                <div className="p-4 bg-white dark:bg-custom-dark">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">One-time link</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Create a one-time link that expires after being used</p>
                    </div>
                    <button className="px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      Create one-time link
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-custom-dark">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">David's Main Scheduling Link</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      One-off link
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      Copy link
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-custom-dark">
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create new booking link
                  </button>
                  <button className="w-full flex items-center px-3 py-2 mt-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                    <Cog6ToothIcon className="h-4 w-4 mr-2" />
                    Booking settings
                  </button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => onViewChange('week')}
              className={`h-8 px-4 text-sm font-medium rounded-l-lg ${
                view === 'week'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onViewChange('month')}
              className={`h-8 px-4 text-sm font-medium rounded-r-lg ${
                view === 'month'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <MeetingScheduler 
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        defaultDate={currentDate}
      />
    </>
  );
}