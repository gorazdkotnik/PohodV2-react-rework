import { useContext, createContext, useEffect, useState } from 'react';
import { request } from '../utils/functions';

import { useUIContext } from './UIContext';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/me')
      .then(data => {
        setShowLoadingSpinner(false);
        if (data) {
          setLoggedIn(true);
          setUser(data);
        } else {
          setLoggedIn(false);
          setUser({});
        }
      })
      .catch(() => {
        setShowLoadingSpinner(false);
        setLoggedIn(false);
        setUser({});
        setDialog({
          title: 'Napaka pri pridobivanju osebnih podatkov',
          text: 'Prišlo je do napake pri pridobivanju osebnih podatkov. Poskusite znova.',
        });
      });
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setShowLoadingSpinner(true);
      request('/auth/login', 'POST', { email, password })
        .then(data => {
          setShowLoadingSpinner(false);
          if (data) {
            setLoggedIn(true);
            setUser(data);
          } else {
            setLoggedIn(false);
            setUser({});
          }
          resolve(data);
        })
        .catch(err => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});

          setDialog({
            title: 'Prijava ni uspela',
            text: 'Uporabniško ime ali geslo je napačno.',
          });
          reject(err);
        });
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setShowLoadingSpinner(true);
      request('/auth/logout', 'POST')
        .then(data => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});
          resolve(data);
        })
        .catch(err => {
          setShowLoadingSpinner(false);

          setLoggedIn(false);
          setUser({});

          setDialog({
            title: 'Napaka pri izpisovanju',
            text: 'Prišlo je do napake pri izpisovanju. Poskusite znova.',
          });
          reject(err);
        });
    });
  };

  const value = {
    loggedIn,
    user,
    login,
    logout,
  };

  return <Provider value={value}>{children}</Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
