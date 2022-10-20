import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { useAuthContext } from '../../context/AuthContext';

const NewGroupForm = () => {
  const { refreshUser } = useAuthContext();
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [groupName, setGroupName] = useState('');
  const [groupNameInvalid, setGroupNameInvalid] = useState(false);

  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactPhoneNumberInvalid, setContactPhoneNumberInvalid] =
    useState(false);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const groupNameOnChangeHandler = event => {
    setGroupName(event.target.value);
  };

  const contactPhoneNumberOnChangeHandler = event => {
    setContactPhoneNumber(event.target.value);
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

    if (contactPhoneNumber.trim() === '') {
      setContactPhoneNumberInvalid(true);
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
    request('/groups', 'POST', {
      name: groupName.trim(),
      event_id: selectedEvent,
      contact_phone_number: contactPhoneNumber.trim(),
    })
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
    request('/signup_events')
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
      <Alert severity="warning" sx={{ mb: 2, mt: 4 }}>
        <AlertTitle>Vnos telefonske številke</AlertTitle>
        Bodite pozorni pri vnosu telefonske številke. Nadaljne spreminjanje po
        ustvarjanju skupine je mogoče le s{' '}
        <strong>kontaktiranjem administratorja</strong>!
      </Alert>

      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="groupName">Ime skupine</InputLabel>
        <Input
          id="groupName"
          value={groupName}
          onChange={groupNameOnChangeHandler}
          error={groupNameInvalid}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="event">
          Telefonska številka vodje skupine
        </InputLabel>
        <Input
          id="contactPhoneNumber"
          value={contactPhoneNumber}
          onChange={contactPhoneNumberOnChangeHandler}
          error={contactPhoneNumberInvalid}
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

      <Tooltip title="Ustvari skupino s podanimi podatki">
        <Button
          variant="contained"
          sx={{ m: 1, mt: 4 }}
          onClick={formOnSubmitHandler}
        >
          Ustvari skupino
        </Button>
      </Tooltip>
    </>
  );
};

export default NewGroupForm;
