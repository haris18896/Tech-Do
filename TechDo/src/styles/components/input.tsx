import styled from 'styled-components';
import {Text, TextInput, View} from 'react-native';

// Define a type for the theme
interface Theme {
  WP: (value: string | number) => number;
  DefaultPalette: () => {
    input: {
      color: string;
      errorColor: string;
      borderColor: string;
      disabledColor: string;
    };
    background: {inputBG: string};
  };
  fonts: {regular: string; bold: string; [key: string]: string};
  fontWeights: {bold: string; [key: string]: string};
}

interface TextInputWrapperProps {
  width?: string;
  theme: Theme;
}

interface InputLabelProps {
  labelStyles?: {
    weight?: string;
    family?: string;
    color?: string;
  };
  theme: Theme;
}

interface InputContainerProps {
  left?: boolean;
  right?: boolean;
  secureTextEntry?: boolean;
  inputBackground?: string;
  borderColor?: string;
  error?: boolean;
  theme: Theme;
}

interface InputProps {
  editable?: boolean;
  formikTouched?: boolean;
  formikError?: boolean;
  color?: string;
  imageIcon?: boolean;
  icon?: boolean;
  theme: Theme;
}

interface LeftIconWrapperProps {
  theme: Theme;
}

interface RightIconWrapperProps {
  theme: Theme;
}
export const TextInputWrapper = styled(View)<TextInputWrapperProps>`
  width: ${props => props.width || '100%'};
  position: relative;
  flex-direction: column;
  margin-bottom: ${props => props.theme.WP('1')}px;
  margin-top: ${props => props.theme.WP('2')}px;
`;

export const InputLabel = styled(Text)<InputLabelProps>`
  font-size: ${props => props.theme.WP('3.5')}px;
  font-weight: ${props =>
    props.labelStyles?.weight
      ? props.theme.fontWeights[props.labelStyles.weight]
      : props.theme.fontWeights.bold};
  font-family: ${props =>
    props.labelStyles?.family
      ? props.theme.fonts[
          props.labelStyles?.family as keyof typeof props.theme.fonts
        ]
      : props.theme.fonts.regular};
  margin-left: ${props => props.theme.WP('0.5')}px;
  color: ${props =>
    props.labelStyles?.color
      ? props.labelStyles.color
      : props.theme.DefaultPalette().input.color};
  padding-left: ${props => props.theme.WP('1')}px;
  padding-bottom: ${props => props.theme.WP('1')}px;
`;

export const InputContainer = styled(View)<InputContainerProps>`
  border-width: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  padding-left: ${props =>
    props.left ? props.theme.WP('8') : props.theme.WP('3')}px;
  padding-right: ${props =>
    props.right || props.secureTextEntry
      ? props.theme.WP('11')
      : props.theme.WP('0')}px;
  margin-top: ${props => props.theme.WP('1')}px;
  border-radius: ${props => props.theme.WP('2')}px;
  background-color: ${props =>
    props.inputBackground
      ? props.inputBackground
      : props.theme.DefaultPalette().background.inputBG};
  border-color: ${props =>
    props.borderColor
      ? props.borderColor
      : props.error
        ? props.theme.DefaultPalette().input.errorColor
        : props.theme.DefaultPalette().input.borderColor};
`;

export const Input = styled(TextInput)<InputProps>`
  text-align: left;
  width: 100%;
  font-family: ${props => props.theme.fonts?.regular};
  font-size: ${props => props.theme.WP('3')}px;
  font-weight: 500;
  color: ${props =>
    props.editable === false
      ? props.theme.DefaultPalette().input.disabledColor
      : props.formikTouched && props.formikError
        ? props.theme.DefaultPalette().input.errorColor
        : props.color
          ? props.color
          : props.theme.DefaultPalette().input.color};
  padding-left: ${props => props.theme.WP('1')}px;
  padding-right: ${props => props.theme.WP('2')}px;
  padding-top: ${props => props.theme.WP('1.5')}px;
  padding-bottom: ${props => props.theme.WP('1.5')}px;
  margin-left: ${props =>
    props.imageIcon
      ? props.theme.WP('7')
      : props.icon && props.theme.WP('2')}px;
  margin-right: ${props => props.theme.WP('1')}px;
  height: ${props => props.theme.WP('10')}px;
`;

export const LeftIconWrapper = styled(View)<LeftIconWrapperProps>`
  position: absolute;
  top: ${props => props.theme.WP(0.45)}px;
  left: ${props => props.theme.WP(1.5)}px;
  padding: ${props => props.theme.WP(2)}px;
`;

export const RightIconWrapper = styled(View)<RightIconWrapperProps>`
  position: absolute;
  top: ${props => props.theme.WP(0.45)}px;
  right: ${props => props.theme.WP(1.5)}px;
  padding: ${props => props.theme.WP(2)}px;
`;
