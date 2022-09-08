import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { userTypes } from '../../../utils/consts';

const MobileMenu = ({ anchorElNav, handleCloseNavMenu, loggedIn, user }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {loggedIn && (
        <MenuItem
          key={'Domov'}
          onClick={handleCloseNavMenu}
          component={Link}
          to="/"
        >
          <Typography textAlign="center">Domov</Typography>
        </MenuItem>
      )}
      {loggedIn &&
        user.user_type === userTypes.ADMIN &&
        Object.keys(user).length > 0 && (
          <MenuItem
            key={'Nadzorna plošča'}
            onClick={handleCloseNavMenu}
            component={Link}
            to="/dashboard"
          >
            <Typography textAlign="center">Nadzorna plošča</Typography>
          </MenuItem>
        )}
      {loggedIn &&
        user.user_type === userTypes.ADMIN &&
        Object.keys(user).length > 0 && (
          <MenuItem
            key={'Dogodki'}
            onClick={handleCloseNavMenu}
            component={Link}
            to="/events"
          >
            <Typography textAlign="center">Dogodki</Typography>
          </MenuItem>
        )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 && (
          <MenuItem
            key={'Skupine'}
            onClick={handleCloseNavMenu}
            component={Link}
            to="/groups"
          >
            <Typography textAlign="center">Skupine</Typography>
          </MenuItem>
        )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 &&
        user.group &&
        user.group && (
          <MenuItem
            key={'Moji odgovori'}
            onClick={handleCloseNavMenu}
            component={Link}
            to="/results"
          >
            <Typography textAlign="center">Moji odgovori</Typography>
          </MenuItem>
        )}
      {loggedIn && (
        <MenuItem
          key={'Rezultati'}
          onClick={handleCloseNavMenu}
          component={Link}
          to="/leaderboard"
        >
          <Typography textAlign="center">Rezultati</Typography>
        </MenuItem>
      )}
      {!loggedIn && (
        <MenuItem
          key={'Prijavi se'}
          onClick={handleCloseNavMenu}
          component={Link}
          to="/login"
        >
          <Typography textAlign="center">Prijavi se</Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default MobileMenu;
