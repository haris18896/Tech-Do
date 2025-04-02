import {View} from 'react-native';
import styled from 'styled-components/native';

interface Theme {
  WP: (value: number) => number;
}

interface ModalContainerProps {
  theme: Theme;
}

export const ModalContainer = styled(View)<ModalContainerProps>`
  padding: ${props => props.theme.WP(1)}px;
`;
