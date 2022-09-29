import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const QuestionOverlay = ({ setIsAnswering, title, text }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ p: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Tooltip title={`Izvedi "${text}"`}>
        <Button
          sx={{ my: 3 }}
          variant="contained"
          onClick={() => setIsAnswering(true)}
        >
          {text}
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default QuestionOverlay;
