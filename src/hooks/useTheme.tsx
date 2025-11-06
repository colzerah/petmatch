import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { lightTheme } from '../theme/lightTheme';
import { darkTheme } from '../theme/darkTheme';
import { ThemeObject } from '../dtos/themeDTO';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

interface ThemeContextData {
  theme: ThemeObject;
  changeTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const changeTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ApplicationProvider {...eva} theme={theme}>
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
