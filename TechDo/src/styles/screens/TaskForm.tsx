import styled from 'styled-components/native';
import { theme as themeUtils } from '../../@core/infrustructure/theme';

export const Container = styled.View`
  padding-top: ${themeUtils.WP(5)}px;
  padding-bottom: ${themeUtils.WP(5)}px;
  padding-left: ${themeUtils.WP(2)}px;
  padding-right: ${themeUtils.WP(2)}px;
`;

export const Title = styled.Text`
  font-size: ${themeUtils.WP(6)}px;
  font-weight: bold;
  color: ${props => props.theme.DefaultPalette().text.title};
  margin-bottom: ${themeUtils.WP(6)}px;
`;

export const InputContainer = styled.View`
  margin-bottom: ${themeUtils.WP(5)}px;
`;

export const InputLabel = styled.Text`
  font-size: ${themeUtils.WP(4)}px;
  font-weight: 600;
  color: ${props => props.theme.DefaultPalette().text.primary};
  margin-bottom: ${themeUtils.WP(2)}px;
`;

export const TextInput = styled.TextInput`
  background-color: ${props => props.theme.DefaultPalette().background.paper};
  padding: ${themeUtils.WP(3)}px;
  border-radius: ${themeUtils.WP(2)}px;
  font-size: ${themeUtils.WP(4)}px;
  border: 1px solid ${props => props.theme.DefaultPalette().divider};
  color: ${props => props.theme.DefaultPalette().text.primary};
`;

export const TextArea = styled(TextInput)`
  min-height: ${themeUtils.WP(25)}px;
  text-align-vertical: top;
`;

export const DateContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.DefaultPalette().background.paper};
  padding: ${themeUtils.WP(3)}px;
  border-radius: ${themeUtils.WP(2)}px;
  font-size: ${themeUtils.WP(4)}px;
  border: 1px solid ${props => props.theme.DefaultPalette().divider};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateText = styled.Text`
  font-size: ${themeUtils.WP(4)}px;
  color: ${props => props.theme.DefaultPalette().text.primary};
`;

export const OptionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${themeUtils.WP(5)}px;
`;

export const OptionButton = styled.TouchableOpacity<{ selected?: boolean; color?: string }>`
  background-color: ${props => props.selected ? props.color || props.theme.DefaultPalette().primary.main : props.theme.DefaultPalette().background.paper};
  padding: ${themeUtils.WP(2)}px ${themeUtils.WP(4)}px;
  border-radius: ${themeUtils.WP(2)}px;
  margin-right: ${themeUtils.WP(2)}px;
  border: 1px solid ${props => props.selected ? props.color || props.theme.DefaultPalette().primary.main : props.theme.DefaultPalette().divider};
`;

export const OptionText = styled.Text<{ selected?: boolean }>`
  font-size: ${themeUtils.WP(3.5)}px;
  color: ${props => props.selected ? props.theme.DefaultPalette().common.white : props.theme.DefaultPalette().text.primary};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${themeUtils.WP(5)}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  position: relative;
  background-color: ${props => props.theme.DefaultPalette().primary.main};
  padding: ${themeUtils.WP(4)}px;
  border-radius: ${themeUtils.WP(2)}px;
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.DefaultPalette().error.main};
  padding: ${themeUtils.WP(4)}px;
  border-radius: ${themeUtils.WP(2)}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-left: ${themeUtils.WP(3)}px;
`;

export const ButtonText = styled.Text`
  font-size: ${themeUtils.WP(4.5)}px;
  color: ${props => props.theme.DefaultPalette().common.white};
  font-weight: bold;
  margin-left: ${themeUtils.WP(2)}px;
`;

export const StatusBar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${themeUtils.WP(4)}px;
`;

export const StatusIndicator = styled.View<{ completed: boolean }>`
  width: ${themeUtils.WP(3)}px;
  height: ${themeUtils.WP(3)}px;
  border-radius: ${themeUtils.WP(1.5)}px;
  background-color: ${props => props.completed ? props.theme.DefaultPalette().success.main : props.theme.DefaultPalette().warning.main};
  margin-right: ${themeUtils.WP(2)}px;
`;

export const StatusText = styled.Text<{ completed: boolean }>`
  font-size: ${themeUtils.WP(3.5)}px;
  color: ${props => props.completed ? props.theme.DefaultPalette().success.main : props.theme.DefaultPalette().warning.main};
  font-weight: 500;
`;

export const ModalContent = styled.View`
  background-color: ${props => props.theme.DefaultPalette().background.paper};
  border-radius: ${themeUtils.WP(3)}px;
  padding: ${themeUtils.WP(5)}px;
  width: 90%;
  align-self: center;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: ${themeUtils.WP(3)}px;
  align-items: center;
  border-radius: ${themeUtils.WP(2)}px;
  background-color: ${props => props.theme.DefaultPalette().primary.main};
  margin-top: ${themeUtils.WP(3)}px;
`;

export const ModalButtonText = styled.Text`
  color: ${props => props.theme.DefaultPalette().common.white};
  font-size: ${themeUtils.WP(4)}px;
  font-weight: bold;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CalendarRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${themeUtils.WP(3)}px;
`;

export const DayButton = styled.TouchableOpacity<{ selected?: boolean }>`
  width: ${themeUtils.WP(10)}px;
  height: ${themeUtils.WP(10)}px;
  justify-content: center;
  align-items: center;
  margin: ${themeUtils.WP(1)}px;
  background-color: ${props => props.selected ? props.theme.DefaultPalette().primary.main : props.theme.DefaultPalette().background.default};
  border-radius: ${themeUtils.WP(5)}px;
`;

export const DayText = styled.Text<{ selected?: boolean; muted?: boolean }>`
  color: ${props => {
    if (props.selected) {return props.theme.DefaultPalette().common.white;}
    if (props.muted) {return props.theme.DefaultPalette().text.disabled;}
    return props.theme.DefaultPalette().text.primary;
  }};
  font-size: ${themeUtils.WP(3.5)}px;
`;

export const MonthYearSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${themeUtils.WP(3)}px;
`;

export const MonthYearText = styled.Text`
  font-size: ${themeUtils.WP(4.5)}px;
  font-weight: bold;
  color: ${props => props.theme.DefaultPalette().text.primary};
`;

export const ArrowButton = styled.TouchableOpacity`
  padding: ${themeUtils.WP(2)}px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${themeUtils.WP(4)}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${themeUtils.WP(5)}px;
  font-weight: bold;
  color: ${props => props.theme.DefaultPalette().text.primary};
  margin-left: ${themeUtils.WP(2)}px;
`;

export const ModalMessage = styled.Text`
  font-size: ${themeUtils.WP(4)}px;
  color: ${props => props.theme.DefaultPalette().text.primary};
  margin-bottom: ${themeUtils.WP(4)}px;
  text-align: center;
`;

export const ModalActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
