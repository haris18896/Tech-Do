import styled from 'styled-components';
import {View, Image} from 'react-native';

interface Theme {
  WP: (value: number) => number;
  DefaultPalette: () => {
    secondary: { main: string };
    background: { paperGrey: string };
  };
}

interface ProfileImageWrapperProps {
  bg?: string;
  marginTop?: number;
  size?: { width?: number; height?: number };
  border?: { width?: number; color?: string };
  theme: Theme;
}

export const ProfileImageWrapper = styled(View)<ProfileImageWrapperProps>`
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bg ? props.bg : 'transparent')};
  margin-top: ${props =>
    props.marginTop ? props.theme.WP(props.marginTop) : props.theme.WP(1.5)}px;
  width: ${props =>
    props.size?.width ? props.theme.WP(props.size.width) : props.theme.WP(30)}px;
  height: ${props =>
    props.size?.height ? props.theme.WP(props.size.height) : props.theme.WP(30)}px;
  border-radius: ${props => props.theme.WP(50)}px;
  border-width: ${props => (props.border?.width ? props.border.width : 0)}px;
  border-color: ${props => (props.border?.color ? props.border.color : 'transparent')};
`;

export const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.WP(50)}px;
`;

export const UserProfileWrapper = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.WP(2)}px;
  position: relative;
`;

export const ProfileHolder = styled(View)`
  flex: 0.3;
  background-color: ${props => props.theme.DefaultPalette().secondary.main};
  border-bottom-left-radius: ${props => props.theme.WP(10)}px;
  border-bottom-right-radius: ${props => props.theme.WP(10)}px;
`;

export const ProfileContainer = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.DefaultPalette().background.paperGrey};
  margin-top: ${props => props.theme.WP(30)}px;
  border-top-left-radius: ${props => props.theme.WP(4)}px;
  border-top-right-radius: ${props => props.theme.WP(4)}px;
  position: relative;
`;
