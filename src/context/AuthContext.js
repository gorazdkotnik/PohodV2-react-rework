import { useContext, createContext, useEffect, useState } from 'react';
import { request } from '../utils/functions';

import { useUIContext } from './UIContext';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const { setDialog } = useUIContext();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setUserLoading(true);
    request('/me')
      .then(data => {
        setUserLoading(false);
        if (data) {
          setLoggedIn(true);
          setUser(data);
        } else {
          setLoggedIn(false);
          setUser({});
        }
      })
      .catch(() => {
        setUserLoading(false);
        setLoggedIn(false);
        setUser({});
        setDialog({
          title: 'Napaka pri pridobivanju osebnih podatkov',
          text: 'Prišlo je do napake pri pridobivanju osebnih podatkov. Poskusite znova.',
        });
      });
  }, [setDialog]);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setUserLoading(true);
      request('/auth/login', 'POST', { email, password })
        .then(data => {
          setUserLoading(false);
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
          setUserLoading(false);

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
      request('/auth/logout', 'POST')
        .then(data => {
          setLoggedIn(false);
          setUser({});
          resolve(data);
        })
        .catch(err => {
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
  console.log('ul', userLoading);
  return userLoading ? null : <Provider value={value}>{children}</Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
