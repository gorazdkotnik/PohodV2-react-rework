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
  const { login } = useAuthContext();

  const copyRightText = `${new Date().getFullYear()} ERŠ Velenje. All rights reserved.`;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const usernameOnChangeHandler = event => {
    setUserName(event.target.value);
  };

  const passwordOnChangeHandler = event => {
    setPassword(event.target.value);
  };

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
        <Alert severity="info" sx={{ mb: 4 }}>
          Za vpis uporabite elektronski naslov in geslo, ki ga uporabljate pri
          vpisu v spletno aplikacijo za naročanje malic
        </Alert>
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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button variant="contained" onClick={formOnSubmitHandler}>
            Prijavite se
          </Button>
          <Button
            variant="text"
            component="a"
            href="https://malice.scv.si/students/password/new"
            target="_blank"
            size="small"
          >
            Pozabljeno geslo?
          </Button>
        </Stack>
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
