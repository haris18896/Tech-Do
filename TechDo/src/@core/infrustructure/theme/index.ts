import {space, sizes} from './spacing';
import {fonts, fontWeights, lineHeights, fontSizes, Fonts, FontWeights, FontSizes, LineHeights} from './fonts';
import {
  WP,
  HP,
  scrWidth,
  scrHeight,
  platformOrientedCode,
} from './responsive';
import DefaultPalette, { Palette } from './colors';

export type RF = (size: number) => number;

// Interface for theme object
export interface ThemeType {
  WP: (widthPercent: number | string) => number;
  HP: (heightPercent: number | string) => number;
  RF?: RF;
  space: string[];
  sizes: string[];
  fonts: Fonts;
  scrWidth: number;
  scrHeight: number;
  fontSizes: FontSizes;
  lineHeights: LineHeights;
  fontWeights: FontWeights;
  DefaultPalette: (theme: 'dark' | 'light') => Palette;
  platformOrientedCode: <T>(androidVal: T, iOSVal: T) => T;
}

export const theme: ThemeType = {
  WP,
  HP,
  space,
  sizes,
  fonts,
  scrWidth,
  scrHeight,
  fontSizes,
  lineHeights,
  fontWeights,
  DefaultPalette,
  platformOrientedCode,
};
