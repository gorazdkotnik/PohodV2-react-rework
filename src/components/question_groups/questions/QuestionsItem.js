import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AnswersForm from '../answers/AnswersForm';
import AnswersList from '../answers/AnswersList';
import QuestionsForm from './QuestionsForm';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const QuestionsItem = ({ question, onReloadQuestionGroup, questionGroup }) => {
  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const [showAddAnswerForm, setShowAddAnswerForm] = React.useState(false);
  const [showEditQuestionForm, setShowEditQuestionForm] = React.useState(false);

  const onDeleteHandler = questionId => {
    setShowLoadingSpinner(true);
    request(`/questions/${questionId}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);

        setNotification({
          title: 'Vprašanje je bilo uspešno izbrisano',
        });

        onReloadQuestionGroup();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri brisanju',
          text: 'Prišlo je do napake pri brisanju vprašanja. Poskusite znova.',
        });
      });
  };

  return (
    <>
      <Card sx={{ width: '100%', my: 2 }}>
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="start"
            spacing={2}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="body" component="div">
                {question.text}
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Tooltip title="Uredi vprašanje">
                  <IconButton
                    onClick={() => {
                      setShowEditQuestionForm(true);
                    }}
                  >
                    <EditIcon color="warning" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Izbriši vprašanje">
                  <IconButton
                    onClick={() => {
                      setDialog({
                        title: 'Brisanje vprašanja',
                        text: 'Ali ste prepričani, da želite izbrisati to vprašanje?',
                        onClose: () => {
                          onDeleteHandler(question.question_id);
                        },
                      });
                    }}
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Tooltip title="Dodaj odgovor k temu vprašanju">
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowAddAnswerForm(true);
                  }}
                >
                  Dodaj odgovor
                </Button>
              </Tooltip>
            </Stack>
          </Stack>

          {showAddAnswerForm && (
            <AnswersForm
              question={question}
              onReloadQuestionGroup={onReloadQuestionGroup}
              onClose={() => setShowAddAnswerForm(false)}
            />
          )}

          <AnswersList
            answers={question.answers}
            question={question}
            onReloadQuestionGroup={onReloadQuestionGroup}
          />
        </CardContent>
      </Card>

      <QuestionsForm
        questionGroupId={questionGroup.question_group_id}
        onReloadQuestionGroup={onReloadQuestionGroup}
        show={showEditQuestionForm}
        onCloseHandler={() => setShowEditQuestionForm(false)}
        data={question}
        method="PUT"
      />
    </>
  );
};

export default QuestionsItem;
