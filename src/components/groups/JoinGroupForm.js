import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const JoinGroupForm = () => {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [groupCode, setGroupCode] = useState('');
  const [groupCodeInvalid, setGroupCodeInvalid] = useState(false);

  const groupCodeOnChangeHandler = event => {
    setGroupCode(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setGroupCodeInvalid(false);

    if (groupCode.trim() === '') {
      setGroupCodeInvalid(true);
      return;
    }

    setShowLoadingSpinner(true);
    request(`/groups/${groupCode}`, 'PUT')
      .then(() => {
        setShowLoadingSpinner(false);
        navigate('/groups/my_group', { replace: true });
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridruževanju',
          text: 'Prišlo je do napake pri pridruževanju. Prosimo preverite, če ste vnesli pravilno kodo skupine.',
        });
      });
  };

  return (
    <>
      <FormControl fullWidth sx={{ m: 1, mt: 4 }} variant="standard">
        <InputLabel htmlFor="code">Koda skupine</InputLabel>
        <Input
          id="code"
          value={groupCode}
          onChange={groupCodeOnChangeHandler}
          error={groupCodeInvalid}
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{ m: 1, mt: 4 }}
        onClick={formOnSubmitHandler}
      >
        Pridruži se skupini
      </Button>
    </>
  );
};

export default JoinGroupForm;
