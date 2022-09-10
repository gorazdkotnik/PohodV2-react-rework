import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <Button
        sx={{ my: 3 }}
        variant="contained"
        onClick={() => setIsAnswering(true)}
      >
        {text}
      </Button>
    </Stack>
  );
};

export default QuestionOverlay;
