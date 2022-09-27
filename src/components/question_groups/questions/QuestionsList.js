import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import QuestionsItem from './QuestionsItem';

const QuestionsList = ({ questions, onReloadQuestionGroup }) => {
  return (
    <Stack spacing={2}>
      {questions &&
        questions.length > 0 &&
        questions.map(question => (
          <QuestionsItem
            key={question.question_id}
            question={question}
            onReloadQuestionGroup={onReloadQuestionGroup}
          />
        ))}
      {questions && questions.length === 0 && (
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mt: 2, fontWeight: 'light' }}
        >
          Ni vprašanj za prikaz!
        </Typography>
      )}
    </Stack>
  );
};

export default QuestionsList;
