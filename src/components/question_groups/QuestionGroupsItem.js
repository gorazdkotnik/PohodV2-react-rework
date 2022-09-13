import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import QuestionGroupsForm from './QuestionGroupsForm';

const QuestionGroupsItem = ({
  questionGroup,
  showDetails,
  onReloadQuestionGroups,
  onReloadQuestionGroup,
}) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [showEditForm, setShowEditForm] = useState(false);

  const onDeleteHandler = () => {
    setShowLoadingSpinner(true);
    request(`/question_groups/${questionGroup.question_group_id}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);
        navigate('/question_groups/all');

        onReloadQuestionGroups();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri brisanju',
          text: 'Prišlo je do napake pri brisanju skupine vprašanj. Poskusite znova.',
        });
      });
  };

  return (
    <Card sx={{ width: '100%', my: 2 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="div">
            {questionGroup.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to={`/question_groups/${questionGroup.question_group_id}`}
            >
              Uredi
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDialog({
                  title: 'Brisanje skupine vprašanj',
                  text: 'Ali ste prepričani, da želite izbrisati skupino vprašanj?',
                  onClose: onDeleteHandler,
                });
              }}
            >
              Izbriši
            </Button>

            {showDetails && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowEditForm(prev => !prev)}
              >
                {showEditForm ? 'Skrij' : 'Uredi'}
              </Button>
            )}
          </Stack>

          {showEditForm && (
            <QuestionGroupsForm
              data={questionGroup}
              onReloadQuestionGroup={onReloadQuestionGroup}
              method="PUT"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuestionGroupsItem;
