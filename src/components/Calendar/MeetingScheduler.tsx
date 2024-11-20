import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { XMarkIcon, UserPlusIcon, VideoCameraIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { SchedulingRequest } from './SchedulingRequest';
import { XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';

interface MeetingSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date;
  editingEvent?: any;
}

type RecurringOption = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
type MeetingType = 'event' | 'out' | 'task' | 'find';

interface Guest {
  email: string;
  name: string;
}

const recurringOptions = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom...' }
];

export function MeetingScheduler({ isOpen, onClose, defaultDate = new Date(), editingEvent }: MeetingSchedulerProps) {
  const [selectedType, setSelectedType] = useState<MeetingType>('event');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(format(defaultDate, 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestInput, setGuestInput] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('david@legalboost.co');
  const [recurring, setRecurring] = useState<RecurringOption>('none');
  const [useConferencing, setUseConferencing] = useState(true);
  const [showSchedulingRequest, setShowSchedulingRequest] = useState(false);

  // Reset state when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedType('event');
      setTitle('');
      setDate(format(defaultDate, 'yyyy-MM-dd'));
      setStartTime('09:00');
      setEndTime('10:00');
      setGuests([]);
      setGuestInput('');
      setSelectedCalendar('david@legalboost.co');
      setRecurring('none');
      setUseConferencing(true);
      setShowSchedulingRequest(false);
    }
  }, [isOpen, defaultDate]);

  const handleGuestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && guestInput.trim()) {
      e.preventDefault();
      const email = guestInput.trim();
      const name = email.split('@')[0];
      setGuests([...guests, { email, name }]);
      setGuestInput('');
    }
  };

  const removeGuest = (email: string) => {
    setGuests(guests.filter(guest => guest.email !== email));
  };

  const handleClose = () => {
    setShowSchedulingRequest(false);
    onClose();
  };

  if (showSchedulingRequest) {
    return (
      <SchedulingRequest
        isOpen={true}
        onClose={() => {
          setShowSchedulingRequest(false);
          onClose();
        }}
        onSend={(emails, link) => {
          console.log('Sending scheduling request:', { emails, link });
          setShowSchedulingRequest(false);
          onClose();
        }}
      />
    );
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium">
                    {title || 'Add title'}
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex space-x-1 text-sm">
                    <button
                      onClick={() => setSelectedType('event')}
                      className={`px-3 py-2 rounded-md ${
                        selectedType === 'event'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Event
                    </button>
                    <button
                      onClick={() => setSelectedType('out')}
                      className={`px-3 py-2 rounded-md ${
                        selectedType === 'out'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Out of office
                    </button>
                    <button
                      onClick={() => setSelectedType('task')}
                      className={`px-3 py-2 rounded-md ${
                        selectedType === 'task'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Task
                    </button>
                    <button
                      onClick={() => {
                        setShowSchedulingRequest(true);
                      }}
                      className={`px-3 py-2 rounded-md ${
                        selectedType === 'find'
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Find time
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add title"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Repeat
                      </label>
                      <select
                        value={recurring}
                        onChange={(e) => setRecurring(e.target.value as RecurringOption)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-gray-200"
                      >
                        {recurringOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start time
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End time
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calendar
                    </label>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <select
                        value={selectedCalendar}
                        onChange={(e) => setSelectedCalendar(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-gray-200"
                      >
                        <option value="david@legalboost.co">david@legalboost.co</option>
                        <option value="hello@legalboost.co">hello@legalboost.co</option>
                        <option value="david@superpractice.com">david@superpractice.com</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Add guests
                    </label>
                    <div className="flex items-center space-x-2">
                      <UserPlusIcon className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 flex flex-wrap items-center gap-2 p-2 min-h-[2.5rem] border border-gray-200 rounded-lg">
                        {guests.map((guest) => (
                          <div
                            key={guest.email}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            <span>{guest.email}</span>
                            <button
                              onClick={() => removeGuest(guest.email)}
                              className="p-0.5 hover:bg-blue-200 rounded-full"
                            >
                              <XMarkIconMini className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <input
                          type="email"
                          value={guestInput}
                          onChange={(e) => setGuestInput(e.target.value)}
                          onKeyDown={handleGuestKeyDown}
                          placeholder={guests.length === 0 ? "Add guests" : ""}
                          className="flex-1 min-w-[120px] border-0 focus:ring-0 p-0 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <VideoCameraIcon className="h-5 w-5 text-gray-400" />
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={useConferencing}
                        onChange={(e) => setUseConferencing(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Add Google Meet video conferencing</span>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle save
                        onClose();
                      }}
                      disabled={!title}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}