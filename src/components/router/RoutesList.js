import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import Navbar from '../layouts/Navbar';

import { userTypes } from '../../utils/consts';

import useUser from '../../hooks/useUser';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NoPage from '../../pages/NoPage';

function RoutesList() {
  const { user } = useUser();

  const userExists = () => Object.keys(user).length > 0;

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} />
      <Container sx={{ mt: 15 }}>
        <Routes>
          {/* Home Page */}
          {<Route exact path="/" element={<Home user={user} />} />}

          {/* Login Page */}
          <Route exact path="/login" element={<Login />} />

          {/* 404 Page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default RoutesList;
