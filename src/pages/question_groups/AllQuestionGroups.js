import { useState, useEffect, useCallback } from 'react';

import { useUIContext } from '../../context/UIContext';

import QuestionGroupsList from '../../components/question_groups/QuestionGroupsList';

import { request } from '../../utils/functions';

const AllQuestionGroups = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [questionGroups, setQuestionGroups] = useState([]);

  const fetchQuestionGroups = useCallback(() => {
    setShowLoadingSpinner(true);
    request('/question_groups')
      .then(res => {
        setShowLoadingSpinner(false);
        setQuestionGroups(res);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju skupine vprašanj',
          text: 'Prišlo je do napake pri pridobivanju skupine vprašanj. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    fetchQuestionGroups();
  }, [fetchQuestionGroups]);

  return (
    <QuestionGroupsList
      questionGroups={questionGroups}
      onReloadQuestionGroups={fetchQuestionGroups}
    />
  );
};

export default AllQuestionGroups;
