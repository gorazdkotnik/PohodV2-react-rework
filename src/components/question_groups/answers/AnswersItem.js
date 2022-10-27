import React from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { useUIContext } from '../../../context/UIContext';

const AnswersItem = ({ answer, onDeleteHandler }) => {
  const { setDialog } = useUIContext();

  return (
    <Stack direction="row">
      <FormControlLabel
        value={answer.answer_id}
        control={<Radio color="success" checked={+answer.correct === 1} />}
      />
      <Alert
        onClose={() => {
          setDialog({
            title: 'Brisanje odgovora',
            text: 'Ali ste prepričani, da želite izbrisati odgovor?',
            onClose: () => onDeleteHandler(answer.answer_id),
          });
        }}
        severity={+answer.correct === 1 ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {answer.text}
      </Alert>
    </Stack>
  );
};

export default AnswersItem;
