import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import Map from '../ui/Map';

const TeacherHome = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [events, setEvents] = useState([]);
  const [points, setPoints] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/current_events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);

        if (data.length > 0) {
          setSelectedEvent(data[0]?.event_id);
        }
      })
      .catch(err => {});
  }, [setShowLoadingSpinner, setDialog]);

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      setShowLoadingSpinner(true);
      request(`/events/${selectedEvent}/tracking`)
        .then(data => {
          setShowLoadingSpinner(false);

          setPoints(
            data.map(group => ({
              ...group.point,
              name: group.group.name,
              point_id: group.point.point_id + '-' + group.group.group_id,
            }))
          );
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju obiskanih točk skupin',
            text: 'Prišlo je do napake pri pridobivanju obiskanih točk skupin. Poskusite znova.',
          });
        });
    }
  }, [selectedEvent, setShowLoadingSpinner, setDialog]);

  return (
    <Card>
      <CardContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {/* Headings */}
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            Zadnje obiskane točke skupin
          </Typography>
          <Typography variant="p" gutterBottom sx={{ textAlign: 'center' }}>
            Prikaz zadnjih obiskanih točk skupin
          </Typography>

          {/* Select */}
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel id="event">Dogodek</InputLabel>
            <Select
              labelId="event"
              id="event"
              value={selectedEvent}
              label="Dogodek"
              onChange={eventOnChangeHandler}
            >
              {events.map(event => (
                <MenuItem key={event.event_id} value={event.event_id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {points && <Map points={points} />}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeacherHome;
