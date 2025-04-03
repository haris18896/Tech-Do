
export interface Fonts {
  body: string;
  heading: string;
  monospace: string;
  label: string;
  PoppinsThin: string;
  light: string;
  regular: string;
  medium: string;
  extraLight: string;
  bold: string;
  semiBold: string;
  extraBold: string;
  Gothic: string;
  GothicBold: string;
}

export interface FontWeights {
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
  xBold: number;
  xxBold: number;
}

export interface FontSizes {
  label: string;
  badge: string;
  dialog: string;
  caption: string;
  input: string;
  button: string;
  body: string;
  title: string;
  h5: string;
  h4: string;
  h3: string;
  h2: string;
  h1: string;
}

export interface LineHeights {
  dialog: string;
  badge: string;
  body: string;
  input: string;
  label: string;
  button: string;
  copy: string;
  title: string;
}

export const fonts: Fonts = {
  body: 'Poppins-Medium',
  heading: 'Poppins-SemiBold',
  monospace: 'Poppins-Regular',
  label: 'Poppins-Medium',
  PoppinsThin: 'Poppins-Thin',
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  extraLight: 'Poppins-ExtraLight',
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  extraBold: 'Poppins-ExtraBold',
  Gothic: 'Century Gothic',
  GothicBold: 'CenturyGothicPro-Bold',
};

export const fontWeights: FontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  xBold: 800,
  xxBold: 900,
};

export const fontSizes: FontSizes = {
  label: '10px',
  badge: '10px',
  dialog: '10px',
  caption: '12px',
  input: '14px',
  button: '14px',
  body: '14px',
  title: '20px',
  h5: '24px',
  h4: '34px',
  h3: '45px',
  h2: '56px',
  h1: '112px',
};

export const lineHeights: LineHeights = {
  dialog: '15px',
  badge: '15px',
  body: '21px',
  input: '18px',
  label: '21px',
  button: '21px',
  copy: '20px',
  title: '28px',
};
