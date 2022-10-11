import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const QuestionGroupsForm = ({ data = {}, method = 'POST', show = true }) => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setNotification, setDialog } = useUIContext();

  const [name, setName] = useState(data.name || '');
  const [nameInvalid, setNameInvalid] = useState(false);

  const nameOnChangeHandler = event => {
    setName(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setNameInvalid(false);

    if (name.trim() === '') {
      setNameInvalid(true);
    }

    if (name.trim() === '') {
      return;
    }

    setShowLoadingSpinner(true);
    request(
      `/question_groups${method === 'PUT' ? `/${data.question_group_id}` : ''}`,
      method,
      { name: name.trim() }
    )
      .then(response => {
        setShowLoadingSpinner(false);
        setNotification({
          title: 'Uspešno dodano novo področje vprašanj',
        });
        navigate('/question_groups');
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri dodajanju novega področja vprašanj',
          text: 'Prišlo je do napake pri dodajanju novega področja vprašanj.',
        });
      });
  };

  return (
    <>
      {show && (
        <div>
          <FormControl fullWidth sx={{ m: 1, mt: 2 }} variant="standard">
            <InputLabel htmlFor="name">Ime področja vprašanj</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={nameOnChangeHandler}
              error={nameInvalid}
            />
          </FormControl>

          <Tooltip
            title={
              method === 'POST'
                ? 'Ustavi področje vprašanj s podanimi podatki'
                : 'Posodobi področje vprašanj s podanimi podatki'
            }
          >
            <Button
              variant="contained"
              sx={{ m: 1, mt: 2 }}
              onClick={formOnSubmitHandler}
              color={method === 'PUT' ? 'warning' : 'primary'}
            >
              {method === 'POST' ? 'Ustvari' : 'Posodobi'}
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default QuestionGroupsForm;
