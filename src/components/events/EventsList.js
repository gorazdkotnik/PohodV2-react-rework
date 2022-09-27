import React from 'react';

import Typography from '@mui/material/Typography';

import EventItem from './EventItem';

const EventsList = ({ events }) => {
  return (
    <>
      {events &&
        events.length > 0 &&
        events.map(event => <EventItem key={event.event_id} event={event} />)}
      {events && events.length === 0 && (
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mt: 2, fontWeight: 'light' }}
        >
          Ni dogodkov za prikaz!
        </Typography>
      )}
    </>
  );
};

export default EventsList;
