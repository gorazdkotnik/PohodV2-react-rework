import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import Navbar from '../layouts/Navbar';

import { userTypes } from '../../utils/consts';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import QuestionGroups from '../../pages/question_groups/QuestionGroups';
import Leaderboard from '../../pages/Leaderboard';
import Events from '../../pages/events/Events';
import Groups from '../../pages/groups/Groups';
import NoPage from '../../pages/NoPage';
import Profile from '../../pages/Profile';
import Results from '../../pages/Results';
import PointQuestions from '../../pages/PointQuestions';
import Dashboard from '../../pages/dashboard/Dashboard';
import DashboardDetails from '../../pages/dashboard/DashboardDetails';
import { useAuthContext } from '../../context/AuthContext';

function RoutesList() {
  const { user, userLoading, userError } = useAuthContext();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} />
      <Container sx={{ mt: 15, mb: 5 }}>
        <Routes>
          {/* Home Page */}
          {<Route exact path="/" element={<Home />} />}

          {/* Login Page */}
          <Route exact path="/login" element={<Login />} />

          {/* Profile Page */}
          {
            user && <Route exact path="/profile" element={<Profile />} />
          }

          {/* Leaderboard Page */}
          {user?.group && (
            <Route exact path="/results" element={<Results />} />
          )}

          {/* Leaderboard Page */}
          {
            user && <Route exact path="/leaderboard" element={<Leaderboard />} />
          }

          {/* Dashboard */}
          {user?.user_type === userTypes.ADMIN && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}

          {/* Dashboard Details */}
          {user?.user_type === userTypes.ADMIN && (
            <Route path="/dashboard/:id" element={<DashboardDetails />} />
          )}

          {/* Events */}
          {user?.user_type === userTypes.ADMIN && (
            <Route path="/events/*" element={<Events />} />
          )}

          {/* Question groups */}
          {user?.user_type === userTypes.ADMIN && (
            <Route path="/question_groups/*" element={<QuestionGroups />} />
          )}

          {/* Groups */}
          {user?.user_type === userTypes.USER && (
            <Route path="/groups/*" element={<Groups />} />
          )}

          {/* Point Questions */}
          {user?.user_type === userTypes.USER && (
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
