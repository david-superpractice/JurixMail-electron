import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { 
  XMarkIcon,
  ClockIcon,
  MapPinIcon,
  VideoCameraIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { CalendarEvent, Attendee } from './types';

interface EventDetailsProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

function getResponseIcon(response: Attendee['response']) {
  switch (response) {
    case 'accepted':
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    case 'declined':
      return <XCircleIcon className="h-4 w-4 text-red-500" />;
    case 'tentative':
    case 'pending':
      return <QuestionMarkCircleIcon className="h-4 w-4 text-yellow-500" />;
  }
}

export function EventDetails({ event, isOpen, onClose, onEdit, onDelete }: EventDetailsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!event) return null;

  const isRecurring = event.recurring;
  const hasConferencing = event.conferencing;

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(event);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all">
                  <div className="relative">
                    <div className="absolute right-4 top-4 flex items-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(event)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={handleDelete}
                          className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={onClose}
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-6">
                      <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white pr-24">
                        {event.title}
                      </Dialog.Title>

                      <div className="mt-4 space-y-4">
                        <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                          <ClockIcon className="h-5 w-5 mt-0.5" />
                          <div>
                            <div>{format(event.start, 'EEEE, MMMM d')}</div>
                            <div>
                              {format(event.start, 'h:mm a')} – {format(event.end, 'h:mm a')}
                            </div>
                            {isRecurring && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Repeats {isRecurring.frequency} every {isRecurring.interval} {isRecurring.frequency}
                                {isRecurring.endDate && ` until ${format(isRecurring.endDate, 'MMM d, yyyy')}`}
                              </div>
                            )}
                          </div>
                        </div>

                        {hasConferencing && (
                          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                            <VideoCameraIcon className="h-5 w-5 mt-0.5" />
                            <div>
                              <a
                                href={event.conferencing?.link}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join with {event.conferencing?.provider === 'google-meet' ? 'Google Meet' : 
                                         event.conferencing?.provider === 'zoom' ? 'Zoom' : 'Teams'}
                              </a>
                              {event.conferencing?.dialIn && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {event.conferencing.dialIn}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {event.location && (
                          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                            <MapPinIcon className="h-5 w-5 mt-0.5" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                            <UserIcon className="h-5 w-5 mt-0.5" />
                            <div className="flex-1">
                              {event.attendees.map((attendee, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm py-0.5">
                                  <div className="flex-shrink-0">
                                    {getResponseIcon(attendee.response)}
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium">{attendee.name}</span>
                                    {attendee.organizer && (
                                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        (Organizer)
                                      </span>
                                    )}
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {attendee.email}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                          <CalendarIcon className="h-5 w-5" />
                          <span>{event.account}</span>
                        </div>

                        {event.description && (
                          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
                            <DocumentTextIcon className="h-5 w-5 mt-0.5" />
                            <div className="text-sm whitespace-pre-wrap">
                              {event.description}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <button
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                          Add note
                        </button>
                        
                        <button
                          onClick={onClose}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Dialog */}
      <Transition appear show={showDeleteConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDeleteConfirm(false)}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                  <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
                    <ExclamationTriangleIcon className="h-6 w-6" />
                    <Dialog.Title className="text-lg font-medium">
                      Delete Event
                    </Dialog.Title>
                  </div>

                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete this event? This action cannot be undone.
                  </p>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}