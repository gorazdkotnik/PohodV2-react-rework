import { useContext, createContext, useEffect, useState } from 'react';
import { request } from '../utils/functions';

import { useUIContext } from './UIContext';
import useUser from './../hooks/useUser';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const { setDialog } = useUIContext();

  const { user, userLoading, userError, refreshUser, loggedIn } = useUser();

  useEffect(() => {
    if (userError) {
      setDialog({
        title: 'Napaka pri pridobivanju osebnih podatkov',
        text: 'Prišlo je do napake pri pridobivanju osebnih podatkov. Poskusite znova.',
      });
    }
  }, [userError, setDialog]);


  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      request('/auth/login', 'POST', { email, password })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          setDialog({
            title: 'Prijava ni uspela',
            text: 'Uporabniško ime ali geslo je napačno.',
          });
          reject(err);
        })
        .finally(() => {
          refreshUser();
        });
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      request('/auth/logout', 'POST')
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          setDialog({
            title: 'Napaka pri izpisovanju',
            text: 'Prišlo je do napake pri izpisovanju. Poskusite znova.',
          });
          reject(err);
        })
        .finally(() => {
          refreshUser();
        });
    });
  };

  const value = {
    loggedIn,
    user,
    userLoading,
    userError,
    loggedIn,
    refreshUser,
    login,
    logout,
  };
  return <Provider value={value}>{children}</Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
