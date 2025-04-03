import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';

// ** hooks
import useJwt from '../../auth/useJwt';
import {showToast} from '../../../utils/utils';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
  isDarkMode: boolean;
}

interface ThemeToggleProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeToggleProvider: React.FC<ThemeToggleProviderProps> = ({
  children,
}) => {
  const deviceTheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(deviceTheme || 'light');

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await useJwt.getData('theme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setTheme(savedTheme);
        }
      } catch (err) {
        showToast({
          title: 'Load theme',
          message: String(err),
          type: 'error',
        });
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async (): Promise<void> => {
    const newTheme: ThemeType = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await useJwt.setData('theme', newTheme);
    } catch (err) {
      showToast({
        title: 'Save theme',
        message: String(err),
        type: 'error',
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDarkMode: theme === 'dark',
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeToggleProvider');
  }
  return context;
};
