import styled from 'styled-components';
import {Text, View} from 'react-native';

interface ThemeProps {
  theme: {
    WP: (value: number | string) => number;
    fontWeights: {
      medium: string;
    };
    fonts?: {
      medium?: string;
    };
    DefaultPalette: () => {
      text?: {
        body?: string;
      };
    };
  };
}

interface CheckBoxLabelProps extends ThemeProps {
  labelColor?: string;
}

export const CheckBoxWrapper = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CheckBoxLabel = styled(Text)<CheckBoxLabelProps>`
  font-weight: ${props => props.theme.fontWeights.medium};
  font-family: ${props => props.theme.fonts?.medium};
  color: ${props =>
    props?.labelColor
      ? props?.labelColor
      : props?.theme?.DefaultPalette()?.text?.body};
  font-size: ${props => props.theme.WP('3')}px;
`;
