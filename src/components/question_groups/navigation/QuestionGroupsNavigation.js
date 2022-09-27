import React from 'react';

import PageMenu from '../../ui/PageMenu';

const QuestionGroupsNavigation = () => {
  const labels = ['Vse skupine vprašanj', 'Nova skupina vprašanj'];
  const links = ['/question_groups/all', '/question_groups/new'];

  return <PageMenu labels={labels} links={links} />;
};

export default QuestionGroupsNavigation;
