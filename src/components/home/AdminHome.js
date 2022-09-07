import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminHome = () => {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <AdminPanelSettingsIcon
            fontSize="large"
            sx={{ transform: 'scale(5)', my: 10 }}
          />
          <Typography variant="h4">Pohod V2 - Admin</Typography>
          <Typography variant="h6">
            Aplikacija za organizacijo in izvedbo orientacijskega pohoda.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdminHome;
