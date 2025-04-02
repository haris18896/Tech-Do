import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import styled from 'styled-components';

interface ThemeProps {
  theme: {
    WP: (value: number) => number;
    fonts?: {
      medium?: string;
    };
    fontWeights?: {
      medium?: string;
    };
    DefaultPalette: () => {
      primary?: {
        reverseContrastText?: string;
      };
      secondary?: {
        light?: string;
      };
      background?: {
        card?: string;
      };
      common?: {
        white?: string;
      };
      grey?: {
        [key: number]: string;
      };
    };
  };
}

interface UserDetailProps extends ThemeProps {
  marginBottom?: number;
}

interface UserDetailTextProps extends ThemeProps {
  fontWeight?: string;
}

interface MenuItemComponentProps extends ThemeProps {
  active?: boolean;
}

interface MenuItemTextProps extends ThemeProps {
  active?: boolean;
  fontWeight?: string;
}

export const DrawerWrapper = styled(SafeAreaView)<ThemeProps>`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const DrawerAvatarWrapper = styled(TouchableOpacity)<ThemeProps>`
  width: 100%;
  padding-left: ${props => props?.theme?.WP(5)}px;
  padding-right: ${props => props?.theme?.WP(5)}px;
  padding-top: ${props => (Platform.OS === 'ios' ? props?.theme?.WP(10) : 0)}px;
`;

export const DrawerAvatarContainer = styled(View)<ThemeProps>`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const UserDetailWrapper = styled(View)<ThemeProps>`
  margin-left: ${props => props?.theme?.WP(1)}px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
`;

export const UserDetailText = styled(Text)<UserDetailTextProps>`
  font-family: ${props => props?.theme?.fonts?.medium};
  font-weight: ${props =>
    props?.fontWeight ? props?.fontWeight : props?.theme?.fontWeights?.medium};
  color: ${props =>
    props?.theme?.DefaultPalette()?.primary?.reverseContrastText};
  font-size: ${props => props?.theme?.WP(3.5)}px;
`;

export const UserDetail = styled(View)<UserDetailProps>`
  margin-bottom: ${props =>
    props?.marginBottom ? props?.theme?.WP(props?.marginBottom) : 0}px;
`;

export const DrawerListWrapper = styled(ScrollView)<ThemeProps>`
  flex: 1;
  width: 100%;
  margin-top: ${props => props?.theme?.WP(4)}px;
`;

export const MenuItemComponent = styled(
  TouchableOpacity,
)<MenuItemComponentProps>`
  background-color: ${props =>
    props?.active
      ? props?.theme?.DefaultPalette()?.secondary?.light
      : props?.theme?.DefaultPalette()?.background?.card};
  border-radius: ${props => props?.theme?.WP(2)}px;
  margin-left: ${props => props?.theme?.WP(4)}px;
  margin-right: ${props => props?.theme?.WP(4)}px;
  padding-left: ${props => props?.theme?.WP(3)}px;
  padding-right: ${props => props?.theme?.WP(3)}px;
  padding-top: ${props => props?.theme?.WP(2)}px;
  padding-bottom: ${props => props?.theme?.WP(2)}px;
  margin-bottom: ${props => props?.theme?.WP(1)}px;
  margin-top: ${props => props?.theme?.WP(1)}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const MenuItemText = styled(Text)<MenuItemTextProps>`
  font-family: ${props => props?.theme?.fonts?.medium};
  font-weight: ${props =>
    props?.fontWeight ? props?.fontWeight : props?.theme?.fontWeights?.medium};
  color: ${props =>
    props?.active
      ? (props.theme?.DefaultPalette()?.common?.white ?? '#fff')
      : (props.theme?.DefaultPalette()?.grey?.[600] ?? '#757575')};
  font-size: ${props => props.theme?.WP(3.5) ?? 14}px;
  margin-left: ${props => props.theme?.WP(2) ?? 8}px;
`;

export const DrawerFooter = styled(View)<ThemeProps>`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding-left: ${props => props?.theme?.WP(5)}px;
  padding-bottom: ${props => props?.theme?.WP(5)}px;
`;

export const DrawerLogout = styled(TouchableOpacity)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${props => props?.theme?.WP(7)}px;
`;
