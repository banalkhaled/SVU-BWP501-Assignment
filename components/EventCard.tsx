
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
@@ -40,4 +40,4 @@ const EventCard: React.FC<EventCardProps> = ({ event }) => {
  );
};

export default EventCard;
