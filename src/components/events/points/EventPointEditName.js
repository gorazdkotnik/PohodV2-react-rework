import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const EventPointEditName = ({
  open,
  handleClose,
  pointName,
  pointNameOnChangeHandler,
  pointNameInvalid,
  savePointNameHandler,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {'Spreminjanje imena točke'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ my: 2 }} variant="standard">
          <InputLabel htmlFor="pointName">Ime točke</InputLabel>
          <Input
            id="pointName"
            value={pointName}
            onChange={pointNameOnChangeHandler}
            error={pointNameInvalid}
            autoFocus
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Tooltip title="Prekliči spreminjanje imena točke">
          <Button onClick={handleClose}>Prekliči</Button>
        </Tooltip>

        <Tooltip title="Shrani novo ime točke">
          <Button
            onClick={() => {
              savePointNameHandler();
            }}
            autoFocus
          >
            Spremeni
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default EventPointEditName;
