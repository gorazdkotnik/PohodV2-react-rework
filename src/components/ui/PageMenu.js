import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const PageMenu = ({ labels, links }) => {
  const { pathname } = useLocation();

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      {links.map((link, index) => (
        <Button
          key={index}
          component={Link}
          to={link}
          variant={pathname === link ? 'contained' : 'outlined'}
        >
          {labels[index]}
        </Button>
      ))}
    </Stack>
  );
};

export default PageMenu;
