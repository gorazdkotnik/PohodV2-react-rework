import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import Map from '../ui/Map';

import EventsForm from './EventsForm';
import EventPoints from './EventPoints';

import { formatDate, request } from '../../utils/functions';

const EventItem = ({ event, showDetails, onReloadEvent }) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [showEditForm, setShowEditForm] = useState(false);
  const [showPoints, setShowPoints] = useState(false);

  const onDeleteHandler = () => {
    setShowLoadingSpinner(true);
    request(`/events/${event.event_id}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);
        navigate('/events/all');
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri brisanju',
          text: 'Prišlo je do napake pri brisanju dogodka. Poskusite znova.',
        });
      });
  };

  const postPoints = points => {
    setShowLoadingSpinner(true);
    request(`/points/${event.event_id}`, 'PUT', {
      points,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        onReloadEvent();
      })
      .catch(e => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri točkah',
          text: 'Prišlo je do napake pri spreminjanju točk. Poskusite znova.',
        });
      });
  };

  const onMarkerClickHandler = e => {
    const updatedPoints = event.points.filter(point => point.point_id !== e);
    postPoints(updatedPoints);
  };

  const onMapClickHandler = e => {
    const { lat, lng } = e.latlng;

    const point = {
      name: `Točka ${event.points.length + 1}`,
      event_id: +event.event_id,
      serial_number: event.points.length,
      location_lat: lat,
      location_long: lng,
    };

    postPoints([...event.points, point]);
  };

  return (
    <Card sx={{ my: 4, boxShadow: showDetails ? 'none !important' : '' }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: '#2196f3', p: 1, color: '#fff' }}
        >
          {event.name}
        </Typography>
        <Typography
          variant="p"
          gutterBottom
          sx={{ display: 'block', mb: 3, mt: 5 }}
        >
          {formatDate(event.date)}
        </Typography>
        {showDetails && (
          <Map
            className="leaflet-event-container my-10"
            points={event.points}
            onMarkerClickHandler={onMarkerClickHandler}
            onMapClickHandler={onMapClickHandler}
          />
        )}
        {!showDetails && (
          <Button
            variant="outlined"
            component={NavLink}
            to={`/events/${event.event_id}`}
          >
            Oglej si dogodek
          </Button>
        )}
        {showDetails && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            sx={{ my: 2 }}
          >
            <Button variant="contained" color="error" onClick={onDeleteHandler}>
              Izbriši dogodek
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setShowEditForm(prev => !prev)}
            >
              {showEditForm ? 'Zapri' : 'Uredi'}
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowPoints(prev => !prev)}
            >
              Točke
            </Button>
          </Stack>
        )}
        {showDetails && (
          <EventsForm data={event} method="PUT" show={showEditForm} />
        )}
        {showPoints && <EventPoints points={event.points} />}
      </CardContent>
    </Card>
  );
};

export default EventItem;
