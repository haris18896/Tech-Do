import React, {useState, forwardRef, RefObject} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

// Import with correct paths
import {theme as AppTheme} from '../../infrustructure/theme';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Input,
  InputLabel,
  InputContainer,
  TextInputWrapper,
  LeftIconWrapper,
  RightIconWrapper,
} from '../../../styles/components';
import {useAppTheme} from '../../infrustructure/theme/useAppTheme';
import {ErrorText, ErrorTextWrapper} from '../../../styles/infrustucture';

// Define types for the palette
interface Palette {
  text?: {
    body?: string;
  };
  borders?: {
    inputBorder?: string;
  };
  secondary?: {
    main?: string;
    light?: string;
  };
  grey?: any; // Use any for grey since the actual type is GreyColors
  primary?: {
    dark?: string;
  };
}

// Define a better type for styleData
interface StyleData {
  labelStyles?: {
    weight?: string;
    family?: string;
    color?: string;
  };
  errorMargin?: number;
  [key: string]: any;
}

// Define prop types for TextInput
interface TextInputProps {
  error?: boolean;
  width?: string;
  title?: string;
  height?: number;
  submit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  leftIcon?: string;
  disabled?: boolean;
  rightIcon?: string;
  inputColor?: string;
  placeholder?: string;
  formikError?: string;
  nextInputRef?: RefObject<any>;
  defaultValue?: string;
  formikTouched?: boolean;
  inputBackground?: string;
  placeholderColor?: string;
  borderColor?: string;
  styleData?: StyleData;
  maxLength?: number;
  inputMode?: string;
  textAlign?: string;
  autoFocus?: boolean;
  variant?: string;
  autoComplete?: string;
  returnKeyType?: string;
  autoCorrect?: boolean;
  blurOnSubmit?: boolean;
  autoCapitalize?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
  iconColor?: string;
  imageIcon?: {
    left?: {icon: any; width: number; height: number};
    right?: {icon: any; width: number; height: number};
  };
  cursorColor?: string;
  selectionColor?: string;
  [key: string]: any; // For rest props
}

const TextInput = forwardRef<any, TextInputProps>((props, ref) => {
  const {palette} = useAppTheme() as unknown as {palette: Palette};
  const {
    width,
    title,
    submit,
    onBlur,
    onFocus,
    leftIcon,
    disabled = false,
    rightIcon,
    inputColor = palette?.text?.body,
    placeholder,
    formikError,
    nextInputRef,
    defaultValue,
    formikTouched,
    inputBackground = 'transparent',
    placeholderColor = 'grey',
    borderColor = palette?.borders?.inputBorder,
    styleData = {} as StyleData,
    maxLength = 40,
    inputMode = 'text',
    textAlign = 'left',
    autoFocus = false,
    autoComplete = 'off',
    returnKeyType = 'next',
    autoCorrect = false,
    blurOnSubmit = false,
    autoCapitalize = 'none',
    keyboardType = 'default',
    secureTextEntry = false,
    iconColor = palette?.secondary?.main,
    imageIcon = null,
    cursorColor = palette?.secondary?.main,
    selectionColor = palette?.secondary?.light,
    ...rest
  } = props;

  const [showPass, setShowPass] = useState(true);
  return (
    <TextInputWrapper width={width}>
      {title && (
        <InputLabel labelStyles={styleData?.labelStyles || {}}>
          {title}
        </InputLabel>
      )}
      <InputContainer
        left={leftIcon}
        right={rightIcon}
        borderColor={borderColor}
        inputBackground={inputBackground}
        secureTextEntry={secureTextEntry}
        error={formikTouched && formikError}>
        <LeftIconWrapper>
          {imageIcon?.left ? (
            <Image
              resizeMode={'cover'}
              source={imageIcon?.left?.icon}
              style={{
                width: AppTheme.WP(imageIcon?.left?.width),
                height: AppTheme.WP(imageIcon?.left?.height),
              }}
            />
          ) : (
            leftIcon && (
              <Icon
                name={leftIcon}
                size={AppTheme.WP(5)}
                color={disabled ? palette?.grey?.[500] : iconColor}
              />
            )
          )}
        </LeftIconWrapper>

        <Input
          {...rest}
          ref={ref}
          cursorColor={cursorColor}
          selectionColor={selectionColor}
          onBlur={onBlur}
          icon={leftIcon}
          onFocus={onFocus}
          color={inputColor}
          imageIcon={imageIcon}
          editable={!disabled}
          maxLength={maxLength}
          autoFocus={autoFocus}
          inputMode={inputMode}
          textAlign={textAlign}
          formikError={formikError}
          placeholder={placeholder}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          blurOnSubmit={blurOnSubmit}
          enterKeyHint={returnKeyType}
          formikTouched={formikTouched}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry && showPass}
          placeholderTextColor={placeholderColor}
          onSubmitEditing={() => {
            if (nextInputRef && nextInputRef.current) {
              nextInputRef.current.focus();
            } else if (
              returnKeyType === 'done' &&
              ref &&
              typeof ref !== 'function'
            ) {
              ref.current?.blur();
              submit?.();
            } else {
              onBlur?.();
            }
          }}
        />

        <RightIconWrapper>
          {imageIcon?.right ? (
            <Image
              resizeMode={'cover'}
              source={imageIcon?.right?.icon}
              style={{
                width: AppTheme.WP(imageIcon?.right?.width),
                height: AppTheme.WP(imageIcon?.right?.height),
              }}
            />
          ) : (
            rightIcon &&
            !secureTextEntry && (
              <Icon
                name={rightIcon}
                color={disabled ? palette?.grey?.[500] : iconColor}
                size={AppTheme.WP(5.5)}
              />
            )
          )}

          {secureTextEntry && !rightIcon && (
            <Pressable onPress={() => setShowPass(!showPass)}>
              <Icon
                size={AppTheme.WP(5)}
                name={showPass ? 'eye-off' : 'eye'}
                color={
                  disabled
                    ? palette?.grey?.[500]
                    : showPass
                      ? iconColor
                      : palette?.primary?.dark
                }
              />
            </Pressable>
          )}
        </RightIconWrapper>
      </InputContainer>

      {formikTouched && formikError && (
        <ErrorTextWrapper>
          <ErrorText style={styles.errorText}>{formikError}</ErrorText>
        </ErrorTextWrapper>
      )}
    </TextInputWrapper>
  );
});

const styles = StyleSheet.create({
  errorText: {
    borderRadius: AppTheme.WP(5),
    paddingHorizontal: AppTheme.WP(2),
    paddingVertical: AppTheme.WP(1),
  },
});

export {TextInput};
