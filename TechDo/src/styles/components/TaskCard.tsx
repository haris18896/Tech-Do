import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

interface ThemeProps {
  theme: {
    DefaultPalette: () => any;
    WP: (size: number) => number;
  };
}

interface CompletedProps extends ThemeProps {
  completed?: boolean;
}

interface ModalButtonProps extends ThemeProps {
  variant?: 'default' | 'danger';
}

interface PriorityProps extends ThemeProps {
  priority?: 'low' | 'medium' | 'high';
  color?: string;
}

export const CardContainer = styled(Animated.View)<CompletedProps & PriorityProps>`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.WP(4)}px;
  margin-horizontal: ${props => props.theme.WP(2)}px;
  margin-vertical: ${props => props.theme.WP(2)}px;
  border-radius: 12px;
  border-left-width: 4px;
  border-left-color: ${props => {
    if (props.completed) return props.theme.DefaultPalette().success.main;
    if (props.priority === 'high') return props.theme.DefaultPalette().error.main;
    if (props.priority === 'medium') return props.theme.DefaultPalette().warning.main;
    if (props.priority === 'low') return props.theme.DefaultPalette().success.main;
    return props.theme.DefaultPalette().primary.main;
  }};
  background-color: ${props => props.theme.DefaultPalette().background.card};
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
`;

export const CompletionCircle = styled(TouchableOpacity)`
  padding-right: ${props => props.theme.WP(3)}px;
`;

export const CheckCircle = styled(View)<CompletedProps>`
  width: ${props => props.theme.WP(6)}px;
  height: ${props => props.theme.WP(6)}px;
  border-radius: ${props => props.theme.WP(3)}px;
  border-width: 2px;
  border-color: ${props => props.completed ?
    props.theme.DefaultPalette().success.main :
    props.theme.DefaultPalette().grey[400]};
  background-color: ${props => props.completed ?
    props.theme.DefaultPalette().success.main :
    'transparent'};
  justify-content: center;
  align-items: center;
`;

export const TaskContent = styled(View)`
  flex: 1;
  padding-horizontal: ${props => props.theme.WP(2)}px;
`;

export const TaskTitle = styled(Text)<CompletedProps>`
  font-size: ${props => props.theme.WP(4)}px;
  font-weight: 600;
  margin-bottom: ${props => props.theme.WP(1)}px;
  color: ${props => props.theme.DefaultPalette().text.title};
  text-decoration-line: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
`;

export const TaskInfoRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TaskStatus = styled(Text)<CompletedProps>`
  font-size: ${props => props.theme.WP(3)}px;
  font-weight: 500;
  color: ${props => props.completed ?
    props.theme.DefaultPalette().success.main :
    props.theme.DefaultPalette().primary.main};
`;

export const PriorityBadge = styled(View)<PriorityProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.color ? `${props.color}10` : 'transparent'};
  padding-horizontal: ${props => props.theme.WP(2)}px;
  padding-vertical: ${props => props.theme.WP(0.5)}px;
  border-radius: ${props => props.theme.WP(4)}px;
  border-width: 1px;
  border-color: ${props => props.color ? `${props.color}40` : 'transparent'};
`;

export const PriorityText = styled(Text)<PriorityProps>`
  font-size: ${props => props.theme.WP(2.5)}px;
  font-weight: 600;
  color: ${props => props.color || props.theme.DefaultPalette().text.secondary};
  margin-left: ${props => props.theme.WP(1)}px;
`;

export const ActionsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled(TouchableOpacity)`
  padding: ${props => props.theme.WP(2)}px;
`;

// Modal Components
export const ModalOverlay = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled(View)`
  width: 80%;
  border-radius: 12px;
  padding: ${props => props.theme.WP(5)}px;
  align-items: center;
  background-color: ${props => props.theme.DefaultPalette().background.paper};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const ModalHeader = styled(View)`
  align-items: center;
  margin-bottom: ${props => props.theme.WP(4)}px;
`;

export const ModalTitle = styled(Text)`
  font-size: ${props => props.theme.WP(4.5)}px;
  font-weight: bold;
  margin-top: ${props => props.theme.WP(2)}px;
  color: ${props => props.theme.DefaultPalette().text.title};
`;

export const ModalMessage = styled(Text)`
  font-size: ${props => props.theme.WP(4)}px;
  text-align: center;
  margin-bottom: ${props => props.theme.WP(6)}px;
  color: ${props => props.theme.DefaultPalette().text.body};
`;

export const ModalActions = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ModalButton = styled(TouchableOpacity)<ModalButtonProps>`
  padding-vertical: ${props => props.theme.WP(3)}px;
  padding-horizontal: ${props => props.theme.WP(5)}px;
  border-radius: 8px;
  min-width: 45%;
  align-items: center;
  background-color: ${props => props.variant === 'danger' ?
    props.theme.DefaultPalette().error.main :
    props.theme.DefaultPalette().background.default};
`;

export const ButtonText = styled(Text)<ModalButtonProps>`
  font-size: ${props => props.theme.WP(3.5)}px;
  font-weight: 600;
  color: ${props => props.variant === 'danger' ?
    props.theme.DefaultPalette().common.white :
    props.theme.DefaultPalette().text.body};
`;
