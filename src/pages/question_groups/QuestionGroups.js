import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AllQuestionGroups from './AllQuestionGroups';
import NewQuestionGroup from './NewQuestionGroup';
import QuestionGroupDetails from './QuestionGroupDetails';

import QuestionGroupsNavigation from '../../components/question_groups/QuestionGroupsNavigation';

const QuestionGroups = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/question_groups') {
      navigate('/question_groups/all');
    }
  }, [pathname, navigate]);

  return (
    <Card>
      <CardContent>
        <QuestionGroupsNavigation />
        <Routes>
          <Route path="all" element={<AllQuestionGroups />} />
          <Route path="new" element={<NewQuestionGroup />} />
          <Route path=":id" element={<QuestionGroupDetails />} />
        </Routes>
      </CardContent>
    </Card>
  );
};

export default QuestionGroups;
