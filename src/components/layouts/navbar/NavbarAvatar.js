import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import stringAvatar from '../../auth/profile/functions/stringAvatar';

const NavbarAvatar = ({
  loggedIn,
  handleOpenUserMenu,
  user,
  anchorElUser,
  handleCloseUserMenu,
  profileHandler,
  logoutHandler,
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      {loggedIn && (
        <Tooltip title="Odprite nastavitve profila">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              {...stringAvatar(`${user.first_name} ${user.last_name}`, null)}
            />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={'Moj profil'} onClick={profileHandler}>
          <Typography textAlign="center">Moj profil</Typography>
        </MenuItem>
        <MenuItem key={'Odjava'} onClick={logoutHandler}>
          <Typography textAlign="center">Odjava</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarAvatar;
