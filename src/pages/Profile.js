import React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ProfileInfo from '../components/auth/ProfileInfo';
import ProfileSettings from '../components/auth/ProfileSettings';

const Profile = ({ user }) => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <ProfileInfo user={user} />
          <ProfileSettings />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
