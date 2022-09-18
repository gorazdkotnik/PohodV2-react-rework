import React from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const AnswersList = ({ answers, question, onReloadQuestionGroup }) => {
  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const onDeleteHandler = answerId => {
    const updatedAnswers = question.answers.filter(
      answer => answer.answer_id !== answerId
    );

    setShowLoadingSpinner(true);

    request(`/questions/${question.question_id}`, 'PUT', {
      answers: updatedAnswers,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        setNotification({
          title: 'Odgovor je bil uspešno izbrisan',
        });

        onReloadQuestionGroup();
      })

      .catch(e => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri brisanju odgovora',
          text: 'Prišlo je do napake pri brisanju odgovora. Poskusite znova.',
        });
      });
  };

  return (
    <>
      {answers && answers.length > 0 && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {answers.map(answer => (
            <Alert
              onClose={() => {
                setDialog({
                  title: 'Brisanje odgovora',
                  text: 'Ali ste prepričani, da želite izbrisati odgovor?',
                  onClose: () => onDeleteHandler(answer.answer_id),
                });
              }}
              severity={+answer.correct === 1 ? 'success' : 'error'}
              key={answer.answer_id}
            >
              {answer.text}
            </Alert>
          ))}
        </Stack>
      )}
      {answers && answers.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          To vprašanje še nima odgovorov
        </Alert>
      )}
    </>
  );
};

export default AnswersList;
