
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types';
import { MOCK_EVENTS } from '../constants';

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  getEventById: (id: number) => Event | undefined;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents(prevEvents => [
      ...prevEvents,
      { ...event, id: Date.now() }, 
    ]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents =>
      prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const deleteEvent = (id: number) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const getEventById = (id: number) => {
    return events.find(event => event.id === id);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventById }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
