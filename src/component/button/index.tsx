import React from 'react';
import { Button, StyleProp, StyleSheet, Text, TouchableOpacity } from 'react-native';

type props = {
  title: string,
  color: string,
  onPress: () => void,
  customstyle?: StyleProp<any>,
  disabled?: boolean,
  outlined?: boolean
}

const OPACITY_DISABLED = 0.5;
const OPACITY_ENABLED = 1;

const ButtonComponent = ({ title, color, onPress, customstyle, disabled, outlined }: props): React.JSX.Element => {
  return(
    <TouchableOpacity
      style={
        [
          style.main,
          customstyle,
          {
            backgroundColor: outlined ? '#fff' : color,
            opacity: disabled ? OPACITY_DISABLED : OPACITY_ENABLED,
            borderWidth: outlined ? 1 : 0,
            borderColor: outlined ? color : '#fff',
            },
          ]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[style.text, {color: outlined ? color : '#fff'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: '#6A7AFA',
    padding: 10,
    borderRadius: 16,
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
