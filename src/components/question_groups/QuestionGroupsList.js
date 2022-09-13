import React from 'react';

import QuestionGroupsItem from './QuestionGroupsItem';

const QuestionGroupsList = ({ questionGroups }) => {
  return (
    <>
      {questionGroups.map(questionGroup => (
        <QuestionGroupsItem
          key={questionGroup.question_group_id}
          event={questionGroup}
        />
      ))}
    </>
  );
};

export default QuestionGroupsList;
