import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const EventInfo = ({ user, event }) => {
  return (
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
  );
};

export default EventInfo;
