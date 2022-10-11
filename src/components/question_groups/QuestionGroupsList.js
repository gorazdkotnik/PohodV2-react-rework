import React from 'react';

import Typography from '@mui/material/Typography';

import QuestionGroupsItem from './QuestionGroupsItem';

const QuestionGroupsList = ({ questionGroups, onReloadQuestionGroups }) => {
  return (
    <>
      {questionGroups &&
        questionGroups.length > 0 &&
        questionGroups.map(questionGroup => (
          <QuestionGroupsItem
            key={questionGroup.question_group_id}
            questionGroup={questionGroup}
            onReloadQuestionGroups={onReloadQuestionGroups}
          />
        ))}
      {questionGroups && questionGroups.length === 0 && (
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mt: 2, fontWeight: 'light' }}
        >
          Ni področji vprašanj za prikaz!
        </Typography>
      )}
    </>
  );
};

export default QuestionGroupsList;
