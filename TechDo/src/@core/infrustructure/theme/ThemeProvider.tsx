import React, {FC, ReactNode, useMemo} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {useTheme} from '../context/ThemeContext';
import DefaultPalette from './colors';
import {theme as baseTheme} from './index';
import {Palette} from './colors';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeObject {
  [key: string]: any;
  DefaultPalette: () => Palette;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
  const {theme} = useTheme();

  const themeObject = useMemo<ThemeObject>(
    () => ({
      ...baseTheme,
      DefaultPalette: () => DefaultPalette(theme),
    }),
    [theme],
  );

  return (
    <StyledThemeProvider theme={themeObject}>{children}</StyledThemeProvider>
  );
};
