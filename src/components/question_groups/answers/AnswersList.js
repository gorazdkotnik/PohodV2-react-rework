import React from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';

import AnswerItem from './AnswersItem';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

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

  const onCorrectAnswerChangeHandler = event => {
    const updatedAnswers = question.answers.map(answer => {
      if (+answer.answer_id === +event.target.value) {
        return {
          ...answer,
          correct: 1,
        };
      } else {
        return {
          ...answer,
          correct: 0,
        };
      }
    });

    setShowLoadingSpinner(true);

    request(`/questions/${question.question_id}`, 'PUT', {
      answers: updatedAnswers,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        setNotification({
          title: 'Pravilen odgovor je bil uspešno spremenjen',
        });

        onReloadQuestionGroup();
      })

      .catch(e => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri spremembi pravilnega odgovora',
          text: 'Prišlo je do napake pri spremembi pravilnega odgovora. Poskusite znova.',
        });
      });
  };

  return (
    <>
      {answers && answers.length > 0 && (
        <RadioGroup
          aria-label="answers"
          name="answers"
          value={question.correct_answer_id}
          onChange={onCorrectAnswerChangeHandler}
        >
          <Stack spacing={2} sx={{ mt: 2 }}>
            {answers.map(answer => (
              <AnswerItem
                key={answer.answer_id}
                answer={answer}
                onDeleteHandler={onDeleteHandler}
              />
            ))}
          </Stack>
        </RadioGroup>
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
