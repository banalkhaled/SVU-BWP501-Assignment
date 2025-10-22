import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext.tsx';
import EventCard from '../components/EventCard.tsx';

function downloadICS({ title, description, location, start }: {
  title: string; description: string; location: string; start: string;
}) {
  const dt = new Date(start);
  const pad = (n:number)=> String(n).padStart(2,'0');
  const y = dt.getUTCFullYear();
  const m = pad(dt.getUTCMonth()+1);
  const d = pad(dt.getUTCDate());
  const hh = pad(dt.getUTCHours());
  const mm = pad(dt.getUTCMinutes());
  const stamp = `${y}${m}${d}T${hh}${mm}00Z`;
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SVU Events//EN','BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${stamp}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g,'\\n')}`,
    `LOCATION:${location}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type:'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'event.ics'; a.click(); URL.revokeObjectURL(url);
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, events } = useEvents();

  const eventId = id ? parseInt(id, 10) : undefined;
  const event = eventId !== undefined ? getEventById(eventId) : undefined;

  if (!event) return <div className="text-center fs-4">لم يتم العثور على الفعالية.</div>;

  const formattedDate = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.event_date));
  const related = events.filter(e => e.category === event.category && e.id !== event.id).slice(0,3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
      <img className="w-100 object-cover" style={{height:'24rem'}} src={event.image} alt={event.title} />
      <div className="p-4 p-md-5">
        <span className="badge text-bg-primary">{event.category}</span>
        <h1 className="display-6 my-3">{event.title}</h1>

        <div className="text-muted mb-3">
          <i className="bi bi-calendar-week me-1"></i>{formattedDate} &nbsp;|&nbsp;
          <i className="bi bi-geo-alt me-1"></i>{event.location}
        </div>

        <p className="lead">{event.description}</p>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-primary"
            onClick={() => downloadICS({
              title: event.title,
              description: event.description,
              location: event.location,
              start: event.event_date
            })}>
            أضف للتقويم
          </button>

          <button className="btn btn-outline-secondary"
                  type="button" data-bs-toggle="modal" data-bs-target="#rsvpModal">
            احجز/RSVP
          </button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="rsvpModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">حجز مقعد لفعالية: {event.title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-12">
                  <label className="form-label">الاسم</label>
                  <input className="form-control" required />
                </div>
                <div className="col-12">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input type="email" className="form-control" required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">تأكيد</button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-top p-4 p-md-5">
          <h2 className="h4 mb-3">فعاليات ذات صلة</h2>
          <div className="row g-4">
            {related.map(r => (
              <div className="col-12 col-md-6 col-lg-4" key={r.id}><EventCard event={r} /></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default EventDetailPage;
