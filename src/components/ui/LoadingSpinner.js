import React from 'react';
import ReactDom from 'react-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useUIContext } from '../../context/UIContext';

const LoadingSpinner = () => {
  const { showLoadingSpinner } = useUIContext();

  return (
    <>
      {showLoadingSpinner &&
        ReactDom.createPortal(
          <Backdrop open={true}>
            <CircularProgress color="primary" size={80} />
          </Backdrop>,
          document.getElementById('spinner-root')
        )}
    </>
  );
};

export default LoadingSpinner;
