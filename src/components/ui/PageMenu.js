import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const PageMenu = ({ labels, links }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(
    links.indexOf(pathname) !== -1 ? pathname : links[0]
  );

  React.useEffect(() => {
    if (links.indexOf(pathname) === -1) {
      navigate(links[0]);
    }
  }, [pathname, links, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {labels.map((label, index) => (
            <Tab
              label={label}
              value={links[index]}
              key={links[index]}
              component={Link}
              to={links[index]}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default PageMenu;
