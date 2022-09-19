import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { useAuthContext } from '../../context/AuthContext';

const NewGroupForm = () => {
  const { refreshUser } = useAuthContext();
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [groupName, setGroupName] = useState('');
  const [groupNameInvalid, setGroupNameInvalid] = useState(false);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const groupNameOnChangeHandler = event => {
    setGroupName(event.target.value);
  };

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setGroupNameInvalid(false);

    if (groupName.trim() === '') {
      setGroupNameInvalid(true);
      return;
    }

    if (selectedEvent.trim() === '') {
      setDialog({
        title: 'Napaka pri ustvarjanju skupine',
        text: 'Prišlo je do napake pri ustvarjanju skupine. Prosimo izberite dogodek.',
      });
      return;
    }

    setShowLoadingSpinner(true);
    request('/groups', 'POST', { name: groupName, event_id: selectedEvent })
      .then(data => {
        setShowLoadingSpinner(false);
        refreshUser().then(() => {
          navigate('/groups/my_group', { replace: true });
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri ustvarjanju skupine',
          text: 'Prišlo je do napake pri ustvarjanju skupine. Poskusite znova.',
        });
      });
  };

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

  return (
    <>
      <FormControl fullWidth sx={{ m: 1, mt: 4 }} variant="standard">
        <InputLabel htmlFor="groupName">Ime skupine</InputLabel>
        <Input
          id="groupName"
          value={groupName}
          onChange={groupNameOnChangeHandler}
          error={groupNameInvalid}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
        <InputLabel htmlFor="event">Dogodek</InputLabel>
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
      <Button
        variant="contained"
        sx={{ m: 1, mt: 4 }}
        onClick={formOnSubmitHandler}
      >
        Ustvari skupino
      </Button>
    </>
  );
};

export default NewGroupForm;
