import styled from 'styled-components';
import {View, Text} from 'react-native';

// Define a type for the theme
interface Theme {
  WP: (value: number) => number;
  DefaultPalette: () => {text: {primary: string}};
  fonts: {medium: string};
  fontWeights: {medium: string};
}

interface EmptyCenterProps {
  maxWidth?: string;
  theme: Theme;
}

interface EmptyTextProps {
  fontSize?: number;
  theme: Theme;
}

export const EmptyCenter = styled(View)<EmptyCenterProps>`
  margin-top: ${props => props.theme.WP(8)}px;
  margin-bottom: ${props => props.theme.WP(8)}px;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '85%')};
`;

export const EmptyCenterWrapper = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
`;

export const EmptyWrapper = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled(Text)<EmptyTextProps>`
  text-align: center;
  color: ${props => props.theme.DefaultPalette().text.primary};
  font-size: ${props =>
    props.fontSize ? props.theme.WP(props.fontSize) : props.theme.WP(4.5)}px;
  font-family: ${props => props.theme.fonts.medium};
  font-weight: ${props => props.theme.fontWeights.medium};
  padding-left: ${props => props.theme.WP(4)}px;
  padding-right: ${props => props.theme.WP(4)}px;
`;
