import React from 'react';
import ReactDom from 'react-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useUIContext } from '../../context/UIContext';
import { notificationTimeout } from '../../utils/consts';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const { notification, setNotification } = useUIContext();

  return (
    <>
      {notification &&
        ReactDom.createPortal(
          <Snackbar
            open={true}
            autoHideDuration={notificationTimeout}
            onClose={() => {
              setNotification(null);
            }}
          >
            <Alert
              onClose={() => {
                setNotification(null);
              }}
              severity={notification.type}
              sx={{ width: '100%' }}
            >
              {notification.title}
            </Alert>
          </Snackbar>,
          document.getElementById('notification-root')
        )}
    </>
  );
};

export default Notification;
