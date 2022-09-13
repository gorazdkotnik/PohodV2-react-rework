import React from 'react';

import QuestionGroupsItem from './QuestionGroupsItem';

const QuestionGroupsList = ({ questionGroups, onReloadQuestionGroups }) => {
  return (
    <>
      {questionGroups.map(questionGroup => (
        <QuestionGroupsItem
          key={questionGroup.question_group_id}
          questionGroup={questionGroup}
          onReloadQuestionGroups={onReloadQuestionGroups}
        />
      ))}
    </>
  );
};

export default QuestionGroupsList;
