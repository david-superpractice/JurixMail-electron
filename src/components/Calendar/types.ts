export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'task' | 'personal';
  description?: string;
  location?: string;
  attendees?: Attendee[];
  account: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    count?: number;
  };
  conferencing?: {
    provider: 'google-meet' | 'zoom' | 'teams';
    link: string;
    dialIn?: string;
  };
}

export interface Attendee {
  email: string;
  name: string;
  response: 'accepted' | 'declined' | 'tentative' | 'pending';
  organizer?: boolean;
}