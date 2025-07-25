import { JSX } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MAIN_COLOR } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

type props = {
  handlePress: () => void
}

const FloatingIcon = ({ handlePress }: props): JSX.Element => {
  return(
    <TouchableOpacity style={style.mainButton} onPress={handlePress}>
      <Icon name="plus" size={18} color="#fff"/>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 32,
    bottom: verticalScale(30),
    elevation: 6, // Android shadow
    shadowColor: '#000',
  },
});

export default FloatingIcon;
