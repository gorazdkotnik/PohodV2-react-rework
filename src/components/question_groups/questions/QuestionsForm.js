import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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

  const [question, setQuestion] = useState(data.question || '');
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
      `/questions${method === 'PUT' ? `/${questionGroupId}` : ''}`,
      method,
      { text: question, question_group_id: questionGroupId, answers: [] }
    )
      .then(response => {
        setShowLoadingSpinner(false);

        setNotification({
          title: 'Uspešno dodano novo vprašanje',
        });

        onReloadQuestionGroup();
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri dodajanju novega vprašanja',
          text: 'Prišlo je do napake pri dodajanju novega vprašanja.',
        });
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
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Prekliči</Button>
          <Button onClick={formOnSubmitHandler}>
            {method === 'POST' ? 'Ustvari' : 'Posodobi'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionsForm;
