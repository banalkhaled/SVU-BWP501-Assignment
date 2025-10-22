
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext';
import EventCard from '../components/EventCard';
import { EventCategory } from '../types';

const EventsPage: React.FC = () => {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>(searchParams.get('category') as EventCategory || 'all');
  const [sortDate, setSortDate] = useState<'asc' | 'desc'>('asc');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as EventCategory | 'all';
    setSelectedCategory(category);
    if(category === 'all') {
        searchParams.delete('category');
    } else {
        searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredAndSortedEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.event_date).getTime();
        const dateB = new Date(b.event_date).getTime();
        return sortDate === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [events, searchTerm, selectedCategory, sortDate]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">كل الفعاليات</h1>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="ابحث عن فعالية..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full md:w-1/3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">كل الفئات</option>
          {Object.values(EventCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={sortDate}
          onChange={(e) => setSortDate(e.target.value as 'asc' | 'desc')}
          className="w-full md:w-1/3 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="asc">فرز حسب التاريخ: من الأقدم للأحدث</option>
          <option value="desc">فرز حسب التاريخ: من الأحدث للأقدم</option>
        </select>
      </div>

      {filteredAndSortedEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-12">لا توجد فعاليات تطابق بحثك.</p>
      )}
    </div>
  );
};

export default EventsPage;
