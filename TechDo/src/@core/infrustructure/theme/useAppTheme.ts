import { useMemo } from 'react';
import { useTheme as useThemeContext } from '../context/ThemeContext';
import DefaultPalette, { Palette } from './colors';

interface AppTheme {
  theme: 'dark' | 'light';
  palette: Palette;
  isDark: boolean;
}

export const useAppTheme = (): AppTheme => {
  const { theme } = useThemeContext();

  const palette = useMemo<Palette>(() => DefaultPalette(theme), [theme]);

  return {
    theme,
    palette,
    isDark: theme === 'dark',
  };
};
