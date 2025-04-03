import styled from 'styled-components/native';
import {View, Text} from 'react-native';

interface ThemeProps {
  theme: {
    DefaultPalette: () => any;
    WP: (value: number) => number;
  };
}

interface IconContainerProps extends ThemeProps {
  accentColor: string;
}

interface ProgressBarProps extends ThemeProps {
  percentage: number;
  accentColor: string;
}

export const CardContainer = styled(View)<ThemeProps>`
  flex-direction: row;
  border-radius: 16px;
  padding: ${props => props.theme.WP(4)}px;
  margin-right: ${props => props.theme.WP(3)}px;
  margin-vertical: ${props => props.theme.WP(2)}px;
  background-color: ${props => props.theme.DefaultPalette().background.card};
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
`;

export const IconContainer = styled(View)<IconContainerProps>`
  width: ${props => props.theme.WP(12)}px;
  height: ${props => props.theme.WP(12)}px;
  border-radius: ${props => props.theme.WP(6)}px;
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.theme.WP(4)}px;
  background-color: ${props => `${props.accentColor}20`};
`;

export const ContentContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const Title = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(4)}px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.WP(2)}px;
  color: ${props => props.theme.DefaultPalette().text.title};
`;

export const ProgressContainer = styled(View)`
  width: 100%;
`;

export const ProgressBar = styled(View)<ThemeProps>`
  height: ${props => props.theme.WP(2)}px;
  border-radius: ${props => props.theme.WP(1)}px;
  overflow: hidden;
  margin-bottom: ${props => props.theme.WP(1)}px;
  background-color: ${props => props.theme.DefaultPalette().grey[200]};
`;

export const ProgressFill = styled(View)<ProgressBarProps>`
  height: 100%;
  border-radius: ${props => props.theme.WP(1)}px;
  background-color: ${props => props.accentColor};
  width: ${props => `${props.percentage}%`};
`;

export const ProgressText = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(3)}px;
  font-weight: 500;
  color: ${props => props.theme.DefaultPalette().text.body};
`;
