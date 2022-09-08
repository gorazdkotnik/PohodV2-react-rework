import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { dashboard } from '../../utils/consts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ':hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2D3748' : '#f5f5f5',
  },
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
}));

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {dashboard.tables.map(table => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={table.to}
                onClick={() => navigate(table.to)}
              >
                <Item>{table.name}</Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
