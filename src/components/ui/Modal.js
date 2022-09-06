import React from 'react';
import ReactDom from 'react-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useUIContext } from '../../context/UIContext';

const Modal = () => {
  const { setDialog, dialog } = useUIContext();

  return (
    <>
      {dialog &&
        ReactDom.createPortal(
          <Dialog
            open={true}
            onClose={() => {
              setDialog(null);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialog.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setDialog(null);
                }}
                autoFocus
              >
                Vredu
              </Button>
            </DialogActions>
          </Dialog>,
          document.getElementById('modal-root')
        )}
    </>
  );
};

export default Modal;
