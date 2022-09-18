import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Table from '../components/ui/Table';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';

const Leaderboard = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [events, setEvents] = useState([]);

  const [groups, setGroups] = useState([]);
  const [groupsColumns, setGroupsColumns] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
        setSelectedEvent(data[0].event_id);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodkov',
          text: 'Prišlo je do napake pri pridobivanju dogodkov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      setShowLoadingSpinner(true);
      request(`/leaderboards/${selectedEvent}`)
        .then(data => {
          setShowLoadingSpinner(false);

          const newData = data.map((item, index) => {
            return {
              id: index + 1,
              groupName: item.name,
              time: item.time,
              answersPoints: `${item.correct_answers} / ${item.possible_points}`,
            };
          });

          const newColumns = [
            { field: 'id', headerName: '#', width: 100 },
            { field: 'groupName', headerName: 'Ime skupine', width: 250 },
            { field: 'time', headerName: 'Čas hoje', width: 250 },
            {
              field: 'answersPoints',
              headerName: 'Točke za odgovore',
              width: 200,
            },
          ];

          setGroups(newData);
          setGroupsColumns(newColumns);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju rezultatov',
            text: 'Prišlo je do napake pri pridobivanju rezultatov. Poskusite znova.',
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
            Rezultati
          </Typography>
          <Typography variant="p" gutterBottom sx={{ textAlign: 'center' }}>
            Prikaz rezultatov za posamezne dogodke
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

          {/* Table */}
          {selectedEvent && groups && groups.length > 0 && (
            <Table data={groups} columns={groupsColumns} />
          )}
          {selectedEvent !== '' && groups && groups.length < 1 && (
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
              Ni rezultatov za prikaz!
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
