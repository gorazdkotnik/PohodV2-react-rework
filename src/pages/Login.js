import React from 'react';

import Container from '@mui/material/Container';

import useProtectedRoute from '../hooks/useProtectedRoute';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  useProtectedRoute('notRequired');

  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default Login;
