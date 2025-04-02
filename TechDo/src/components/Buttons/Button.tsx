import React, {forwardRef} from 'react';
import {ActivityIndicator} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party packages
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {
  ButtonLabel,
  ButtonWrapper,
  IconWrapper,
  LoadingWrapper,
} from '../../styles/components';

// Define interfaces for props
interface IconProps {
  name: string;
  size: number;
  color: string;
}

interface ButtonActionProps {
  icon?: IconProps;
  size?: string;
  title?: string;
  border?: string;
  color?: string;
  width?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  loadingColor?: string;
  titleWeight?: string;
  radius?: number;
  styles?: object;
  end?: boolean;
  start?: boolean;
  padding?: string;
  underline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  labelColor: string;
}

const ButtonAction = forwardRef<any, ButtonActionProps>((props, ref) => {
  const {
    icon,
    size,
    title,
    border,
    color,
    width,
    onPress,
    children,
    loadingColor,
    radius,
    styles = {},
    end = false,
    start = false,
    padding,
    underline = false,
    loading = false,
    disabled = false,
    labelColor = '#fff',
  } = props;

  return (
    <ButtonWrapper
      ref={ref}
      radius={radius}
      color={color}
      width={width}
      padding={padding}
      onPress={onPress}
      style={styles}
      border={border}
      disabled={disabled || loading}>
      {icon?.name && start && (
        <IconWrapper left={start ? 2 : undefined} right={undefined}>
          <Icon
            name={icon?.name}
            size={AppTheme?.WP(icon?.size)}
            color={icon?.color}
          />
        </IconWrapper>
      )}

      <ButtonLabel
        labelColor={labelColor}
        style={extraStyles.underline(underline)}>
        {title}
      </ButtonLabel>
      {children}
      <LoadingWrapper
        size={size || 'medium'}
        left={start}
        right={end}
        loading={loading}>
        <ActivityIndicator size={AppTheme.WP('5')} color={loadingColor} />
      </LoadingWrapper>
      {icon?.name && end && (
        <IconWrapper left={undefined} right={end ? 2 : undefined}>
          <Icon
            name={icon?.name}
            size={AppTheme?.WP(icon?.size)}
            color={icon?.color}
          />
        </IconWrapper>
      )}
    </ButtonWrapper>
  );
});

interface UnderlineStyle {
  textDecorationLine:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
}

const extraStyles = {
  underline: (underline: boolean): UnderlineStyle => ({
    textDecorationLine: underline ? 'underline' : 'none',
  }),
};

export {ButtonAction};
