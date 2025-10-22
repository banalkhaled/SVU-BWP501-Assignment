import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types.ts';

const EventCard: React.FC<{event: Event}> = ({ event }) => {
  const eventDate = new Date(event.event_date);
  const formattedDate = new Intl.DateTimeFormat('ar-SA', { dateStyle: 'full', timeStyle: 'short' }).format(eventDate);

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/event/${event.id}`}>
        <img src={event.image} className="card-img-top" alt={event.title} />
      </Link>
      <div className="card-body">
        <span className="badge text-bg-primary mb-2">{event.category}</span>
        <h5 className="card-title fw-bold">{event.title}</h5>
        <p className="card-text small text-muted mb-2">{event.short_description}</p>
        <p className="card-text small">
          <i className="bi bi-calendar-week me-1"></i>{formattedDate} &nbsp;|&nbsp;
          <i className="bi bi-geo-alt me-1"></i>{event.location}
        </p>
        <Link to={`/event/${event.id}`} className="btn btn-primary w-100">التفاصيل</Link>
      </div>
    </div>
  );
};
export default EventCard;
