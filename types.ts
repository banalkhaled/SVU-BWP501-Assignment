
export interface Event {
  id: number;
  title: string;
  description: string;
  short_description: string;
  category: EventCategory;
  location: string;
  event_date: string;
  image: string;
  featured?: boolean;
}

export enum EventCategory {
  Culture = 'ثقافة',
  Sports = 'رياضة',
  Music = 'موسيقى',
  Family = 'عائلي',
  Tech = 'تقنية',
  Food = 'طعام',
}

export interface Participant {
  id: string;
  name: string;
  role: string;
}
