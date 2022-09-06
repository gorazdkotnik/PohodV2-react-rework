import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

const Home = () => {
  useProtectedRoute('required');

  return <div>Home</div>;
};

export default Home;
