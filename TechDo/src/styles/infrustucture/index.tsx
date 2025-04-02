import styled from 'styled-components';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {DefaultTheme} from 'styled-components';

// Extend the DefaultTheme to include custom properties
interface CustomTheme extends DefaultTheme {
  WP: (value: string | number) => number;
  HP: (value: string | number) => number;
  scrHeight: number;
  scrWidth: number;
  fonts?: {
    medium: string;
    [key: string]: string;
  };
  fontWeights: {
    medium: string | number;
    [key: string]: string | number;
  };
  DefaultPalette: (theme?: string) => {
    background: {
      paper: string;
      card: string;
      backdrop: string;
      [key: string]: string;
    };
    common: {
      bottomBarBG: string;
      [key: string]: string;
    };
    error: {
      main: string;
      [key: string]: string;
    };
    divider: string;
    text: {
      secondary: string;
      body: string;
      [key: string]: string;
    };
    borders: {
      inputBorder: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
}

// Base component props
interface ThemeProps {
  theme?: CustomTheme;
}

// Specific component props
interface SafeAreaProps extends ThemeProps {
  background?: string;
}

interface LayoutContainerProps extends ThemeProps {
  bg?: string;
  marginTop?: number;
}

interface LayoutAreaProps extends ThemeProps {
  bg?: string;
}

interface BottomTabButtonProps extends ThemeProps {}

interface ErrorTextWrapperProps extends ThemeProps {}

interface ErrorTextProps extends ThemeProps {}

interface DividerProps extends ThemeProps {
  width: number;
}

interface CheckBoxLabelProps extends ThemeProps {
  color?: string;
}

interface RowCenterProps extends ThemeProps {
  width?: string;
}

interface CardProps extends ThemeProps {
  color?: string;
  padding?: number[];
}

interface BlockViewProps extends ThemeProps {
  bg?: string;
}

interface TextItemProps extends ThemeProps {
  color?: string;
  size?: number;
  family?: string;
  weight?: string;
}

export const SafeArea = styled(SafeAreaView)<SafeAreaProps>`
  flex: 1;
  position: relative;
  background-color: ${props =>
    props?.background
      ? props?.background
      : props.theme?.DefaultPalette().background.paper};
`;

export const LayoutContainer = styled(View)<LayoutContainerProps>`
  flex: 1;
  position: relative;
  align-items: flex-start;
  overflow: hidden;
  background-color: ${props =>
    props?.bg ? props?.bg : props.theme?.DefaultPalette().background.paper};
  padding-top: ${props => props.theme?.WP(4)}px;
  padding-bottom: ${props => props.theme?.WP(4)}px;
  padding-left: ${props => props.theme?.WP(2)}px;
  padding-right: ${props => props.theme?.WP(2)}px;
  margin-top: ${props =>
    props?.marginTop
      ? props.theme?.WP(props?.marginTop)
      : props.theme?.WP(2)}px;
  border-top-left-radius: ${props => props.theme?.WP(10)}px;
  border-top-right-radius: ${props => props.theme?.WP(10)}px;
`;

export const LayoutArea = styled(View)<LayoutAreaProps>`
  flex: 1;
  position: relative;
  background-color: ${props =>
    props?.bg ? props?.bg : props?.theme?.DefaultPalette()?.background?.paper};
`;

export const LoadingWrapper = styled(View)<ThemeProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => props?.theme?.scrHeight}px;
  width: ${props => props?.theme?.scrWidth}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette().background?.backdrop};
  z-index: 10;
`;

export const Container = styled(View)<ThemeProps>`
  flex: 1;
  margin-bottom: ${props => props.theme?.WP('2')}px;
`;

export const BottomTabBarWrapper = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${props => props.theme?.WP('2')}px;
  padding-right: ${props => props.theme?.WP('2')}px;
  elevation: ${props => props.theme?.HP('1')};
  z-index: ${props => props.theme?.HP('10')};
  background-color: ${props =>
    props.theme?.DefaultPalette().common.bottomBarBG};
`;

export const BottomTabButton = styled(TouchableOpacity)<BottomTabButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: ${props => props.theme?.WP('5')}px;
  padding-top: ${props => props.theme?.WP('5')}px;
  margin: ${props => props.theme?.WP('1')}px;
`;

export const ErrorTextWrapper = styled(View)<ErrorTextWrapperProps>`
  border-radius: ${props => props?.theme?.WP(5)}px;
  margin-top: ${props => props?.theme?.WP(2)}px;
  margin-bottom: ${props => props?.theme?.WP(0)}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
  padding-left: ${props => props?.theme?.WP(1)}px;
  padding-right: ${props => props?.theme?.WP(1)}px;
  padding-top: ${props => props?.theme?.WP(0.5)}px;
  padding-bottom: ${props => props?.theme?.WP(0.5)}px;
`;

export const ErrorText = styled(Text)<ErrorTextProps>`
  font-size: ${props => props.theme?.WP('3.5')}px;
  color: ${props => props.theme?.DefaultPalette().error.main};
  font-family: ${props => props.theme?.fonts?.medium};
`;

export const Divider = styled(View)<DividerProps>`
  width: ${props => props.theme?.WP(`${props?.width}`)}px;
  height: ${props => props.theme?.WP('0.3')}px;
  margin: ${props => props.theme?.WP('1')}px;
  background-color: ${props => props.theme?.DefaultPalette().divider};
`;

export const PageCenter = styled(View)<ThemeProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CheckBoxWrapper = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CheckBoxLabel = styled(Text)<CheckBoxLabelProps>`
  font-weight: ${props => props.theme?.fontWeights.medium};
  font-family: ${props => props.theme?.fonts?.medium};
  color: ${props =>
    props?.color ? props?.color : props.theme?.DefaultPalette().text.secondary};
  font-size: ${props => props.theme?.WP('3')}px;
`;

export const SpaceBetweenWrapper = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

export const SpaceAroundWrapper = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-around;
`;

export const RowSpaceAround = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const RowCenter = styled(View)<RowCenterProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${props => (props?.width ? props?.width : 'auto')};
`;

export const RowStart = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ColumnStart = styled(View)<ThemeProps>`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ColumnCenter = styled(View)<ThemeProps>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RowEnd = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ColumCenter = styled(View)<ThemeProps>`
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const CardWrapper = styled(Pressable)<ThemeProps>`
  margin-top: ${props => props.theme?.WP('4')}px;
`;

export const Card = styled(View)<CardProps>`
  position: relative;
  padding-top: ${props =>
    props?.padding
      ? props.theme?.WP(props?.padding[0])
      : props.theme?.WP('3')}px;
  padding-right: ${props =>
    props?.padding
      ? props.theme?.WP(props?.padding[1])
      : props.theme?.WP('3')}px;
  padding-bottom: ${props =>
    props?.padding
      ? props.theme?.WP(props?.padding[0])
      : props.theme?.WP('3')}px;
  padding-left: ${props =>
    props?.padding
      ? props.theme?.WP(props?.padding[1])
      : props.theme?.WP('3')}px;
  border-radius: ${props =>
    props?.padding ? props.theme?.WP('15') : props.theme?.WP('2')}px;
  background-color: ${props =>
    props?.color
      ? props?.color
      : props.theme?.DefaultPalette().background.card};
`;

export const DisciplineWrapper = styled(View)<ThemeProps>`
  margin-top: ${props => props.theme?.WP('2')}px;
  flex-direction: column;
`;

export const DisciplineHeader = styled(View)<ThemeProps>`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => props.theme?.WP('2')}px;
  margin-bottom: ${props => props.theme?.WP('2')}px;
  width: 58%;
`;

export const BlockView = styled(View)<BlockViewProps>`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme?.WP(3)}px;
  background-color: ${props =>
    props?.bg ? props?.bg : props.theme?.DefaultPalette().background.paper};
`;

export const ModelButtonWrapper = styled(View)<ThemeProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextItem = styled(Text)<TextItemProps>`
  color: ${props =>
    props?.color ? props?.color : props?.theme?.DefaultPalette()?.text?.body};
  font-size: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props?.theme?.WP(3)}px;
  font-family: ${props =>
    props?.family && props?.theme?.fonts
      ? props?.theme?.fonts[props?.family]
      : props?.theme?.fonts?.medium};
  font-weight: ${props =>
    props?.weight && props?.theme?.fontWeights
      ? props?.theme?.fontWeights[props?.weight]
      : props?.theme?.fontWeights?.medium};
`;
