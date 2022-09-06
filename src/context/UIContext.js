import { useContext, createContext, useState } from 'react';

const UIContext = createContext();
const { Provider } = UIContext;

const UIContextProvider = ({ children }) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const [notification, setNotification] = useState(null);

  const [dialog, setDialog] = useState();

  const value = {
    showLoadingSpinner,
    setShowLoadingSpinner,
    notification,
    setNotification,
    setDialog,
    dialog,
  };

  return <Provider value={value}>{children}</Provider>;
};

const useUIContext = () => useContext(UIContext);

export { UIContextProvider, useUIContext };
