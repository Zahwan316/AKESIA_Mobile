import {JSX, memo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
  const sanitizeInput = (value: string) => {
    return value
      .replace(/[<>]/g, '')         // Hilangkan tag HTML/script
      .replace(/["']/g, '')         // Hilangkan kutip
      .replace(/\s{2,}/g, ' ')      // Hapus spasi berlebih
      /* .trim() */;                      // Hapus spasi awal/akhir
  };

  return (
    <View style={[style.container, {width: width, height: height}]}>
      <Text style={[style.label, {color: labelColor, fontWeight: 'bold'}]}>
        {label}
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, value, onBlur}}) => (
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
              }]}
            onChangeText={(text) => onChange(sanitizeInput(text))}
            value={value}
            placeholder={placeholder}
            secureTextEntry={type === 'password' ? true : false}
            multiline={type === 'textarea'}
            numberOfLines={type === 'textarea' ? 6 : 1}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            editable={!disabled}
            maxLength={maxLength}
            onBlur={onBlur}
          />
        )}
        name={name}
        //rules={message ? { required: message, maxLength: maxLength || 0, minLength: minLength || 0 } : {}}
       /*  rules={{
          required: message,
          maxLength: maxLength && {
            value: maxLength || 16,
            message: `Maksimal ${maxLength || 16} karakter`,
          },
          minLength: minLength
            && {
                value: minLength,
                message: `Minimal ${minLength} karakter`,
              },
        }} */
        rules={{
          required: message || '',
          /* minLength: {
            value: minLength,
            message: `Minimal ${minLength} karakter`,
          },
          ...(maxLength && {
            maxLength: {
              value: maxLength,
              message: `Maksimal ${maxLength} karakter`,
            },
          }), */
          /* ...(minLength && {
            minLength: {
              value: minLength,
              message: `Minimal ${minLength} karakter`,
            },
          }), */
        }}
        defaultValue={initialValue || ''}
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default memo(InputComponent);
