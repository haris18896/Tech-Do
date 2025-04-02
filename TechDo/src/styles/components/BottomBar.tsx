import styled from 'styled-components';
import {Platform, TouchableOpacity, View} from 'react-native';

interface ThemeProps {
  theme: {
    WP: (value: number) => number;
    DefaultPalette: () => {
      error?: {
        main?: string;
      };
      common?: {
        white?: string;
      };
    };
  };
}

interface BottomBarIconHolderProps extends ThemeProps {
  isActive?: boolean;
}

export const BottomBarWrapper = styled(View)<ThemeProps>`
  margin: ${props => props?.theme?.WP(2)}px;
  width: 96%;
  background-color: ${props => props.theme.DefaultPalette().error?.main};
  border-radius: ${props => props?.theme?.WP(4)}px;
  position: absolute;
  left: ${props => props?.theme?.WP(2)}px;
  bottom: ${props =>
    Platform.OS === 'ios' ? props?.theme?.WP(4) : props?.theme?.WP(2)}px;
`;

export const BottomBarContainer = styled(View)<ThemeProps>`
  padding: ${props => props?.theme?.WP(2)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`;

export const BottomBarIconHolder = styled(
  TouchableOpacity,
)<BottomBarIconHolderProps>`
  width: ${props => props?.theme?.WP(10)}px;
  height: ${props => props?.theme?.WP(10)}px;
  border-radius: ${props => props?.theme?.WP(14)}px;
  background-color: ${props =>
    props?.isActive
      ? props.theme.DefaultPalette().common?.white
      : 'transparent'};
  margin-right: ${props => props?.theme?.WP(2)}px;
  margin-left: ${props => props?.theme?.WP(2)}px;
  align-items: center;
  justify-content: center;
`;
