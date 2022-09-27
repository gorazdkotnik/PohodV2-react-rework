import React from 'react';

import Stack from '@mui/material/Stack';

import QuestionsItem from './QuestionsItem';

const QuestionsList = ({ questions, onReloadQuestionGroup }) => {
  return (
    <Stack spacing={2}>
      {questions.map(question => (
        <QuestionsItem
          key={question.question_id}
          question={question}
          onReloadQuestionGroup={onReloadQuestionGroup}
        />
      ))}
    </Stack>
  );
};

export default QuestionsList;
