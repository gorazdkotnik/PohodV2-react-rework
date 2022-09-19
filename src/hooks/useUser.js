import { useEffect, useState } from 'react';

import { request } from '../utils/functions';

const useUser = authRequired => {

  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const getUser = async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const data = await request('/me')
      setUserLoading(false);
      console.log("me",data);
      if (data) {
        setUser(data);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      setUserLoading(false);
      setUser(null);
      setUserError(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const refreshUser = async () => {
    await getUser();
  };

  return {
    user,
    userLoading,
    userError,
    loggedIn,
    refreshUser,
  };
};

export default useUser;
