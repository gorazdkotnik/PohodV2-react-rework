import React from 'react';

import Container from '@mui/material/Container';

import useProtectedRoute from '../hooks/useProtectedRoute';
import LoginForm from '../components/auth/LoginForm';
import LoginButton from '../components/auth/LoginButton';
import { BACKEND_URL, FRONTEND_URL } from './../config/env';

const Login = () => {
  useProtectedRoute('notRequired');

  return (
    <Container maxWidth="sm">
      {/* <LoginForm /> */}
      <LoginButton url={`https://login.microsoftonline.com/f6232921-d0d7-4c1a-9eee-0da15213004d/oauth2/v2.0/authorize?
client_id=dbfa2de4-b07a-4dd4-8e6b-509ce7766079
&response_type=code
&redirect_uri=${encodeURI(BACKEND_URL + '/auth/login')}
&response_mode=query
&scope=user.read
&state=${btoa(JSON.stringify({
  redirect: FRONTEND_URL
}))}`} />
    </Container>
  );
};

export default Login;
