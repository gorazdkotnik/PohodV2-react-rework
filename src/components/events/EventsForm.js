import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const EventsForm = ({ data = {}, method = 'POST', show = true } = {}) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [name, setName] = useState(data.name || '');
  const [nameInvalid, setNameInvalid] = useState(false);

  const [date, setDate] = useState(
    data.date || new Date().toISOString().slice(0, 10)
  );
  const [dateInvalid, setDateInvalid] = useState(false);

  const [minMembers, setMinMembers] = useState(data.min_group_members || 4);
  const [minMembersInvalid, setMinMembersInvalid] = useState(false);

  const [maxMembers, setMaxMembers] = useState(data.max_group_members || 6);
  const [maxMembersInvalid, setMaxMembersInvalid] = useState(false);

  const nameOnChangeHandler = event => {
    setName(event.target.value);
  };

  const dateOnChangeHandler = event => {
    setDate(event.target.value);
  };

  const minMembersOnChangeHandler = event => {
    setMinMembers(event.target.value < 1 ? 1 : event.target.value);
  };

  const maxMembersOnChangeHandler = event => {
    setMaxMembers(event.target.value < 1 ? 1 : event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setNameInvalid(false);
    setDateInvalid(false);
    setMinMembersInvalid(false);
    setMaxMembersInvalid(false);

    if (name.trim() === '') {
      setNameInvalid(true);
    }

    if (date === '') {
      setDateInvalid(true);
    }

    if (minMembers > maxMembers) {
      setMinMembersInvalid(true);
    }

    if (maxMembers < minMembers) {
      setMaxMembersInvalid(true);
    }

    if (
      name.trim() === '' ||
      date === '' ||
      minMembers > maxMembers ||
      maxMembers < minMembers
    ) {
      return;
    }

    setShowLoadingSpinner(true);
    request(`/events${method === 'PUT' ? `/${data.event_id}` : ''}`, method, {
      name,
      date,
      min_group_members: minMembers,
      max_group_members: maxMembers,
    })
      .then(data => {
        setShowLoadingSpinner(false);
        setNotification({
          type: 'success',
          title: `Dogodek ${
            method === 'PUT' ? 'posodobljen' : 'ustvarjen'
          } uspešno`,
        });

        navigate('/events/all', {
          replace: true,
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri ustvarjanju ali posodabljanju dogodka',
          text: 'Prišlo je do napake pri ustvarjanju ali posodabljanju. Poskusite znova.',
        });
      });
  };

  return (
    <>
      {show && (
        <div>
          <FormControl fullWidth sx={{ m: 1, mt: 4 }} variant="standard">
            <InputLabel htmlFor="name">Ime dogodka</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={nameOnChangeHandler}
              error={nameInvalid}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <Input
              id="date"
              value={date}
              onChange={dateOnChangeHandler}
              error={dateInvalid}
              type="date"
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="minMembers">Najmanj članov v ekipi</InputLabel>
            <Input
              id="minMembers"
              value={minMembers}
              onChange={minMembersOnChangeHandler}
              error={minMembersInvalid}
              type="number"
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="maxMembers">Največ članov v ekipi</InputLabel>
            <Input
              id="maxMembers"
              value={maxMembers}
              onChange={maxMembersOnChangeHandler}
              error={maxMembersInvalid}
              type="number"
            />
          </FormControl>

          <Tooltip
            title={
              method === 'POST'
                ? 'Ustvarite dogodek s podanimi podatki'
                : 'Posodobite izbran dogodek s podanimi podatki'
            }
          >
            <Button
              variant="contained"
              sx={{ m: 1, mt: 2 }}
              onClick={formOnSubmitHandler}
              color={method === 'PUT' ? 'warning' : 'primary'}
            >
              {method === 'POST' ? 'Ustvari' : 'Posodobi'}
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default EventsForm;
