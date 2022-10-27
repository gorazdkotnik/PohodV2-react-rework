import * as React from 'react';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const AnswersForm = ({ question, onReloadQuestionGroup, onClose, open }) => {
  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [answer, setAnswer] = React.useState('');
  const [answerInvalid, setAnswerInvalid] = React.useState(false);

  const answerOnChangeHandler = event => {
    setAnswer(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setAnswerInvalid(false);

    if (answer.trim() === '') {
      setAnswerInvalid(true);
      return;
    }

    const newAnswers = [
      ...question.answers,
      {
        text: answer,
        correct: question.answers.find(answer => +answer.correct === 1) ? 0 : 1,
        question_id: question.question_id,
      },
    ];

    setShowLoadingSpinner(true);

    request(`/questions/${question.question_id}`, 'PUT', {
      answers: newAnswers,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        setNotification({
          title: 'Odgovor je bil uspešno dodan',
        });

        onClose();
        onReloadQuestionGroup();
      })

      .catch(e => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri odgovorih',
          text: 'Prišlo je do napake pri dodajanju odgovorov. Poskusite znova.',
        });
      })
      .finally(() => {
        setAnswer('');
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
          sx={{ mt: 1 }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="answer-label">Odgovor</InputLabel>
            <Input
              id="answer"
              value={answer}
              onChange={answerOnChangeHandler}
              error={answerInvalid}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Prekliči</Button>
        <Button onClick={formOnSubmitHandler} autoFocus>
          Shrani
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnswersForm;
