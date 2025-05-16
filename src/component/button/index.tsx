import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

type props = {
  title: string,
  color: string,
  onPress: () => void,
  customstyle?: any,
  disabled?: boolean
}

const OPACITY_DISABLED = 0.5;
const OPACITY_ENABLED = 1;

const ButtonComponent = ({ title, color, onPress, customstyle, disabled }: props): React.JSX.Element => {
  return(
    <TouchableOpacity
      style={
        [style.main, customstyle, {backgroundColor: color, opacity: disabled ? OPACITY_DISABLED : OPACITY_ENABLED} ]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={style.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: '#6A7AFA',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#101010',
    elevation: 2,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonComponent;
