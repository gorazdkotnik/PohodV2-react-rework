import { useState, useEffect } from 'react';

import { request } from '../../utils/functions';
import { useUIContext } from '../../context/UIContext';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Avatar name to color
function stringToColor(string) {
  try {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  } catch (err) {}
}

// Avatar settings
function stringAvatar(name) {
  try {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100,
        height: 100,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } catch (err) {}
}

const ProfileInfo = ({ user }) => {
  // UI context
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  // User data type
  const userType =
    user.user_type === '2'
      ? 'Administrator'
      : user.user_type === '1'
      ? 'Učitelj'
      : 'Dijak';

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

      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ my: 5 }}
      >
        {/* User group */}
        {user.group && (
          <Card>
            <CardContent>
              <Typography variant="h6" display="block" gutterBottom>
                Pri skupini
              </Typography>
              <Typography variant="p" display="block" gutterBottom>
                {user.group.name}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* User event */}
        {user.group && event && (
          <Card>
            <CardContent>
              <Typography variant="h6" display="block" gutterBottom>
                Pri dogodku
              </Typography>
              <Typography variant="p" display="block" gutterBottom>
                {event.name}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* User group code */}
        {user.group && (
          <Card>
            <CardContent>
              <Typography variant="h6" display="block" gutterBottom>
                Koda skupine
              </Typography>
              <Typography variant="p" display="block" gutterBottom>
                {user.group.code}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
    </>
  );
};

export default ProfileInfo;
