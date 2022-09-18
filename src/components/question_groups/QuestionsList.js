import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const QuestionsList = ({ questions, onReloadQuestionGroup }) => {
  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const onDeleteHandler = questionId => {
    setShowLoadingSpinner(true);
    request(`/questions/${questionId}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);

        setNotification({
          title: 'Vprašanje je bilo uspešno izbrisano',
        });

        onReloadQuestionGroup();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri brisanju',
          text: 'Prišlo je do napake pri brisanju vprašanja. Poskusite znova.',
        });
      });
  };

  return (
    <Stack spacing={2}>
      {questions.map(question => (
        <Card key={question.question_id} sx={{ width: '100%', my: 2 }}>
          <CardContent>
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="div">
                {question.text}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDeleteHandler(question.question_id)}
                >
                  Izbriši
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default QuestionsList;
