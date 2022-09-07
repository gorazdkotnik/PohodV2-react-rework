import { useContext, createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();
const { Provider } = ThemeContext;

const darkTheme = {
  palette: {
    mode: 'dark',
  },
};
const lightTheme = {
  palette: {
    mode: 'light',
  },
};

const ThemeContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDark(isDark);
  }, []);

  function toggleTheme() {
    if (dark === true) {
      setDark(false);
    } else {
      setDark(true);
    }

    // save theme tipe to local storage
    localStorage.setItem('theme', dark ? 'light' : 'dark');
  }

  const theme = useMemo(() => {
    if (dark === true) {
      return createTheme(darkTheme);
    }
    return createTheme(lightTheme);
  }, [dark]);

  return (
    <Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

const useUIContext = () => useContext(ThemeContext);

function useToggleTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useCustomThemeContext must be used within an CustomThemeProvider'
    );
  }
  return context;
}

export { ThemeContextProvider, useUIContext, useToggleTheme };
