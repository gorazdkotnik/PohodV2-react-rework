import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import AnswersForm from './AnswersForm';
import AnswersList from './AnswersList';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const QuestionsItem = ({ question, onReloadQuestionGroup }) => {
  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const [showAddAnswerForm, setShowAddAnswerForm] = React.useState(false);

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
    <>
      <Card sx={{ width: '100%', my: 2 }}>
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="start"
            spacing={2}
          >
            <Typography variant="body" component="div">
              {question.text}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  setShowAddAnswerForm(true);
                }}
              >
                Dodaj odgovor
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDialog({
                    title: 'Brisanje vprašanja',
                    text: 'Ali ste prepričani, da želite izbrisati to vprašanje?',
                    onClose: () => {
                      onDeleteHandler(question.question_id);
                    },
                  });
                }}
              >
                Izbriši
              </Button>
            </Stack>
          </Stack>

          {showAddAnswerForm && (
            <AnswersForm
              question={question}
              onReloadQuestionGroup={onReloadQuestionGroup}
              onClose={() => setShowAddAnswerForm(false)}
            />
          )}

          <AnswersList
            answers={question.answers}
            question={question}
            onReloadQuestionGroup={onReloadQuestionGroup}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionsItem;
