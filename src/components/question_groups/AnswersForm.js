import * as React from 'react';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const AnswersForm = ({ question, onReloadQuestionGroup, onClose }) => {
  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [answer, setAnswer] = React.useState('');
  const [answerInvalid, setAnswerInvalid] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);

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
        correct: isCorrect ? 1 : 0,
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
      });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
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

        <FormControl fullWidth>
          <InputLabel htmlFor="is-correct-label">Pravilen odgovor</InputLabel>
          <Select
            id="is-correct"
            value={isCorrect}
            label="Pravilen odgovor"
            onChange={event => setIsCorrect(event.target.value)}
          >
            <MenuItem value={true}>Da</MenuItem>
            <MenuItem value={false}>Ne</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Button variant="outlined" onClick={onClose}>
          Prekliči
        </Button>
        <Button variant="contained" onClick={formOnSubmitHandler}>
          Shrani
        </Button>
      </Stack>
    </Box>
  );
};

export default AnswersForm;
