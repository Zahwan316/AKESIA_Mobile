import { JSX, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

type props = {
  customstyle?: any,
  innerstyle?: any,
}

const RadioInputComponent = ({ customstyle, innerstyle }: props): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePressed = () => {
    setIsSelected(!isSelected);
  };

  return(
    <TouchableOpacity
      style={[style.outer, customstyle]}
      onPress={handlePressed}
    >
      {
        isSelected ?
          <View style={[style.inner, innerstyle]} />
          :
          null
      }
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  outer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export default RadioInputComponent;
