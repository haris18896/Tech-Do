import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

interface ThemeProps {
  theme: {
    DefaultPalette: () => any;
    WP: (value: number) => number;
  };
}

export const SectionHeader = styled(View)<ThemeProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${props => props.theme.WP(1)}px;
  margin-bottom: ${props => props.theme.WP(2)}px;
`;

export const SectionTitle = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(5)}px;
  font-weight: bold;
  color: ${props => props.theme.DefaultPalette().text.title};
`;

export const TaskCount = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(3.5)}px;
  color: ${props => props.theme.DefaultPalette().text.body};
`;

export const TasksList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 450,
    flexGrow: 1,
  },
})`
  flex-grow: 1;
` as any;

export const ListContainer = styled.View`
  padding-bottom: ${props => props.theme.WP(20)}px;
  flex-grow: 1;
`;

export const FloatingActionButton = styled(TouchableOpacity)<ThemeProps>`
  position: absolute;
  top: ${props => props.theme.HP(82)}px;
  right: ${props => props.theme.WP(6)}px;
  width: ${props => props.theme.WP(14)}px;
  height: ${props => props.theme.WP(14)}px;
  border-radius: ${props => props.theme.WP(7)}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.DefaultPalette().primary.main};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.27;
  shadow-radius: 4.65px;
`;

export const EmptyStateContainer = styled(View)<ThemeProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.theme.WP(20)}px;
`;

export const EmptyStateTitle = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(5)}px;
  font-weight: bold;
  margin-top: ${props => props.theme.WP(4)}px;
  margin-bottom: ${props => props.theme.WP(2)}px;
  color: ${props => props.theme.DefaultPalette().text.title};
`;

export const EmptyStateSubtitle = styled(Text)<ThemeProps>`
  font-size: ${props => props.theme.WP(3.5)}px;
  text-align: center;
  padding-horizontal: ${props => props.theme.WP(10)}px;
  color: ${props => props.theme.DefaultPalette().text.body};
`;
