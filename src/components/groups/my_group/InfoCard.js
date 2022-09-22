import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import MembersList from './MembersList';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';
import { useAuthContext } from '../../../context/AuthContext';

const InfoCard = ({ user }) => {
  const navigate = useNavigate();
  const { refreshUser } = useAuthContext();

  const { setNotification, setShowLoadingSpinner, setDialog } = useUIContext();

  const copyCodeHandler = () => {
    setNotification({
      title: 'Koda skupine je bila kopirana',
      type: 'success',
    });

    const code = user.group.code;
    navigator.clipboard.writeText(code);
  };

  const leaveGroupHandler = () => {
    setShowLoadingSpinner(true);
    request('/groups/leave', 'POST')
      .then(data => {
        setShowLoadingSpinner(false);

        setNotification({
          title: 'Uspešno ste zapustili skupino',
        });

        refreshUser().then(() => {
          navigate('/groups/new');
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri zapuščanju skupine',
          text: 'Prišlo je do napake pri zapuščanju skupine. Poskusite znova.',
        });
      });
  };

  const regenerateCodeHandler = () => {
    setShowLoadingSpinner(true);
    request(`/groups/${user.group.group_id}/code`, 'PUT')
      .then(() => {
        setShowLoadingSpinner(false);

        refreshUser().then(() => {
          navigate('/groups');
        });

        setNotification({
          title: 'Koda skupine je bila posodobljena',
          type: 'success',
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri regeneriranju kode',
          text: 'Prišlo je do napake pri regeneriranju kode. Poskusite znova.',
        });
      });
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          backgroundColor: '#2196f3',
          p: 1,
          color: '#fff',
          textAlign: 'center',
          mt: 2,
        }}
      >
        {user.group.name}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="p" gutterBottom sx={{ textAlign: 'center' }}>
          Koda za vstop v skupino
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {user.group.code}
        </Typography>
        <Button variant="contained" color="success" onClick={copyCodeHandler}>
          Kopiraj kodo
        </Button>
      </Stack>

      <MembersList user={user} />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {user?.user_id === user?.group?.leader_id && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setDialog({
                title: 'Regeneriraj kodo skupine',
                text: 'Ali ste prepričani, da želite regenerirati kodo skupine?',
                onClose: regenerateCodeHandler,
              });
            }}
          >
            Regeneriraj kodo
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setDialog({
              title: 'Zapusti skupino',
              text: 'Ali ste prepričani, da želite zapustiti skupino?',
              onClose: leaveGroupHandler,
            });
          }}
        >
          Zapusti skupino
        </Button>
      </Stack>
    </Stack>
  );
};

export default InfoCard;
