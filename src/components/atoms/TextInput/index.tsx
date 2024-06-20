import React, {memo, useCallback, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {THEME} from '../../../theme';
import EyeOffIcon from '../../../../assets/icons/eye-off.svg';
import EyeOnIcon from '../../../../assets/icons/eye-on.svg';
import {useTranslation} from 'react-i18next';

interface TextInputProps {
  wrapperStyles?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  extraLabel?: string;
  helperText?: string;
  required?: boolean;
  error?: any;
  showErrorOnDemand?: boolean;
  showCount?: boolean;
  prefix?: JSX.Element;
}

export const TextInput: React.FC<TextInputProps & RNTextInputProps> = memo(
  ({
    wrapperStyles,
    inputStyle,
    label,
    extraLabel,
    helperText,
    required,
    error,
    showCount,
    value,
    autoComplete = 'off',
    showErrorOnDemand = false,
    prefix,
    ...props
  }) => {
    const {t} = useTranslation();

    const [eyeToggle, setEyeToggle] = useState(props.secureTextEntry);

    const Counter = useCallback(() => {
      return (
        <Text style={[THEME.typography.subHeading, styles.counterText]}>
          {`${
            value ? Number(value.length).toLocaleString() : 0
          }/${props.maxLength?.toLocaleString()} ${t('Characters remaining')}`}
        </Text>
      );
    }, [value, props.maxLength, t]);

    return (
      <View style={props.style}>
        {label && (
          <Text style={[styles.labelText]}>
            {label}
            {required && <Text style={styles.requiredColor}> *</Text>}
            {extraLabel && (
              <Text style={[styles.extraLabel]}>{extraLabel}</Text>
            )}
          </Text>
        )}
        <View
          style={[styles.wrapper, wrapperStyles, error && styles.errorBorder]}>
          <RNTextInput
            style={[styles.inputStyle, inputStyle]}
            value={value}
            maxLength={props.maxLength}
            autoComplete={autoComplete}
            {...props}
            placeholderTextColor={THEME.colors.grayDark}
            secureTextEntry={eyeToggle}
          />
          {props.secureTextEntry && (
            <View style={styles.secureTextStyle}>
              {eyeToggle ? (
                <EyeOffIcon
                  onPress={() => setEyeToggle(!eyeToggle)}
                  fill={THEME.colors.grayDark}
                />
              ) : (
                <EyeOnIcon
                  onPress={() => setEyeToggle(!eyeToggle)}
                  fill={THEME.colors.grayDark}
                />
              )}
            </View>
          )}
          {prefix}
        </View>
        <View style={styles.errorAndCount}>
          {(error || !showErrorOnDemand) && (
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.errorMessage, styles.errorColor]}>
                {error}
              </Text>
              {!error && helperText && (
                <Text style={[styles.errorMessage, styles.helper]}>
                  {helperText}
                </Text>
              )}
            </View>
          )}
          {showCount && <Counter />}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.grayDark,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: THEME.colors.white,
    textAlignVertical: 'center',
    height: 54,
    paddingVertical: 2,
  },
  inputStyle: {
    flex: 1,
    color: THEME.colors.black,
    height: '100%',
    paddingHorizontal: 20,
  },
  labelText: {
    alignSelf: 'flex-start',
    ...THEME.typography.captionBold,
  },
  errorColor: {
    color: THEME.colors.red,
  },
  errorBorder: {
    borderColor: THEME.colors.primary,
  },
  errorMessage: {
    ...THEME.typography.subHeading,
    marginVertical: 8,
    alignSelf: 'flex-end',
  },
  extraLabel: {
    ...THEME.typography.text,
    fontSize: 13,
    color: THEME.colors.grayDark,
  },
  requiredColor: {
    color: THEME.colors.primary,
  },
  errorAndCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterText: {color: THEME.colors.grayDark},
  secureTextStyle: {
    marginRight: 16,
  },
  helper: {
    color: THEME.colors.grayDark,
  },
});
