import React from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import useProtectedRoute from '../hooks/useProtectedRoute';
import LoginButton from '../components/auth/LoginButton';

const Login = () => {
  useProtectedRoute('notRequired');

  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Stack direction="column" justifyContent="center" sx={{ height: '60vh' }}>
        <Card>
          <CardContent>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={6}
            >
              <img
                src="/images/school_logo.svg"
                alt="logo"
                className="school-logo"
              />

              <Typography variant="h6" component="h1">
                Prijava v aplikacijo
              </Typography>

              {/* Login button */}
              <LoginButton />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Login;
