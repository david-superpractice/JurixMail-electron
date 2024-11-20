import React, { useState } from 'react';
import { addDays, addMonths, startOfWeek, subDays, subMonths } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';
import { CalendarEvent } from './types';
import { MeetingScheduler } from './MeetingScheduler';

// Sample events for demonstration
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'TPL Article Post + Email',
    start: new Date(2024, 10, 21, 13, 0),
    end: new Date(2024, 10, 21, 14, 0),
    type: 'meeting',
    account: 'david@legalboost.co',
    attendees: [
      { email: 'sarah@example.com', name: 'Sarah Johnson', response: 'accepted' },
      { email: 'mike@example.com', name: 'Mike Wilson', response: 'pending' }
    ],
    conferencing: {
      provider: 'google-meet',
      link: 'https://meet.google.com/abc-defg-hij',
      dialIn: '(US) +1 123-456-7890 PIN: 123 456 789#'
    }
  },
  {
    id: '2',
    title: 'Dentist',
    start: new Date(2024, 10, 19, 10, 30),
    end: new Date(2024, 10, 19, 11, 30),
    type: 'personal',
    account: 'david@legalboost.co',
    location: 'Dental Office, 123 Main St'
  },
  {
    id: '3',
    title: 'Meeting with David - marketing intro call',
    start: new Date(2024, 10, 18, 13, 30),
    end: new Date(2024, 10, 18, 14, 30),
    type: 'meeting',
    account: 'david@superpractice.com',
    attendees: [
      { email: 'david@example.com', name: 'David Miller', response: 'accepted', organizer: true },
      { email: 'john@example.com', name: 'John Smith', response: 'declined' }
    ],
    conferencing: {
      provider: 'google-meet',
      link: 'https://meet.google.com/xyz-uvw-rst',
      dialIn: '(US) +1 123-456-7890 PIN: 987 654 321#'
    }
  }
];

const accounts = [
  { email: 'david@legalboost.co', enabled: true },
  { email: 'hello@legalboost.co', enabled: true },
  { email: 'david@superpractice.com', enabled: true }
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  const [enabledAccounts, setEnabledAccounts] = useState(accounts.map(a => a.email));
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handlePrevWeek = () => {
    setCurrentDate(prev => view === 'week' ? subDays(prev, 7) : subMonths(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => view === 'week' ? addDays(prev, 7) : addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: 'week' | 'month') => {
    setView(newView);
  };

  const handleToggleAccount = (email: string) => {
    setEnabledAccounts(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const filteredEvents = events.filter(event => 
    enabledAccounts.includes(event.account)
  );

  return (
    <div className="flex-1 flex bg-white dark:bg-custom-dark">
      <CalendarSidebar
        currentDate={currentDate}
        events={filteredEvents}
        accounts={accounts}
        enabledAccounts={enabledAccounts}
        onToggleAccount={handleToggleAccount}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={handleViewChange}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onToday={handleToday}
        />
        
        <CalendarGrid
          currentDate={currentDate}
          view={view}
          events={filteredEvents}
          onEventClick={() => {}}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>

      {editingEvent && (
        <MeetingScheduler
          isOpen={true}
          onClose={() => setEditingEvent(null)}
          defaultDate={editingEvent.start}
          editingEvent={editingEvent}
          onSave={(updatedEvent) => {
            setEvents(prev => prev.map(event => 
              event.id === updatedEvent.id ? updatedEvent : event
            ));
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}