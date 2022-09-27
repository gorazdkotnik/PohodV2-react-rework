import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import QuestionGroupsTabs from './QuestionGroupsTabs';

const QuestionGroupsItem = ({
  questionGroup,
  showDetails,
  onReloadQuestionGroups,
  onReloadQuestionGroup,
}) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const onDeleteHandler = () => {
    setShowLoadingSpinner(true);
    request(`/question_groups/${questionGroup.question_group_id}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);
        navigate('/question_groups/all');

        setNotification({
          title: 'Skupina vprašanj je bila uspešno izbrisana',
        });

        onReloadQuestionGroups && onReloadQuestionGroups();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        console.log(err);
        setDialog({
          title: 'Napaka pri brisanju',
          text: 'Prišlo je do napake pri brisanju skupine vprašanj. Poskusite znova.',
        });
      });
  };

  return (
    <Card
      sx={{
        width: '100%',
        my: 2,
        boxShadow: showDetails ? 'none !important' : '',
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h5" component="div">
            {questionGroup.name}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            {!showDetails && (
              <Button
                variant="outlined"
                component={NavLink}
                to={`/question_groups/${questionGroup.question_group_id}`}
              >
                Oglej si skupino vprašanj
              </Button>
            )}

            {!showDetails && (
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
            )}
          </Stack>
        </Stack>

        {showDetails && (
          <QuestionGroupsTabs
            questionGroup={questionGroup}
            onReloadQuestionGroup={onReloadQuestionGroup}
            onDeleteHandler={onDeleteHandler}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionGroupsItem;
