import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { useAuthContext } from '../../context/AuthContext';

const JoinGroupForm = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuthContext();

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
    request(`/joingroup/${groupCode}`, 'PUT')
      .then(() => {
        setShowLoadingSpinner(false);
        refreshUser().then(() => {
          navigate('/groups/my_group', { replace: true });
        });
      })
      .catch(error => {
        setShowLoadingSpinner(false);

        console.log('join err', error);

        if (error?.response?.data === 'GROUP_FULL') {
          setDialog({
            title: 'Skupina je polna',
            text: 'V tej skupini ni več prostih mest.',
          });
          return;
        }

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

      <Tooltip title="Pridruži se skupini s podano kodo">
        <Button
          variant="contained"
          sx={{ m: 1, mt: 4 }}
          onClick={formOnSubmitHandler}
        >
          Pridruži se skupini
        </Button>
      </Tooltip>
    </>
  );
};

export default JoinGroupForm;
