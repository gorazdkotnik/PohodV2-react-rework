
import Button from '@mui/material/Button';
const LoginButton = ({url}) => {
    return (
        <Button
            variant="contained"
            component="a"
            href={url}
        >
            <img src='/images/login.png' alt='login' />
        </Button>
    );
};

export default LoginButton;
