import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';

const useProtectedRoute = authRequired => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthContext();

  useEffect(() => {
    switch (authRequired) {
      case 'required':
        if (!loggedIn) {
          navigate('/login');
        }
        break;
      case 'notRequired':
        if (loggedIn) {
          navigate('/');
        }
        break;
      default:
        break;
    }
  }, [authRequired, loggedIn, navigate]);

  return loggedIn;
};

export default useProtectedRoute;
