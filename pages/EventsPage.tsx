import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext.tsx';
import EventCard from '../components/EventCard.tsx';
import { EventCategory } from '../types.ts';

const EventsPage: React.FC = () => {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | 'all'>(searchParams.get('category') as EventCategory || 'all');
  const [sortDate, setSortDate] = useState<'asc'|'desc'>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as EventCategory | 'all';
    setSelectedCategory(category);
    if (category === 'all') searchParams.delete('category'); else searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  const filteredAndSorted = useMemo(() => {
    return events
      .filter(e => {
        const matchesSearch =
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;

        const t = new Date(e.event_date).getTime();
        const afterStart = startDate ? t >= new Date(startDate).getTime() : true;
        const beforeEnd  = endDate   ? t <= new Date(endDate).getTime()   : true;

        return matchesSearch && matchesCategory && afterStart && beforeEnd;
      })
      .sort((a,b) => {
        const A = new Date(a.event_date).getTime();
        const B = new Date(b.event_date).getTime();
        return sortDate === 'asc' ? A - B : B - A;
      });
  }, [events, searchTerm, selectedCategory, sortDate, startDate, endDate]);

  return (
    <div className="space-y-4">
      <h1 className="text-4xl fw-bold text-center">كل الفعاليات</h1>

      <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-md">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-3">
            <input className="form-control" placeholder="ابحث عن فعالية..."
                   value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
          </div>
          <div className="col-12 col-md-3">
            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">كل الفئات</option>
              {Object.values(EventCategory).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <div className="col-6 col-md-2">
            <input type="date" className="form-control" value={endDate} onChange={e=>setEndDate(e.target.value)} />
          </div>
          <div className="col-12 col-md-2">
            <select className="form-select" value={sortDate} onChange={e=>setSortDate(e.target.value as 'asc'|'desc')}>
              <option value="asc">من الأقدم للأحدث</option>
              <option value="desc">من الأحدث للأقدم</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSorted.length ? (
        <div className="row g-4">
          {filteredAndSorted.map(ev => (
            <div className="col-12 col-md-6 col-lg-4" key={ev.id}><EventCard event={ev} /></div>
          ))}
        </div>
      ) : <p className="text-center text-muted mt-4">لا توجد فعاليات تطابق بحثك.</p>}
    </div>
  );
};
export default EventsPage;
