import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity} from 'react-native';

// Define a type for the theme
interface Theme {
  WP: (value: number) => number;
  DefaultPalette: () => {text: {primary: string}; background: {paper: string}};
  fonts: {medium: string; semiBold: string};
  fontWeights: {medium: string; semiBold: string};
}

interface HeaderContainerProps {
  justifyContent?: string;
  theme: Theme;
}

interface IconCountWrapperProps {
  mr?: number;
  height?: number;
  width?: number;
  theme: Theme;
}

interface AvatarWrapperProps {
  size?: number;
  theme: Theme;
}

interface HeaderTitleProps {
  color?: string;
  theme: Theme;
}

interface HeaderImageWrapperProps {
  bg?: string;
  marginTop?: number;
  marginBottom?: number;
  size?: {width?: number; height?: number};
  border?: {width?: number; color?: string};
  theme: Theme;
}

interface HeaderImageProps {
  marginRight?: number;
  size?: number;
  theme: Theme;
}

export const HeaderWrapper = styled(View)`
  flex-direction: row;
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(2)}px;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled(View)<HeaderContainerProps>`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'center'};
`;

export const IconCountWrapper = styled(TouchableOpacity)<IconCountWrapperProps>`
  position: relative;
  align-items: center;
  justify-content: center;
  margin-right: ${props =>
    props.mr ? props.theme.WP(props.mr) : props.theme.WP(2)}px;
  height: ${props =>
    props.height ? props.theme.WP(props.height) : props.theme.WP(8)}px;
  width: ${props =>
    props.width ? props.theme.WP(props.width) : props.theme.WP(8)}px;
`;

export const HeaderDetailWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AvatarWrapper = styled(View)<AvatarWrapperProps>`
  width: ${props =>
    props.size ? props.theme.WP(props.size) : props.theme.WP(13)}px;
  height: ${props =>
    props.size ? props.theme.WP(props.size) : props.theme.WP(13)}px;
  border-radius: ${props => props?.theme?.WP(20)}px;
  margin-right: ${props => props?.theme?.WP(2)}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette().background?.paper};
`;

export const Avatar = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
`;

export const HeaderTitle = styled(Text)<HeaderTitleProps>`
  color: ${props => (props.color ? props.color : '#0A0615')};
  font-size: ${props => props?.theme?.WP(5.6)}px;
  font-family: ${props => props?.theme?.fonts?.medium};
  font-weight: ${props => props?.theme?.fontWeights.semiBold};
  flex: 1;
  flex-wrap: wrap;
  padding-left: ${props => props?.theme?.WP(10)}px;
  padding-right: ${props => props?.theme?.WP(10)}px;
  text-align: center;
`;

export const HeaderSectionTitle = styled(Text)<HeaderTitleProps>`
  margin-top: ${props => props?.theme?.WP(5)}px;
  text-align: center;
  color: ${props => (props.color ? props.color : '#0A0615')};
  font-size: ${props => props?.theme?.WP(6.2)}px;
  font-family: ${props => props?.theme?.fonts.semiBold};
  font-weight: ${props => props?.theme?.fontWeights.semiBold};
`;

export const HeaderImageWrapper = styled(View)<HeaderImageWrapperProps>`
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.bg ? props.bg : 'transparent')};
  margin-top: ${props =>
    props.marginTop ? props.theme.WP(props.marginTop) : props.theme.WP(7)}px;
  margin-bottom: ${props =>
    props.marginBottom
      ? props.theme.WP(props.marginBottom)
      : props.theme.WP(5)}px;
  width: ${props =>
    props.size?.width
      ? props.theme.WP(props.size.width)
      : props.theme.WP(30)}px;
  height: ${props =>
    props.size?.height
      ? props.theme.WP(props.size.height)
      : props.theme.WP(30)}px;
  border-radius: ${props => props?.theme?.WP(50)}px;
  border-width: ${props => (props.border?.width ? props.border.width : 0)}px;
  border-color: ${props =>
    props.border?.color ? props.border.color : 'transparent'};
`;

export const HeaderImage = styled(Image)<HeaderImageProps>`
  margin-left: ${props => props?.theme?.WP(2)}px;
  margin-right: ${props =>
    props.marginRight ? props.theme.WP(props.marginRight) : 0}px;

  width: ${props =>
    props.size ? props.theme.WP(props.size) : props.theme.WP(12)}px;
  height: ${props =>
    props.size ? props.theme.WP(props.size) : props.theme.WP(12)}px;
  border-radius: ${props => props?.theme?.WP(20)}px;
  background-color: white;
`;
