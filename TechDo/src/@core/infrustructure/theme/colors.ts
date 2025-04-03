// Define the theme type
type ThemeMode = 'dark' | 'light';

interface CustomColors {
  dark: string;
  light: string;
  darkBg: string;
  lightBg: string;
  bodyBg: string;
  tooltipBg: string;
  tableHeaderBg: string;
}

interface CommonColors {
  black: string;
  white: string;
  bottomBarBG: string;
  switch: string;
  gray: string;
  gold: string;
}

interface ColorSet {
  light: string;
  main: string;
  dark: string;
}

interface PrimaryColors extends ColorSet {
  reverseContrastText?: string;
}

interface GreyColors {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A700: string;
  A400: string;
  A200: string;
  A100: string;
  light: string;
  dark: string;
  greyText: string;
}

interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
  title: string;
  body: string;
  muted: string;
  light: string;
}

interface BackgroundColors {
  paper: string;
  default: string;
  inputBG: string;
  card: string;
  table: string;
  paperGrey: string;
  backdrop: string;
  bottomTab: string;
}

interface ActionColors {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
}

interface BorderColors {
  inputBorder: string;
  borderSelected: string;
}

interface ShadowColors {
  color: string;
  paper: string;
}

interface SkeletonColors {
  backgroundColor: string;
  highlightColor: string;
}

interface InputColors {
  color: string;
  placeholderColor: string;
  borderColor: string;
  backgroundColor: string;
  disabledColor: string;
  errorColor: string;
}

export interface Palette {
  customColors: CustomColors;
  common: CommonColors;
  primary: PrimaryColors;
  secondary: ColorSet;
  success: ColorSet;
  error: ColorSet;
  warning: ColorSet;
  info: ColorSet;
  grey: GreyColors;
  text: TextColors;
  divider: string;
  background: BackgroundColors;
  action: ActionColors;
  borders: BorderColors;
  shadow: ShadowColors;
  skeleton: SkeletonColors;
  input: InputColors;
}

const DefaultPalette = (theme: ThemeMode): Palette => {
  const isDark = theme === 'dark';

  const whiteColor = '#FFF';
  const blackColor = '#000';

  return {
    customColors: {
      dark: isDark ? '#313a52' : '#4B4B4B',
      light: isDark ? '#161D31' : '#F8F8F8',
      darkBg: isDark ? '#313a52' : '#F8F8F8',
      lightBg: isDark ? '#161D31' : '#F8F8F8',
      bodyBg: isDark ? '#161D31' : '#F8F8F8',
      tooltipBg: isDark ? '#262732' : '#F8F8F8',
      tableHeaderBg: isDark ? '#343D55' : '#F5F5F7',
    },
    common: {
      black: blackColor,
      white: whiteColor,
      bottomBarBG: '#7367F0',
      switch: '#7367F0',
      gray: isDark ? '#283046' : '#FAFAFA',
      gold: '#FFD700',
    },
    primary: {
      light: isDark ? '#7367F01F' : '#E8DAFF',
      main: '#7367F0',
      dark: isDark ? '#5E50EE' : '#564ead',
      reverseContrastText: whiteColor,
    },
    secondary: {
      light: '#74d1f2',
      main: '#00ABE8',
      dark: '#147da3',
    },
    success: {
      light: isDark ? '#28C76F1F' : '#DFF4E7',
      main: '#28C76F',
      dark: isDark ? '#24B263' : '#248a51',
    },
    error: {
      light: isDark ? '#EA54551F' : '#FCE4E6',
      main: '#EA5455',
      dark: isDark ? '#E73D3E' : '#a63839',
    },
    warning: {
      light: isDark ? '#FF9F431F' : '#FFF4E5',
      main: '#FF9F43',
      dark: isDark ? '#FF932A' : '#a86e36',
    },
    info: {
      light: isDark ? '#00CFE81F' : '#E6F8FD',
      main: '#00CFE8',
      dark: isDark ? '#00B6CC' : '#18828f',
    },
    grey: {
      900: isDark ? '#FAFAFA' : '#161D31',
      800: isDark ? '#E0E0E0' : '#283046',
      700: isDark ? '#BDBDBD' : '#3B4253',
      600: isDark ? '#757575' : '#4C4E54',
      500: isDark ? '#9E9E9E' : '#7C7F86',
      400: isDark ? '#B4B7BD' : '#B4B7BD',
      300: isDark ? '#616161' : '#B4B7BD',
      200: isDark ? '#424242' : '#283046',
      100: isDark ? '#212121' : '#FAFAFA',
      50: isDark ? '#2F3E5D' : '#F5F5F5',
      A700: isDark ? '#616161' : '#4C4E54',
      A400: isDark ? '#BDBDBD' : '#B4B7BD',
      A200: isDark ? '#EEEEEE' : '#283046',
      A100: isDark ? '#F5F5F5' : '#2F3E5D',
      light: isDark ? '#1E1E1E' : '#B4B7BD',
      dark: isDark ? '#BABFC7' : '#D0D2D6',
      greyText: isDark ? '#7f909f' : '#B4B7BD',
    },
    text: {
      primary: isDark ? '#D0D2D6' : '#2F3E5D',
      secondary: isDark ? '#898c91' : '#6E6B7B',
      disabled: isDark ? '#4C4E54' : '#B9B9C3',
      title: isDark ? '#D0D2D6' : '#2F3E5D',
      body: isDark ? '#898c91' : '#6E6B7B',
      muted: isDark ? '#676D7D' : '#B9B9C3',
      light: isDark ? '#B4B7BD' : '#F8F8F8',
    },
    divider: isDark ? 'rgba(59, 66, 83, 0.48)' : 'rgba(236, 236, 236, 0.5)',
    background: {
      paper: isDark ? '#283046' : '#F8F7FA',
      default: isDark ? '#161D31' : '#F8F8F8',
      inputBG: isDark ? '#313a52' : '#F7F7F7',
      card: isDark ? '#313a52' : '#F8FAFB',
      table: isDark ? '#343D55' : '#28388F',
      paperGrey: isDark ? '#283046' : '#F8F7FA',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      bottomTab: isDark ? '#313a52' : '#FFC279',
    },
    action: {
      active: isDark ? '#B4B7BD' : '#6E6B7B',
      hover: isDark ? 'rgba(115, 103, 240, 0.04)' : 'rgba(115, 103, 240, 0.04)',
      selected: isDark
        ? 'rgba(115, 103, 240, 0.08)'
        : 'rgba(115, 103, 240, 0.08)',
      disabled: isDark
        ? 'rgba(180, 183, 189, 0.26)'
        : 'rgba(115, 103, 240, 0.26)',
      disabledBackground: isDark
        ? 'rgba(180, 183, 189, 0.12)'
        : 'rgba(115, 103, 240, 0.12)',
      focus: isDark ? 'rgba(115, 103, 240, 0.12)' : 'rgba(115, 103, 240, 0.12)',
    },
    borders: {
      inputBorder: isDark ? '#3B4253' : '#E8E8E8',
      borderSelected: isDark ? '#7367F0' : '#cae9fc',
    },
    shadow: {
      color: isDark ? '#161D31' : '#707070',
      paper: isDark ? '#161D31' : '#000',
    },
    skeleton: {
      backgroundColor: isDark ? '#3B4253' : '#bdbdbd',
      highlightColor: isDark ? '#313a52' : '#e0e0e0',
    },
    input: {
      color: isDark ? '#D0D2D6' : '#2F3E5D',
      placeholderColor: isDark ? '#B4B7BD' : '#BDBDBD',
      borderColor: isDark ? '#3B4253' : '#E8E8E8',
      backgroundColor: isDark ? '#313a52' : '#F7F7F7',
      disabledColor: isDark ? '#B4B7BD' : '#BDBDBD',
      errorColor: '#EA5455',
    },
  };
};

export default DefaultPalette;
