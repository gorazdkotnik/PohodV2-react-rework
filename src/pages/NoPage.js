import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import LoginButton from '../components/auth/LoginButton';

import { useAuthContext } from '../context/AuthContext';

const NoPage = () => {
  const { loggedIn } = useAuthContext();

  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Stack direction="column" justifyContent="center" sx={{ height: '60vh' }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              404
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Stran, ki jo trenutno iščete ni na voljo.
            </Typography>

            {!loggedIn && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 4, mb: 1 }}
              >
                Mogoče se morate prijaviti?
              </Typography>
            )}

            {!loggedIn && <LoginButton />}
          </CardContent>
          <CardActions>
            <Tooltip title="Nazaj na domačo stran">
              <Button size="small" component={Link} to="/">
                Pojdite nazaj
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
};

export default NoPage;

// import React from 'react';
// import { NavLink } from 'react-router-dom';

// import { useGlobalContext } from '../context/GlobalContext';

// import Card from '../components/UI/Card';

// function NoPage() {
//   const { loggedIn } = useGlobalContext();

//   return (
//     <div className="small-container mt-10">
//       <Card>
//         <div className="flex flex-col justify-center items-center">
//           <h1 className="text-center text-4xl font-bold my-5">404</h1>
//           <p className="text-xl text-center mb-5">
//             Stran, ki jo trenutno iščete ni na voljo.
//           </p>
//           <NavLink to={loggedIn ? '/' : '/login'} className="button">
//             Pojdite nazaj
//           </NavLink>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default NoPage;
