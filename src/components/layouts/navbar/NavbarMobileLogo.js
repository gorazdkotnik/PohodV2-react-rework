import React from 'react';

import Typography from '@mui/material/Typography';

const NavbarMobileLogo = () => {
  return (
    <Typography
      variant="h5"
      noWrap
      component="a"
      href=""
      sx={{
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      POHOD
    </Typography>
  );
};

export default NavbarMobileLogo;
