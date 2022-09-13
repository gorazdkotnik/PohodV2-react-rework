import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import Navbar from '../layouts/Navbar';

import { userTypes } from '../../utils/consts';

import useUser from '../../hooks/useUser';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Results from '../../pages/Results';
import Leaderboard from '../../pages/Leaderboard';
import Dashboard from '../../pages/dashboard/Dashboard';
import DashboardDetails from '../../pages/dashboard/DashboardDetails';
import Events from '../../pages/events/Events';
import QuestionGroups from '../../pages/question_groups/QuestionGroups';
import Groups from '../../pages/groups/Groups';
import PointQuestions from '../../pages/PointQuestions';

import NoPage from '../../pages/NoPage';

function RoutesList() {
  const { user } = useUser();

  const userExists = () => Object.keys(user).length > 0;

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} />
      <Container sx={{ mt: 15, mb: 5 }}>
        <Routes>
          {/* Home Page */}
          {<Route exact path="/" element={<Home user={user} />} user={user} />}

          {/* Login Page */}
          <Route exact path="/login" element={<Login />} />

          {/* Profile Page */}
          {userExists() && (
            <Route exact path="/profile" element={<Profile user={user} />} />
          )}

          {/* Leaderboard Page */}
          {userExists() && user.group && (
            <Route exact path="/results" element={<Results />} />
          )}

          {/* Leaderboard Page */}
          {userExists() && (
            <Route exact path="/leaderboard" element={<Leaderboard />} />
          )}

          {/* Dashboard */}
          {userExists() && user.user_type === userTypes.ADMIN && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}

          {/* Dashboard Details */}
          {userExists() && user.user_type === userTypes.ADMIN && (
            <Route path="/dashboard/:id" element={<DashboardDetails />} />
          )}

          {/* Events */}
          {userExists() && user.user_type === userTypes.ADMIN && (
            <Route path="/events/*" element={<Events />} />
          )}

          {/* Question groups */}
          {userExists() && user.user_type === userTypes.ADMIN && (
            <Route path="/question_groups/*" element={<QuestionGroups />} />
          )}

          {/* Groups */}
          {userExists() && user.user_type === userTypes.USER && (
            <Route path="/groups/*" element={<Groups user={user} />} />
          )}

          {/* Point Questions */}
          {userExists() && user.user_type === userTypes.USER && (
            <Route path="/points/:hash" element={<PointQuestions />} />
          )}

          {/* 404 Page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default RoutesList;
