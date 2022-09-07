import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { userTypes } from '../utils/consts';

import UserHome from '../components/home/UserHome';
import TeacherHome from '../components/home/TeacherHome';
import AdminHome from '../components/home/AdminHome';

const Home = ({ user }) => {
  useProtectedRoute('required');

  return (
    <>
      {user.user_type === userTypes.ADMIN && <AdminHome />}
      {user.user_type === userTypes.TEACHER && <TeacherHome />}
      {user.user_type === userTypes.USER && <UserHome user={user} />}
    </>
  );
};

export default Home;
