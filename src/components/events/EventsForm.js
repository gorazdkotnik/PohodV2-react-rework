import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import dayjs from 'dayjs';
import 'dayjs/locale/sl';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const EventsForm = ({ data = {}, method = 'POST', show = true } = {}) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [name, setName] = useState(data.name || '');
  const [nameInvalid, setNameInvalid] = useState(false);

  const [signupStartTime, setSignupStartTime] = useState(
    data.signup_start_time || new Date().toISOString()
  );

  const [signUpEndTime, setSignUpEndTime] = useState(
    data.signup_end_time ||
      dayjs(data.signup_start_time).add(1, 'minute').toISOString()
  );

  const [eventStartTime, setEventStartTime] = useState(
    data.event_start_time || new Date().toISOString()
  );

  const [eventEndTime, setEventEndTime] = useState(
    data.event_end_time ||
      dayjs(data.event_start_time).add(1, 'minute').toISOString()
  );

  const [numOfQuestionsAtPoint, setNumOfQuestionsAtPoint] = useState(
    data.num_questions_at_point || 1
  );

  const [minMembers, setMinMembers] = useState(data.min_group_members || 4);
  const [minMembersInvalid, setMinMembersInvalid] = useState(false);

  const [maxMembers, setMaxMembers] = useState(data.max_group_members || 6);
  const [maxMembersInvalid, setMaxMembersInvalid] = useState(false);

  const nameOnChangeHandler = event => {
    setName(event.target.value);
  };

  const minMembersOnChangeHandler = event => {
    setMinMembers(event.target.value < 1 ? 1 : event.target.value);
  };

  const maxMembersOnChangeHandler = event => {
    setMaxMembers(event.target.value < 1 ? 1 : event.target.value);
  };

  const numOfQuestionsAtPointOnChangeHandler = event => {
    setNumOfQuestionsAtPoint(event.target.value < 1 ? 1 : event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setNameInvalid(false);
    setMinMembersInvalid(false);
    setMaxMembersInvalid(false);

    if (name.trim() === '') {
      setNameInvalid(true);
    }

    if (minMembers > maxMembers) {
      setMinMembersInvalid(true);
    }

    if (maxMembers < minMembers) {
      setMaxMembersInvalid(true);
    }

    if (
      dayjs(signupStartTime).isAfter(signUpEndTime) ||
      dayjs(signUpEndTime).isBefore(signupStartTime) ||
      dayjs(eventStartTime).isAfter(eventEndTime) ||
      dayjs(eventEndTime).isBefore(eventStartTime) ||
      name.trim() === '' ||
      minMembers > maxMembers ||
      maxMembers < minMembers
    ) {
      return;
    }

    setShowLoadingSpinner(true);
    request(`/events${method === 'PUT' ? `/${data.event_id}` : ''}`, method, {
      name,
      // TODO: Fix this
      signup_start_time: Math.trunc(dayjs(signupStartTime).unix() / 1000),
      signup_end_time: Math.trunc(dayjs(signUpEndTime).unix() / 1000),
      event_start_time: Math.trunc(dayjs(eventStartTime).unix() / 1000),
      event_end_time: Math.trunc(dayjs(eventEndTime).unix() / 1000),
      min_group_members: minMembers,
      max_group_members: maxMembers,
      num_questions_at_point: numOfQuestionsAtPoint,
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

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="numberOfQuestionsAtPoint">
              Število vprašanj na posamezni točki
            </InputLabel>
            <Input
              id="numberOfQuestionsAtPoint"
              value={numOfQuestionsAtPoint}
              onChange={numOfQuestionsAtPointOnChangeHandler}
              type="number"
              min={1}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sl">
              <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label="Začetek prijave na dogodek"
                value={signupStartTime}
                onChange={newValue => {
                  setSignupStartTime(newValue);
                }}
                maxDateTime={dayjs(signUpEndTime).subtract(1, 'minute')}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sl">
              <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label="Konec prijave na dogodek"
                value={signUpEndTime}
                onChange={newValue => {
                  setSignUpEndTime(newValue);
                }}
                minDateTime={dayjs(signupStartTime).add(1, 'minute')}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sl">
              <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label="Začetek dogodka"
                value={eventStartTime}
                onChange={newValue => {
                  setEventStartTime(newValue);
                }}
                maxDateTime={dayjs(eventEndTime).subtract(1, 'minute')}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sl">
              <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label="Konec dogodka"
                value={eventEndTime}
                onChange={newValue => {
                  setEventEndTime(newValue);
                }}
                minDateTime={dayjs(eventStartTime).add(1, 'minute')}
              />
            </LocalizationProvider>
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
