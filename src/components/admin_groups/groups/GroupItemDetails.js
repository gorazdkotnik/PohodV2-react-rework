import React from 'react';
import { useUIContext } from '../../../context/UIContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupItemDetailsAddMember from './GroupItemDetailsAddMember';

import { request } from '../../../utils/functions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GroupItemDetails = ({
  viewGroup,
  setViewGroup,
  group,
  groupLeader,
  getGroups,
}) => {
  const { setDialog, setShowLoadingSpinner, setNotification } = useUIContext();

  const [addMember, setAddMember] = React.useState(false);

  const kickMemberHandler = ({ user_id, first_name, last_name } = {}) => {
    setShowLoadingSpinner(true);

    request(`/groups/kick/${user_id}`, 'DELETE')
      .then(data => {
        console.log(data);

        setNotification({
          title: `Uporabnik ${first_name} ${last_name} je bil odstranjen iz skupine`,
          type: 'success',
        });

        getGroups();
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
    <Dialog
      fullScreen
      open={viewGroup}
      onClose={() => {
        setViewGroup(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Tooltip title="Zapri predogled vprašanja">
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setViewGroup(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {group.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* sm container */}
      <Container maxWidth="md" sx={{ my: 5 }}>
        {/* button to add member */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Tooltip title="Dodaj neregistriranega uporabnika ali uporabnika ki ni v skupini v to skupino">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAddMember(true);
              }}
            >
              Dodaj člana
            </Button>
          </Tooltip>

          {addMember && (
            <GroupItemDetailsAddMember
              open={addMember}
              handleClose={() => {
                setAddMember(false);
              }}
              group={group}
              getGroups={getGroups}
            />
          )}
        </Stack>

        {group.members.map(member => (
          <Card sx={{ my: 4 }} key={member.user_id}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ p: 1 }}
                backgroundColor="secondary"
              >
                {member.first_name} {member.last_name}
              </Typography>

              {/* group leader */}
              <Typography sx={{ p: 1 }} variant="p" gutterBottom>
                <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                  {member.email}
                </Typography>
                {', '}
                {member.grade}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2 }}
                spacing={2}
              >
                {member.user_id === groupLeader.user_id && (
                  <Button variant="outlined" startIcon={<PhoneIcon />}>
                    {group.contact_phone_number}
                  </Button>
                )}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  {member.user_id !== groupLeader.user_id && (
                    <Tooltip title="Odstrani člana iz skupine">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setDialog({
                            title: 'Odstrani člana',
                            text: `Ali ste prepričani, da želite odstraniti člana "${member.first_name} ${member.last_name}"?`,
                            onClose: kickMemberHandler.bind(null, member),
                          });
                        }}
                      >
                        Odstrani
                      </Button>
                    </Tooltip>
                  )}

                  {member.user_id === groupLeader.user_id && (
                    <Tooltip title="Ta član skupine je vodja">
                      <Button variant="contained">Vodja</Button>
                    </Tooltip>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Dialog>
  );
};

export default GroupItemDetails;
