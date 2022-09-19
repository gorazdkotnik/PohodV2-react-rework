import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useAuthContext } from '../../context/AuthContext';
import { useToggleTheme } from '../../context/ThemeContext';

const ProfileSettings = () => {
  // Navigate
  const navigate = useNavigate();

  // Auth context
  const { logout } = useAuthContext();

  // Toggle theme
  const toggleTheme = useToggleTheme();

  // Logout button click handler
  const logoutHandler = () => {
    navigate('/');
    logout();
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      sx={{ my: 5 }}
    >
      {/* Change password */}
      <Button
        variant="text"
        component="a"
        href="https://mdm.arnes.si/Prijava/Login.aspx"
        target="_blank"
        sx={{ alignSelf: 'start' }}
      >
        Spremeni geslo
      </Button>

      {/* Toggle theme */}
      <Button variant="outlined" onClick={toggleTheme}>
        Preklopi med temami
      </Button>

      {/* Logout */}
      <Button variant="contained" onClick={logoutHandler}>
        Izpiši se
      </Button>
    </Stack>
  );
};

export default ProfileSettings;
