import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import MobileMenu from './navbar/MobileMenu';
import DesktopMenu from './navbar/DesktopMenu';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarMobileLogo from './navbar/NavbarMobileLogo';
import NavbarAvatar from './navbar/NavbarAvatar';
import NavbarAdmin from './navbar/NavbarAdmin';

import { useAuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { logout, loggedIn, user } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [point, setPoint] = React.useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const profileHandler = () => {
    navigate('/profile');
    handleCloseUserMenu();
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
    navigate('/');
    logout();
  };

  React.useEffect(() => {
    setPoint(localStorage.getItem('point'));
  }, [pathname]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarLogo />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <MobileMenu
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              loggedIn={loggedIn}
              user={user}
              pointHash={point}
            />
          </Box>

          <NavbarMobileLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <DesktopMenu
              loggedIn={loggedIn}
              user={user}
              handleCloseNavMenu={handleCloseNavMenu}
              pointHash={point}
            />
          </Box>

          <Stack
            direction="row"
            spacing={4}
            justifyContent="flex-end"
            alignItems="center"
          >
            <NavbarAdmin loggedIn={loggedIn} user={user} />

            <NavbarAvatar
              loggedIn={loggedIn}
              user={user}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              profileHandler={profileHandler}
              logoutHandler={logoutHandler}
              anchorElUser={anchorElUser}
            />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
