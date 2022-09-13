import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import QuestionGroupItem from '../../components/question_groups/QuestionGroupsItem';

const QuestionGroupDetails = () => {
  const { id } = useParams();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [questionGroup, setQuestionGroup] = useState(null);

  const getQuestionGroup = useCallback(() => {
    setShowLoadingSpinner(true);
    request(`/question_groups/${id}`)
      .then(res => {
        setShowLoadingSpinner(false);
        setQuestionGroup(res);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju skupine vprašanj',
          text: 'Prišlo je do napake pri pridobivanju skupine vprašanj. Poskusite znova.',
        });
      });
  }, [id, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    getQuestionGroup();
  }, [getQuestionGroup]);

  const onReloadQuestionGroupHandler = () => {
    getQuestionGroup();
  };

  return (
    <>
      {questionGroup && (
        <QuestionGroupItem
          showDetails={true}
          questionGroup={questionGroup}
          onReloadQuestionGroup={onReloadQuestionGroupHandler}
        />
      )}
    </>
  );
};

export default QuestionGroupDetails;
