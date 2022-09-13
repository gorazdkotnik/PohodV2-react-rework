import { useState, useEffect } from 'react';

import { useUIContext } from '../../context/UIContext';

import QuestionGroupsList from '../../components/question_groups/QuestionGroupsList';

import { request } from '../../utils/functions';

const AllQuestionGroups = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [questionGroups, setQuestionGroups] = useState([]);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/question_groups')
      .then(response => {
        setShowLoadingSpinner(false);
        setQuestionGroups(response);

        console.log(response);
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodkov',
          text: 'Prišlo je do napake pri pridobivanju dogodkov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return <QuestionGroupsList questionGroups={questionGroups} />;
};

export default AllQuestionGroups;
