import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import EventItemTabs from './EventItemTabs';

import { useUIContext } from '../../context/UIContext';

import Map from '../ui/Map';

import { formatDate, request } from '../../utils/functions';

const EventItem = ({ event, showDetails, onReloadEvent }) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const [mapEditMode, setMapEditMode] = React.useState(false);

  const onDeleteHandler = () => {
    setShowLoadingSpinner(true);
    request(`/events/${event.event_id}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);
        setNotification({
          title: 'Dogodek je bil uspešno izbrisan',
        });

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

        setNotification({
          title: 'Točke so bile uspešno posodobljene',
        });

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

    setShowLoadingSpinner(true);
    request('/question_groups')
      .then(res => {
        setShowLoadingSpinner(false);

        if (res.length === 0) {
          setDialog({
            title: 'Za ustvarjanje točke ni skupin vprašanj',
            text: 'Za ustvarjanje točke morate najprej ustvariti skupino vprašanj.',
          });

          return;
        }

        const point = {
          name: `Točka ${event.points.length + 1}`,
          event_id: +event.event_id,
          serial_number: event.points.length,
          location_lat: lat,
          location_long: lng,
          question_group_id: res[0].question_group_id,
        };

        postPoints([...event.points, point]);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju skupine vprašanj',
          text: 'Prišlo je do napake pri pridobivanju skupine vprašanj. Poskusite znova.',
        });
      });
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

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="p"
            gutterBottom
            sx={{ display: 'block', mb: 3, mt: 5 }}
          >
            {formatDate(event.date)}
          </Typography>
          <Tooltip
            title={
              !mapEditMode
                ? 'Preidi v način urejanja točk na mapi'
                : 'Prekini način urejanja točk na mapi'
            }
          >
            <IconButton
              sx={{ display: 'block', mb: 3, mt: 5 }}
              onClick={() => {
                setMapEditMode(prev => !prev);
              }}
            >
              {!mapEditMode && <EditLocationAltIcon color="warning" />}
              {mapEditMode && <LocationOffIcon color="error" />}
            </IconButton>
          </Tooltip>
        </Stack>
        {showDetails && (
          <Map
            className="leaflet-event-container my-10"
            points={event.points}
            onMarkerClickHandler={onMarkerClickHandler}
            onMapClickHandler={onMapClickHandler}
            editMode={mapEditMode}
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
          <EventItemTabs
            event={event}
            onReloadEvent={onReloadEvent}
            onDeleteHandler={onDeleteHandler}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EventItem;
