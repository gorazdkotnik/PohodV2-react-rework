import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useAuthContext } from '../../context/AuthContext';
import { useToggleTheme } from '../../context/ThemeContext';

const ProfileSettings = () => {
  const navigate = useNavigate();

  const { logout } = useAuthContext();
  const toggleTheme = useToggleTheme();

  console.log(toggleTheme);

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
      <Button
        variant="text"
        component="a"
        href="https://malice.scv.si/students/password/new"
        target="_blank"
        sx={{ alignSelf: 'start' }}
      >
        Spremeni geslo
      </Button>
      <Button variant="outlined" onClick={toggleTheme}>
        Preklopi med temami
      </Button>
      <Button variant="contained" onClick={logoutHandler}>
        Izpiši se
      </Button>
    </Stack>
  );
};

export default ProfileSettings;
