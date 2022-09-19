import { useState } from 'react';

import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useAuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  // Login function
  const { login } = useAuthContext();

  // Copy right text
  const copyRightText = `${new Date().getFullYear()} ERŠ Velenje. All rights reserved.`;

  // Username & password
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Username & password validation
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  // Username change handler
  const usernameOnChangeHandler = event => {
    setUserName(event.target.value);
  };

  // Password change handler
  const passwordOnChangeHandler = event => {
    setPassword(event.target.value);
  };

  // Login button click handler
  const formOnSubmitHandler = event => {
    event.preventDefault();

    setUsernameInvalid(false);
    setPasswordInvalid(false);

    if (username.trim() === '' || password.trim() === '') {
      setUsernameInvalid(username.trim() === '');
      setPasswordInvalid(password.trim() === '');
      return;
    }

    login(username, password);
  };

  return (
    <Card>
      <CardContent>
        {/* Login info message */}
        <Alert severity="info" sx={{ mb: 4 }}>
          Za vpis uporabite elektronski naslov in geslo, ki ga uporabljate pri
          vpisu v spletno aplikacijo za naročanje malic
        </Alert>

        {/* Username */}
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="username">
            Uporabniško ime / Elektronski naslov
          </InputLabel>
          <Input
            id="username"
            value={username}
            onChange={usernameOnChangeHandler}
            error={usernameInvalid}
          />
        </FormControl>

        {/* Password */}
        <FormControl fullWidth sx={{ m: 1, mb: 5 }} variant="standard">
          <InputLabel htmlFor="password">Geslo</InputLabel>
          <Input
            id="password"
            value={password}
            onChange={passwordOnChangeHandler}
            type="password"
            error={passwordInvalid}
          />
        </FormControl>

        {/* Login actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Login button */}
          <Button variant="contained" onClick={formOnSubmitHandler}>
            Prijavite se
          </Button>

          {/* Forgot password button */}
          <Button
            variant="text"
            component="a"
            href="https://mdm.arnes.si/Prijava/Password.aspx"
            target="_blank"
            size="small"
          >
            Pozabljeno geslo?
          </Button>
        </Stack>

        {/* Copy right text */}
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ textAlign: 'center', mt: 10 }}
        >
          {copyRightText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
