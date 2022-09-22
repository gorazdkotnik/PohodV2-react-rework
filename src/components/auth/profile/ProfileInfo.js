import { useState, useEffect } from 'react';

import { request } from '../../../utils/functions';
import { useUIContext } from '../../../context/UIContext';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import EventInfo from './EventInfo';

import { useAuthContext } from '../../../context/AuthContext';
import stringAvatar from './functions/stringAvatar';

const ProfileInfo = () => {
  const { user } = useAuthContext();
  // UI context
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  // User data type
  const [userType, setUserType] = useState(null);

  // Event
  const [event, setEvent] = useState(null);

  // Get event
  useEffect(() => {
    if (user.group) {
      setShowLoadingSpinner(true);
      request(`/events/${user.group.event_id}`)
        .then(res => {
          setShowLoadingSpinner(false);
          setEvent(res);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju dogodka',
            text: 'Prišlo je do napake pri pridobivanju dogodka. Poskusite znova.',
          });
        });
    }
  }, [user, setEvent, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    if (user) {
      setUserType(
        user.user_type === '2'
          ? 'Administrator'
          : user.user_type === '1'
          ? 'Učitelj'
          : 'Dijak'
      );
    }
  }, [user]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ my: 5 }}
      >
        {/* Avatar */}
        <Avatar {...stringAvatar(user.first_name + ' ' + user.last_name)} />

        {/* Name */}
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        {/* User type */}
        <Typography variant="button" display="block" gutterBottom>
          {userType}
        </Typography>

        {/* Email */}
        <Typography variant="p" display="block" gutterBottom>
          {user.email}
        </Typography>
      </Stack>

      {/* Event info */}
      <EventInfo user={user} event={event} />
    </>
  );
};

export default ProfileInfo;
