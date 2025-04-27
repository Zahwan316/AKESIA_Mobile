import { JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import { ColorValue, DimensionValue, StyleSheet, Text, TextInput, View } from "react-native";

type props = {
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  backgroundColor: ColorValue,
  onChange: () => void,
  value?: string,
  name: string,
  placeholder: string,
  message: string,
  type: string,
}

const InputComponent = ({ width, height, backgroundColor, label, name, message, placeholder, type }: props): JSX.Element => {
  const {control, handleSubmit, formState: { errors }} = useForm()

  return (
    <View style={[style.container, {width: width, height: height }]}>
      <Text style={style.label}>{label}</Text>
      <Controller
        control={control}
        render={({field : {onChange, value}}) => (
          <TextInput
            style={[style.input, {
                backgroundColor: backgroundColor,
                color: backgroundColor === '' ? '#fff' : '#000',
                borderWidth: backgroundColor === '' ? 1 : 0,
              },
            ]}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={type === 'password' ? true : false}
          />
        )}
        name={name}
        rules={{ required: message }}
        defaultValue={''}
        
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: 36,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  label: {
    marginBottom: 8,
  }
});

export default InputComponent;
