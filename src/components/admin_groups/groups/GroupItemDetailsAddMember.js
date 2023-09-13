import { useState, useEffect, useCallback } from 'react';
import { useUIContext } from '../../../context/UIContext';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { request } from '../../../utils/functions';

const GroupItemDetailsAddMember = ({ open, handleClose, group, getGroups }) => {
  const { setShowLoadingSpinner, setDialog, setNotification } = useUIContext();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = event => {
    setSelectedUser(event.target.value);
  };

  const getUsers = useCallback(() => {
    setShowLoadingSpinner(true);
    request('/unregistered_users')
      .then(data => {
        const newData = data.map((user, index) => {
          return {
            user_id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            grade: user.grade,
            unregister: true,
          };
        });

        setUsers(newData);
        setSelectedUser(newData[0]);

        return request('/users_with_no_group');
      })
      .then(data => {
        setShowLoadingSpinner(false);
        const newData = data.map((user, index) => {
          return {
            user_id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            grade: user.grade,
            unregister: false,
          };
        });

        setUsers(prevState => [...newData, ...prevState]);
        setSelectedUser(prevState => newData[0] || prevState);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju uporabnikov za dodajanje v skupino',
          text: 'Prišlo je do napake pri pridobivanju uporabnikov za dodajanje v skupino. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  const handleAddMember = () => {
    setShowLoadingSpinner(true);

    if (selectedUser.unregister) {
      request(`/fake_user`, 'POST', {
        email: selectedUser.email,
        first_name: selectedUser.firstName,
        last_name: selectedUser.lastName,
        className: selectedUser.grade,
      })
        .then(data => {
          return request('/move_user_to_group', 'POST', {
            user_id: data.user_id,
            group_id: group.group_id,
          });
        })
        .then(data => {
          setShowLoadingSpinner(false);
          setNotification({
            title: `Uporabnik ${selectedUser.firstName} ${selectedUser.lastName} je bil dodan v skupino`,
            type: 'success',
          });

          getGroups();
          getUsers();
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri dodajanju uporabnika v skupino',
            text: 'Prišlo je do napake pri dodajanju uporabnika v skupino. Poskusite znova.',
          });
        });
    } else {
      request('/move_user_to_group', 'POST', {
        user_id: selectedUser.user_id,
        group_id: group.group_id,
      })
        .then(data => {
          setShowLoadingSpinner(false);
          setNotification({
            title: `Uporabnik ${selectedUser.firstName} ${selectedUser.lastName} je bil dodan v skupino`,
            type: 'success',
          });

          getGroups();
          getUsers();
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri dodajanju uporabnika v skupino',
            text: 'Prišlo je do napake pri dodajanju uporabnika v skupino. Poskusite znova.',
          });
        });
    }
  };

  useEffect(() => {
    if (open) {
      getUsers();
    }
  }, [open, getUsers]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Dodaj člana v to skupino</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {users.length > 0 && selectedUser && (
            <FormControl sx={{ m: 1, minWidth: '100%' }}>
              <InputLabel id="demo-dialog-select-label">
                Izberi uporabnika
              </InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedUser}
                onChange={handleChange}
                input={<OutlinedInput label="Izberi uporabnika" />}
              >
                {users.map(user => (
                  <MenuItem value={user} key={user.email}>
                    {user.firstName} {user.lastName}, {user.email}, {user.grade}{' '}
                    ({user.unregister ? 'neregistriran' : 'registriran'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {users.length === 0 && (
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{ mt: 2, fontWeight: 'light' }}
            >
              Ni uporabnikov za prikaz!
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Prekliči</Button>
        <Button
          onClick={() => {
            handleAddMember();
            handleClose();
          }}
        >
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupItemDetailsAddMember;
