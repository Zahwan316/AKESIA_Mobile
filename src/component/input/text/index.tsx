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
  errors
}: textInputProps): JSX.Element => {
  return (
    <View style={[style.container, {width: width, height: height}]}>
      <Text style={[style.label, {color: labelColor, fontWeight: 'bold'}]}>
        {label}
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={[
              style.input,
              {
                backgroundColor: backgroundColor,
                color: textColor,
                borderWidth: border,
                textAlignVertical: type === 'textarea' ? 'top' : 'center',
                height: type === 'textarea' ? 150 : 'auto',
              }]}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={type === 'password' ? true : false}
            multiline={type === 'textarea'}
            numberOfLines={type === 'textarea' ? 4 : 1}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
          />
        )}
        name={name}
        rules={message ? { required: message } : {}}
        defaultValue={''}
      />
      {errors?.name && <Text style={{ color: 'red' }}>{errors?.name.message}</Text>}
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
