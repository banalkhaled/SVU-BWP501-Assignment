import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext.tsx';
import EventCard from '../components/EventCard.tsx';
import { PARTICIPANTS } from '../constants';
import { EventCategory } from '../types.ts';
import CategoryBadge from '../components/CategoryBadge';

const HomePage: React.FC = () => {
  const { events } = useEvents();
  const featuredEvents = events.filter(e => e.featured).slice(0, 3);
  const latestEvents = events.slice(0, 6);
  const categories = Object.values(EventCategory);

  // Extra names to show alongside yours on the Home page
  const EXTRA_PARTICIPANTS = [
    { key: 'tareq-252629', display: 'Tareq_drkznli_252629 - طارق دركزنلي', id: '252629' },
    { key: 'kinan-238909', display: 'kinan_238909 — كنان الزين', id: '238909' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-gray-200 dark:bg-gray-800 p-12 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light mb-4">أهلاً بكم في دليل فعاليات المدينة</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">المكان الأول لاكتشاف أحدث وأمتع الفعاليات في مدينتكم.</p>
        <Link to="/events" className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary-dark transition-transform transform hover:scale-105">
          استكشف الفعاليات
        </Link>
      </section>

      {/* Featured Events */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">فعاليات بارزة هذا الأسبوع</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">تصفح حسب الفئة</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <Link key={category} to={`/events?category=${category}`} className="bg-secondary hover:bg-secondary-dark text-gray-800 font-bold py-2 px-4 rounded-full transition-colors">
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Events */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">أحدث الفعاليات</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Project Participants */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">المشاركون في المشروع</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {PARTICIPANTS.map(participant => (
              <li key={participant.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{participant.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{participant.role}</p>
                </div>
                <p className="text-sm font-mono text-primary dark:text-secondary">ID: {participant.id}</p>
              </li>
            ))}

            {/* Added names (requested) */}
            {EXTRA_PARTICIPANTS.map(p => (
              <li key={p.key} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{p.display}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">مطوّر</p>
                </div>
                <p className="text-sm font-mono text-primary dark:text-secondary">ID: {p.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
