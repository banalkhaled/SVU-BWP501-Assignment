
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import CategoryBadge from './CategoryBadge';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.event_date);
  const formattedDate = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full', timeStyle: 'short' }).format(eventDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300">
      <Link to={`/event/${event.id}`}>
        <img className="w-full h-48 object-cover" src={event.image} alt={event.title} />
      </Link>
      <div className="p-6">
        <span className="text-sm font-semibold text-primary dark:text-secondary">{event.category}</span>
        <h3 className="text-xl font-bold mt-2 mb-2 text-gray-900 dark:text-white">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{event.short_description}</p>
        <div className="text-xs text-gray-500 dark:text-gray-300 space-y-2">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <CategoryBadge category={event.category} className="mb-2" />
            </div>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{event.location}</span>
            </div>
        </div>
        <div className="mt-6">
          <Link
  to={`/event/${event.id}`}
  className="w-full inline-flex justify-center items-center text-center bg-primary bg-blue-600 text-white py-2 rounded-md hover:bg-primary-dark hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 transition-colors"
>
  التفاصيل
</Link>

        </div>
      </div>
    </div>
  );
};

export default EventCard;
