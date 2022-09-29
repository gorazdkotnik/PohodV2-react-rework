import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { BACKEND_URL } from './../../config';

const LoginButton = () => {
  const URL = `https://login.microsoftonline.com/f6232921-d0d7-4c1a-9eee-0da15213004d/oauth2/v2.0/authorize?
  client_id=dbfa2de4-b07a-4dd4-8e6b-509ce7766079
  &response_type=code
  &redirect_uri=${encodeURI(BACKEND_URL + '/auth/login')}
  &response_mode=query
  &scope=user.read
  &state=${btoa(
    JSON.stringify({
      redirect: window.location.href,
    })
  )}`;
  return (
    <Tooltip title="Prijavite se v aplikacijo z Microsoft računom">
      <Button variant="contained" component="a" href={URL} sx={{ p: 0 }}>
        <img src="/images/login.svg" alt="login" />
      </Button>
    </Tooltip>
  );
};

export default LoginButton;
