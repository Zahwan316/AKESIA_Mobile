import { JSX, memo, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Atau FontAwesome, MaterialIcons dll.
import textInputProps from '../../../type/input/text';

const InputComponent = ({
  width,
  height,
  backgroundColor,
  label,
  name,
  message,
  placeholder,
  type,
  textColor,
  labelColor,
  border,
  control,
  errors,
  disabled,
  initialValue,
  borderColor,
  maxLength,
  minLength,
}: textInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const sanitizeInput = (value: string) => {
    return value
      .replace(/[<>]/g, '')
      .replace(/["']/g, '')
      .replace(/\s{2,}/g, ' ');
  };

  const isPasswordField = type === 'password';

  return (
    <View style={[style.container, { width: width, height: height }]}>
      <Text style={[style.label, { color: labelColor, fontWeight: 'bold' }]}>
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={{
          required: message || '',
        }}
        defaultValue={initialValue || ''}
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={style.inputWrapper}>
            <TextInput
              style={[
                style.input,
                {
                  backgroundColor: backgroundColor,
                  color: textColor,
                  borderWidth: border,
                  borderColor: borderColor,
                  textAlignVertical: type === 'textarea' ? 'top' : 'center',
                  height: type === 'textarea' ? 150 : 'auto',
                  opacity: disabled ? 0.45 : 1,
                  paddingRight: isPasswordField ? 40 : 12, // space for icon
                },
              ]}
              onChangeText={(text) => onChange(sanitizeInput(text))}
              value={value}
              placeholder={placeholder}
              secureTextEntry={isPasswordField && !showPassword}
              multiline={type === 'textarea'}
              numberOfLines={type === 'textarea' ? 6 : 1}
              keyboardType={type === 'number' ? 'numeric' : 'default'}
              editable={!disabled}
              maxLength={maxLength}
              onBlur={onBlur}
            />

            {isPasswordField && (
              <TouchableOpacity
                style={style.icon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {errors && errors[name] && (
        <Text style={{ color: 'red' }}>{errors[name]?.message}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default memo(InputComponent);
