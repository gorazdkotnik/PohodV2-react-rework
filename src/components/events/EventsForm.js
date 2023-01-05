import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

  const [allowStudentGroupCreation, setAllowStudentGroupCreation] = useState(
    data.allow_student_group_creation || true
  );

  const [maxNumberOfTeachersOnPoint, setMaxNumberOfTeachersOnPoint] = useState(
    data.max_num_teachers_on_point || 1
  );

  const maxNumberOfTeachersOnPointOnChangeHandler = event => {
    setMaxNumberOfTeachersOnPoint(
      event.target.value < 1 ? 1 : event.target.value
    );
  };

  const allowStudentGroupCreationOnChangeHandler = event => {
    setAllowStudentGroupCreation(event.target.value);
  };

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
      setDialog({
        title: 'Napaka pri vnosu podatkov',
        text: 'Prosimo, preverite vnesene podatke in, če so vsi zahtevani podatki vneseni ter poskusite znova.',
      });

      return;
    }

    setShowLoadingSpinner(true);
    request(`/events${method === 'PUT' ? `/${data.event_id}` : ''}`, method, {
      name,
      signup_start_time: Math.trunc(dayjs(signupStartTime).unix()),
      signup_end_time: Math.trunc(dayjs(signUpEndTime).unix()),
      event_start_time: Math.trunc(dayjs(eventStartTime).unix()),
      event_end_time: Math.trunc(dayjs(eventEndTime).unix()),
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
          <Accordion sx={{ my: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>Osnovni podatki</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth sx={{ m: 1, mt: -1 }} variant="standard">
                <InputLabel htmlFor="name">Ime dogodka</InputLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={nameOnChangeHandler}
                  error={nameInvalid}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
                <InputLabel htmlFor="minMembers">
                  Najmanj članov v ekipi
                </InputLabel>
                <Input
                  id="minMembers"
                  value={minMembers}
                  onChange={minMembersOnChangeHandler}
                  error={minMembersInvalid}
                  type="number"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
                <InputLabel htmlFor="maxMembers">
                  Največ članov v ekipi
                </InputLabel>
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
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ my: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>Časovni podatki</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="sl"
                >
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="sl"
                >
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="sl"
                >
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="sl"
                >
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
            </AccordionDetails>
          </Accordion>

          {/* TODO: implementacija na backendu, ce admin dovoli da dijaki sami kreirajo dogodke */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>Administratorska konfiguracija</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth sx={{ m: 1, mt: 2 }}>
                <InputLabel id="group-creation-label">
                  Ustvarjanje in dodajanje skupin
                </InputLabel>
                <Select
                  labelId="group-creation-label"
                  id="group-creation"
                  value={allowStudentGroupCreation}
                  label="Ustvarjanje in dodajanje skupin"
                  onChange={allowStudentGroupCreationOnChangeHandler}
                >
                  <MenuItem value={true}>
                    Dijaki imajo pravice, da v času prijave sami ustvarijo
                    skupine, poleg tega pa imajo možnost pridružitve obstoječim
                    skupinam
                  </MenuItem>
                  <MenuItem value={false}>
                    Možnost ustvarjanja skupin je onemogočena, dijaki se lahko
                    samo pridružijo obstoječim skupinam. Ustvarjanje skupin je
                    možno le preko administratorskega vmesnika.
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
                <InputLabel htmlFor="maxNumberOfTeachersOnPoint">
                  Maksimalno število učiteljev na posamezni točki
                </InputLabel>
                <Input
                  id="maxNumberOfTeachersOnPoint"
                  value={maxNumberOfTeachersOnPoint}
                  onChange={maxNumberOfTeachersOnPointOnChangeHandler}
                  error={maxNumberOfTeachersOnPoint < 1}
                  type="number"
                  min={1}
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>

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
