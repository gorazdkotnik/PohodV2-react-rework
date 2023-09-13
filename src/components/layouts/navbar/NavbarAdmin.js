import React from 'react';
import { useNavigate } from 'react-router';

import { userTypes } from '../../../utils/consts';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const NavbarAdmin = ({ user, loggedIn }) => {
  const navigate = useNavigate();

  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const handleOpenSettingsMenu = event => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
      {loggedIn && user.user_type === userTypes.ADMIN && (
        <Tooltip title="Odprite možnosti nadzorne plošče administratorja">
          <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
            <AdminPanelSettingsIcon
              sx={{ fontSize: '2.5rem', color: '#fff' }}
            />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElSettings}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElSettings)}
        onClose={handleCloseSettingsMenu}
      >
        {/* <MenuItem
          key={'Nadzorna plošča'}
          onClick={() => {
            navigate('/dashboard');
            handleCloseSettingsMenu();
          }}
        >
          <Typography textAlign="center">Nadzorna plošča</Typography>
        </MenuItem> */}
        <MenuItem
          key={'Urejevalnik dogodkov'}
          onClick={() => {
            navigate('/events');
            handleCloseSettingsMenu();
          }}
        >
          <Typography textAlign="center">Urejevalnik dogodkov</Typography>
        </MenuItem>
        <MenuItem
          key={'Skupine in razredi'}
          onClick={() => {
            navigate('/admin-groups');
            handleCloseSettingsMenu();
          }}
        >
          <Typography textAlign="center">Skupine in razredi</Typography>
        </MenuItem>
        <MenuItem
          key={'Področja vprašanj'}
          onClick={() => {
            navigate('/question_groups');
            handleCloseSettingsMenu();
          }}
        >
          <Typography textAlign="center">Področja vprašanj</Typography>
        </MenuItem>
        <MenuItem
          key={'Neregistrirani uporabniki'}
          onClick={() => {
            navigate('/unregistered_users');
            handleCloseSettingsMenu();
          }}
        >
          <Typography textAlign="center">Neregistrirani uporabniki</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarAdmin;
