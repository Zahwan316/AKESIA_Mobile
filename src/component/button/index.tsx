import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

type props = {
  title: string,
  color: string,
  onPress: () => void,
  customstyle?: any
}

const ButtonComponent = ({ title, color, onPress, customstyle }: props): React.JSX.Element => {
  return(
    <TouchableOpacity
      style={
        [style.main, customstyle ]
      }
      onPress={onPress}
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
  },
  text: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 18,
  }
});

export default ButtonComponent;
