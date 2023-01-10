import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const GradesItem = ({ grade }) => {
  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ backgroundColor: '#2196f3', p: 1, color: '#fff' }}
        >
          {grade.name}
        </Typography>

        <Tooltip title="Oglejte si podrobnosti razreda">
          <Button
            variant="outlined"
            component={NavLink}
            to={`/grades/${grade.event_id}`}
          >
            Oglej si razred
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default GradesItem;
