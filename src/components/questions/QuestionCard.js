import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import QuestionTimer from './QuestionTimer';

const QuestionCard = ({
  question,
  answerId,
  questionIndex,
  numberOfQuestions,
  setAnswerId,
  isAnswering,
  timerDuration,
  remainingTime,
  onComplete,
  onUpdate,
  submitQuestion,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ my: 3 }}>
        {question.text}
      </Typography>
      <hr></hr>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <QuestionTimer
          isPlaying={isAnswering}
          duration={timerDuration}
          initialRemainingTime={remainingTime}
          onComplete={onComplete}
          onUpdate={onUpdate}
        />

        <Typography variant="h6" gutterBottom sx={{ my: 3 }}>
          {questionIndex} / {numberOfQuestions}
        </Typography>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        sx={{ my: 5 }}
      >
        {question.answers.map((answer, index) => (
          <Tooltip title="Izberi odgovor" key={answer.id}>
            <Button
              variant={answerId === answer.answer_id ? 'contained' : 'outlined'}
              color="secondary"
              key={answer.answer_id}
              onClick={() => setAnswerId(answer.answer_id)}
            >
              {answer.text}
            </Button>
          </Tooltip>
        ))}
      </Stack>

      <hr></hr>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Tooltip title="Oddaj odgovor">
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitQuestion()}
          >
            Odgovori
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default QuestionCard;
