
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext';
import EventCard from '../components/EventCard';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
@@ -63,4 +63,4 @@ const EventDetailPage: React.FC = () => {
  );
};

export default EventDetailPage;
