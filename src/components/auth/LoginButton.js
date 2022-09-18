import Button from '@mui/material/Button';

const LoginButton = ({ url }) => {
  return (
    <Button variant="contained" component="a" href={url} sx={{ p: 0 }}>
      <img src="/images/login.svg" alt="login" />
    </Button>
  );
};

export default LoginButton;
