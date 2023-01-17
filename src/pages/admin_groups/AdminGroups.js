import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useUIContext } from '../../context/UIContext';
import { request } from '../../utils/functions';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import AdminGroupsGrades from './AdminGroupsGrades';
import AdminGroupsGroups from './AdminGroupsGroups';

import AdminGroupsNavigation from '../../components/admin_groups/navigation/AdminGroupsNavigation';

const Events = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    if (pathname === '/admin-groups') {
      navigate('/admin-groups/grades');
    }
  }, [pathname, navigate]);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
        if (data.length > 0) {
          setSelectedEvent(data[0].event_id);
        }
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

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth sx={{ m: 1, mb: 4 }} variant="standard">
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

        <AdminGroupsNavigation />
        <Routes>
          <Route path="grades" element={<AdminGroupsGrades />} />
          <Route path="groups" element={<AdminGroupsGroups />} />
        </Routes>
      </CardContent>
    </Card>
  );
};

export default Events;
