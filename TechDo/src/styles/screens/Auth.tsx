import styled from 'styled-components';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {DefaultTheme} from 'styled-components';

// Extend the DefaultTheme to include custom properties
interface CustomTheme extends DefaultTheme {
  WP: (value: string | number) => number;
  scrHeight: number;
  fonts?: {
    medium: string;
    [key: string]: string;
  };
  fontWeights: {
    medium: string | number;
    [key: string]: string | number;
  };
  DefaultPalette: (theme?: string) => {
    primary?: {
      main: string;
      [key: string]: string;
    };
    background?: {
      paper: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
}

// Type definitions for styled-component props
interface AvoidKeyboardProps {
  theme?: CustomTheme;
}

interface AuthContainerProps {
  theme?: CustomTheme;
  paddingBottom?: number;
  paddingHorizontal?: number;
}

interface AuthActivityWrapperProps {
  theme?: CustomTheme;
  justifyContent?: string;
  width?: string;
  mt?: number;
  mb?: number;
}

interface AuthActivityLabelProps {
  theme?: CustomTheme;
  color?: string;
}

interface UserActivityWrapperProps {
  theme?: CustomTheme;
  width?: string;
  direction?: string;
  alignItems?: string;
  justifyContent?: string;
  marginTop?: number;
  marginBottom?: number;
  height?: number;
}

export const AvoidKeyboard = styled(KeyboardAvoidingView)<AvoidKeyboardProps>`
  flex: 0.2;
  width: 100%;
  margin-bottom: ${props => props.theme?.WP(4)}px;
  position: relative;
`;

export const AuthContainer = styled(ScrollView)<AuthContainerProps>`
  position: relative;
  width: 100%;
  flex: 1;
  padding-bottom: ${props =>
    props?.paddingBottom
      ? props?.theme?.WP(props?.paddingBottom)
      : props.theme?.WP(5)}px;
  height: ${props => props.theme?.scrHeight / 1.7}px;
  padding-left: ${props => props.theme?.WP(props?.paddingHorizontal || 4)}px;
  padding-right: ${props => props.theme?.WP(props?.paddingHorizontal || 4)}px;
`;

export const AuthActivityWrapper = styled(View)<AuthActivityWrapperProps>`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props?.justifyContent || 'space-between'};
  width: ${props => props?.width || '100%'};
  margin-top: ${props => (props?.mt ? props?.theme?.WP(props?.mt) : '0')}px;
  margin-bottom: ${props => (props?.mb ? props?.theme?.WP(props?.mb) : '0')}px;
`;

export const AuthActivityLabel = styled(Text)<AuthActivityLabelProps>`
  font-weight: ${props => props.theme?.fontWeights.medium};
  font-family: ${props => props.theme?.fonts?.medium};
  color: ${props =>
    props?.color ? props?.color : props.theme?.DefaultPalette()?.primary?.main};
  font-size: ${props => props.theme?.WP('3.2')}px;
`;

export const UserActivityWrapper = styled(View)<UserActivityWrapperProps>`
  width: ${props => (props?.width ? props?.width : '100%')};
  flex-direction: ${props => (props?.direction ? props?.direction : 'row')};
  align-items: ${props => (props?.alignItems ? props?.alignItems : 'center')};
  justify-content: ${props =>
    props?.justifyContent ? props?.justifyContent : 'space-between'};
  margin-top: ${props => props?.theme?.WP(props?.marginTop || 0)}px;
  margin-bottom: ${props => props?.theme?.WP(props?.marginBottom || 0)}px;
  height: ${props =>
    props?.height ? `${props?.theme?.WP(props?.height)}px` : 'auto'};
`;
