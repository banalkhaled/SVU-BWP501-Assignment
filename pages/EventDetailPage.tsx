
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext.tsx';
import EventCard from '../components/EventCard.tsx';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, events } = useEvents();
  
  const eventId = id ? parseInt(id, 10) : undefined;
  const event = eventId !== undefined ? getEventById(eventId) : undefined;

  if (!event) {
    return <div className="text-center text-2xl">لم يتم العثور على الفعالية.</div>;
  }

  const relatedEvents = events.filter(
    e => e.category === event.category && e.id !== event.id
  ).slice(0, 3);

  const eventDate = new Date(event.event_date);
  const formattedDate = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full', timeStyle: 'short' }).format(eventDate);


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <img className="w-full h-64 md:h-96 object-cover" src={event.image} alt={event.title} />
      <div className="p-6 md:p-10">
        <span className="text-sm font-semibold text-primary dark:text-secondary">{event.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold my-3 text-gray-900 dark:text-white">{event.title}</h1>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{event.location}</span>
            </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
        
        <div className="mt-8 flex gap-4">
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">أضف للتقويم</button>
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">شارك</button>
        </div>
      </div>
      
      {relatedEvents.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6">فعاليات ذات صلة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedEvents.map(relatedEvent => (
              <EventCard key={relatedEvent.id} event={relatedEvent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;