import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const QuestionsForm = ({
  data = {},
  method = 'POST',
  show = true,
  onCloseHandler,
  questionGroupId,
  onReloadQuestionGroup,
}) => {
  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [question, setQuestion] = useState(data.text || '');
  const [questionInvalid, setQuestionInvalid] = useState(false);

  const questionOnChangeHandler = event => {
    setQuestion(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setQuestionInvalid(false);

    if (question.trim() === '') {
      setQuestionInvalid(true);
      return;
    }

    setShowLoadingSpinner(true);

    request(
      `/questions${method === 'PUT' ? `/${data.question_id}` : ''}`,
      method,
      {
        text: question,
        question_group_id: questionGroupId,
        answers: data.answers || [],
      }
    )
      .then(response => {
        setShowLoadingSpinner(false);

        setNotification({
          title:
            method === 'PUT'
              ? 'Vprašanje je bilo uspešno posodobljeno'
              : 'Vprašanje je bilo uspešno dodano',
        });

        onReloadQuestionGroup();
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title:
            method === 'PUT'
              ? 'Napaka pri posodabljanju vprašanja'
              : 'Napaka pri dodajanju vprašanja',
          text:
            method === 'PUT'
              ? 'Prišlo je do napake pri posodabljanju vprašanja. Poskusite znova.'
              : 'Prišlo je do napake pri dodajanju vprašanja. Poskusite znova.',
        });
      })
      .finally(() => {
        setQuestion(method === 'PUT' ? question : '');
        onCloseHandler();
      });
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={onCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {method === 'POST' ? 'Dodaj novo vprašanje' : 'Uredi vprašanje'}
        </DialogTitle>
        <DialogContent sx={{ ml: -1 }}>
          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="name">Besedilo vprašanja</InputLabel>
            <Input
              id="questionText"
              value={question}
              onChange={questionOnChangeHandler}
              error={questionInvalid}
              rows={4}
              multiline
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Zapri okno">
            <Button onClick={onCloseHandler}>Prekliči</Button>
          </Tooltip>

          <Tooltip
            title={
              method === 'POST'
                ? 'Dodaj vprašanje k tej skupini vprašanj s podanimi podatki'
                : 'Uredi vprašanje s podanimi podatki'
            }
          >
            <Button onClick={formOnSubmitHandler}>
              {method === 'POST' ? 'Ustvari' : 'Posodobi'}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionsForm;
