import React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ProfileInfo from '../components/auth/profile/ProfileInfo';
import ProfileSettings from '../components/auth/profile/ProfileSettings';

const Profile = () => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <ProfileInfo />
          <ProfileSettings />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
