import styled from 'styled-components/native';
import { View, Text, ScrollView } from 'react-native';

interface ThemeProps {
  theme: {
    DefaultPalette: () => any;
    WP: (value: number) => number;
  };
}

export const Container = styled(View)<ThemeProps>`
  margin-bottom: ${props => props.theme.WP(4)}px;
`;

export const OverallProgressCard = styled(View)<ThemeProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: ${props => props.theme.WP(4)}px;
  margin-bottom: ${props => props.theme.WP(4)}px;
  padding: ${props => props.theme.WP(4)}px;
  border-radius: 16px;
  background-color: ${props => props.theme.DefaultPalette().primary.main};
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.15;
  shadow-radius: 5px;
`;

export const OverallProgressLeft = styled(View)`
  flex: 1;
`;

export const ProgressTitle = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(5)}px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.WP(1)}px;
  color: ${props => props.theme.DefaultPalette().common.white};
`;

export const ProgressSubtitle = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(3.5)}px;
  opacity: 0.9;
  color: ${props => props.theme.DefaultPalette().common.white};
`;

export const ProgressCircleContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const ProgressCircle = styled(View)<ThemeProps>`
  width: ${props => props.theme.WP(16)}px;
  height: ${props => props.theme.WP(16)}px;
  border-radius: ${props => props.theme.WP(8)}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const ProgressPercentage = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(5)}px;
  font-weight: bold;
  color: ${props => props.theme.DefaultPalette().primary.main};
`;

export const CategoryCardsContainer = styled(ScrollView)`
  padding-left: ${props => props.theme.WP(4)}px;
  padding-right: ${props => props.theme.WP(8)}px;
`;
