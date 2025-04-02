import styled from 'styled-components';
import {View, Image, Text} from 'react-native';

interface WrapperProps {
  size?: number;
  marginRight?: number;
  background?: string;
  theme?: {
    WP: (value: number) => number;
    DefaultPalette: () => {
      background?: {
        paper?: string;
      };
    };
  };
}

interface AvatarImageProps {
  theme?: {
    WP: (value: number) => number;
  };
}

interface UserAvatarNameProps {
  theme?: {
    WP: (value: number) => number;
  };
}

interface UserAvatarNameTextProps {
  size?: number;
  theme?: {
    WP: (value: number) => number;
    fonts?: {
      semiBold?: string;
    };
    DefaultPalette: () => {
      primary?: {
        main?: string;
      };
    };
  };
}

export const UserAvatarWrapper = styled(View)<WrapperProps>`
  width: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props?.theme?.WP(15)}px;
  height: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props?.theme?.WP(15)}px;
  border-radius: ${props => props?.theme?.WP(20)}px;
  margin-right: ${props =>
    props?.marginRight ? props?.theme?.WP(props?.marginRight) : 0}px;
  background-color: ${props =>
    props?.background
      ? props?.background
      : props?.theme?.DefaultPalette()?.background?.paper};
`;

export const AvatarImage = styled(Image)<AvatarImageProps>`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
`;

export const UserAvatarName = styled(View)<UserAvatarNameProps>`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
  align-items: center;
  justify-content: center;
`;

export const UserAvatarNameText = styled(Text)<UserAvatarNameTextProps>`
  text-align: center;
  font-weight: 600;
  font-family: ${props => props?.theme?.fonts?.semiBold};
  font-size: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props?.theme?.WP(7)}px;
  color: ${props => props?.theme?.DefaultPalette().primary?.main};
`;
