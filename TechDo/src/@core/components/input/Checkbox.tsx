import React from 'react';

// ** Third Party Packages
// @ts-ignore
import {Checkbox} from 'react-native-paper';

// ** Custom Components
import {CheckBoxLabel, CheckBoxWrapper} from '../../../styles/components';

// Define type for checkbox state
type CheckBoxState = 'checked' | 'unchecked' | 'indeterminate';

// Define interface for props
interface CheckBoxProps {
  state: CheckBoxState;
  color?: string;
  label?: string;
  onPress?: () => void;
  variant?: string;
  disabled?: boolean;
  labelColor?: string;
  uncheckedColor?: string;
  position?: 'leading' | 'trailing';
}

const CheckBox: React.FC<CheckBoxProps> = ({
  state,
  color,
  label,
  onPress,
  variant,
  disabled,
  labelColor,
  uncheckedColor,
  position = 'leading',
}) => {
  return (
    <CheckBoxWrapper>
      <Checkbox.Android
        color={color}
        status={state}
        onPress={onPress}
        // @ts-ignore
        position={position}
        disabled={disabled}
        labelVariant={variant}
        uncheckedColor={uncheckedColor}
      />
      <CheckBoxLabel labelColor={labelColor}>{label}</CheckBoxLabel>
    </CheckBoxWrapper>
  );
};

export {CheckBox};
