import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const MembersList = ({ user }) => {
  const navigate = useNavigate();

  const { setNotification, setShowLoadingSpinner, setDialog } = useUIContext();

  const kickMemberHandler = ({ user_id, first_name, last_name } = {}) => {
    setShowLoadingSpinner(true);

    request(`/groups/kick/${user_id}`, 'DELETE')
      .then(data => {
        setNotification({
          title: `Uporabnik ${first_name} ${last_name} je bil odstranjen!`,
          type: 'success',
        });

        navigate('/groups');

        setShowLoadingSpinner(false);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri spreminjanju članov',
          text: 'Prišlo je do napake pri spreminjanju članov. Poskusite znova.',
        });
      });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Člani skupine
      </Typography>
      <Stack direction="column" spacing={2}>
        {user.group.members.map((member, index) => (
          <Card key={index} sx={{ width: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="p" gutterBottom>
                  {member.first_name} {member.last_name}
                </Typography>

                {member.user_id === user.group.leader_id && (
                  <Button variant="contained">Vodja</Button>
                )}

                {member.user_id !== user.group.leader_id &&
                  user.user_id === user.group.leader_id && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={kickMemberHandler.bind(null, member)}
                    >
                      Odstrani
                    </Button>
                  )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default MembersList;
