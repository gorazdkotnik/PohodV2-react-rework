import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';

const Leaderboard = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
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
            return [
              index + 1,
              item.name,
              item.time,
              `${item.correct_answers} / ${item.possible_points}`,
            ];
          });

          setGroups(newData);
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
              id="demo-simple-select"
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Ime skupine</TableCell>
                    <TableCell>Čas hoje</TableCell>
                    <TableCell>Točke za odgovore</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map(row => (
                    <TableRow
                      key={row[0]}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell>{row[1]}</TableCell>
                      <TableCell>{row[2]}</TableCell>
                      <TableCell>{row[3]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
