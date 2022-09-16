import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import Navbar from '../layouts/Navbar';

import { userTypes } from '../../utils/consts';

import useUser from '../../hooks/useUser';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import QuestionGroups from '../../pages/question_groups/QuestionGroups';

const Leaderboard = React.lazy(() => import('../../pages/Leaderboard'));
const Events = React.lazy(() => import('../../pages/events/Events'));
const Groups = React.lazy(() => import('../../pages/groups/Groups'));
const NoPage = React.lazy(() => import('../../pages/NoPage'));
const Profile = React.lazy(() => import('../../pages/Profile'));
const Results = React.lazy(() => import('../../pages/Results'));
const PointQuestions = React.lazy(() => import('../../pages/PointQuestions'));
const Dashboard = React.lazy(() => import('../../pages/dashboard/Dashboard'));
const DashboardDetails = React.lazy(() =>
  import('../../pages/dashboard/DashboardDetails')
);

function RoutesList() {
  const { user } = useUser();

  const userExists = () => Object.keys(user).length > 0;

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        {/* Navbar */}
        <Navbar user={user} />
        <Container sx={{ mt: 15, mb: 5 }}>
          <Routes>
            {/* Home Page */}
            {
              <Route
                exact
                path="/"
                element={<Home user={user} />}
                user={user}
              />
            }

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
      </React.Suspense>
    </>
  );
}

export default RoutesList;
