import CssBaseline from '@mui/material/CssBaseline';

import { AuthContextProvider } from './context/AuthContext';
import { UIContextProvider } from './context/UIContext';

import LoadingSpinner from './components/ui/LoadingSpinner';
import Modal from './components/ui/Modal';
import Notification from './components/ui/Notification';

import RoutesConfig from './components/router/RoutesConfig';

const App = () => {
  return (
    <UIContextProvider>
      <AuthContextProvider>
        <CssBaseline />

        <LoadingSpinner />
        <Modal />
        <Notification />

        <RoutesConfig />
      </AuthContextProvider>
    </UIContextProvider>
  );
};

export default App;
