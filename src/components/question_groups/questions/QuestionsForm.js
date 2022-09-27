import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

// a component that renders a form for adding a question to a question group with endpoint /questions

const QuestionsForm = ({
  data = {},
  method = 'POST',
  show = true,
  questionGroupId,
  onReloadQuestionGroup,
  setShowAddQuestionForm,
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
        setShowAddQuestionForm(false);
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
      {show && (
        <div>
          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="name">Besedilo vprašanja</InputLabel>
            <Input
              id="questionText"
              value={question}
              onChange={questionOnChangeHandler}
              error={questionInvalid}
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{ m: 1, mt: 4 }}
            onClick={formOnSubmitHandler}
            color={method === 'PUT' ? 'warning' : 'primary'}
          >
            {method === 'POST' ? 'Ustvari' : 'Posodobi'}
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionsForm;
