
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext';
import EventCard from '../components/EventCard';
import { EventCategory } from '../types';

const EventsPage: React.FC = () => {
  const { events } = useEvents();
@@ -81,4 +81,4 @@ const EventsPage: React.FC = () => {
  );
};

export default EventsPage;
