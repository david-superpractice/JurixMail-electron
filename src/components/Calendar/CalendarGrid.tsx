import { format, startOfWeek, addDays, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CalendarEvent } from './types';
import { EventDetails } from './EventDetails';
import { useState } from 'react';

interface CalendarGridProps {
  currentDate: Date;
  view: 'week' | 'month';
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function CalendarGrid({ 
  currentDate, 
  view, 
  events, 
  onEventClick,
  onEditEvent,
  onDeleteEvent 
}: CalendarGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    onEventClick(event);
  };

  return (
    <>
      {view === 'week' ? (
        <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />
      ) : (
        <MonthView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />
      )}

      <EventDetails
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={(event) => {
          onEditEvent(event);
          setSelectedEvent(null);
        }}
        onDelete={(event) => {
          onDeleteEvent(event.id);
          setSelectedEvent(null);
        }}
      />
    </>
  );
}

interface ViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

function WeekView({ currentDate, events, onEventClick }: ViewProps) {
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = `${(startHour - 6) * 60}px`;
    const height = `${(endHour - startHour) * 60}px`;
    return { top, height };
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-8 h-full min-h-[1200px]">
        {/* Time labels */}
        <div className="border-r border-gray-200 dark:border-gray-700">
          {Array.from({ length: 13 }, (_, i) => i + 6).map(hour => (
            <div
              key={hour}
              className="h-[60px] text-right pr-2 text-sm text-gray-500 dark:text-gray-400"
            >
              {format(new Date().setHours(hour, 0), 'ha')}
            </div>
          ))}
        </div>

        {/* Days */}
        {days.map(day => (
          <div key={day.toString()} className="relative border-r border-gray-200 dark:border-gray-700">
            <div className="sticky top-0 z-10 bg-white dark:bg-custom-dark border-b border-gray-200 dark:border-gray-700 px-2 py-3">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {format(day, 'EEE')}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {format(day, 'd')}
              </div>
            </div>

            {/* Hour grid lines */}
            {Array.from({ length: 13 }, (_, i) => (
              <div
                key={i}
                className="h-[60px] border-b border-gray-200 dark:border-gray-700"
              />
            ))}

            {/* Events */}
            {events
              .filter(event => isSameDay(event.start, day))
              .map(event => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="absolute left-1 right-1 rounded-md px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 overflow-hidden cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800/50 text-left"
                  style={getEventPosition(event)}
                >
                  {event.title}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthView({ currentDate, events, onEventClick }: ViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const days = eachDayOfInterval({ start: startDate, end: monthEnd });

  return (
    <div className="flex-1 grid grid-cols-7 auto-rows-fr gap-px bg-gray-200 dark:bg-gray-700">
      {/* Day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div
          key={day}
          className="bg-white dark:bg-custom-dark p-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map(day => (
        <div
          key={day.toString()}
          className={`bg-white dark:bg-custom-dark p-2 min-h-[120px] ${
            !isSameMonth(day, currentDate)
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          <div className="font-medium text-sm">{format(day, 'd')}</div>
          <div className="mt-1 space-y-1">
            {events
              .filter(event => isSameDay(event.start, day))
              .map(event => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full text-left text-xs px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800/50"
                >
                  {format(event.start, 'h:mm a')} {event.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}