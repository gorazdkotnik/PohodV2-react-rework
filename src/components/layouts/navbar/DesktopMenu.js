import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import { userTypes } from '../../../utils/consts';

const DesktopMenu = ({ loggedIn, handleCloseNavMenu, user, pointHash }) => {
  return (
    <>
      {loggedIn && (
        <Button
          key={'Domov'}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          component={Link}
          to="/"
        >
          Domov
        </Button>
      )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 && (
          <Button
            key={'Skupine'}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link}
            to="/groups"
          >
            Skupine
          </Button>
        )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 &&
        user.group &&
        user.group && (
          <Button
            key={'Moji odgovori'}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link}
            to="/results"
          >
            Moji odgovori
          </Button>
        )}
      {loggedIn && (
        <Button
          key={'Rezultati'}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          component={Link}
          to="/leaderboard"
        >
          Rezultati
        </Button>
      )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 &&
        user.group &&
        user.group &&
        pointHash && (
          <Button
            key={`Vprašanja točke`}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: 'white',
              display: 'block',
              fontWeight: 'boldd',
            }}
            component={Link}
            to={`/points/${pointHash}`}
            size="large"
          >
            Vprašanja točke
          </Button>
        )}
      {!loggedIn && (
        <Button
          key={'Prijavi se'}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          component={Link}
          to="/login"
        >
          Prijavi se
        </Button>
      )}
    </>
  );
};

export default DesktopMenu;
