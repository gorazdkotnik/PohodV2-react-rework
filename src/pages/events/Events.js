import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AllEvents from './AllEvents';
import NewEvent from './NewEvent';
import EventDetails from './EventDetails';

import EventsNavigation from '../../components/events/EventsNavigation';

const Events = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/events') {
      navigate('/events/all');
    }
  }, [pathname, navigate]);

  return (
    <Card>
      <CardContent>
        <EventsNavigation />
        <Routes>
          <Route path="all" element={<AllEvents />} />
          <Route path="new" element={<NewEvent />} />
          <Route path=":id" element={<EventDetails />} />
        </Routes>
      </CardContent>
    </Card>
  );
};

export default Events;
