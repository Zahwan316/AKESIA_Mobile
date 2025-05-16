import { JSX, use } from 'react';
import { Image, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { MAIN_COLOR } from '../../../../../../../constants/color';
import useDimension from '../../../../../../../hooks/useDimensions';

type props = {
  title: string,
}

const width = useDimension();

const HeaderDropdownComponent = ({ title }: props): JSX.Element => {
  return(
    <View style={style.mainContainer}>
      <View style={style.imgContainer}>
        <Image
          source={require('../../../../../../../assets/icon/phone.png')}
          style={{width: '80%', height: '80%'}}
          resizeMode="contain"
        />
      </View>
      <View style={style.textContainer}>
        <Text style={{fontWeight: 'bold', color:'#fff'}}>{title}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: width * 0.55,
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: '#d1d1d1',
    marginBottom: 16,
    flex: 1,
  },
  imgContainer: {
    width: '20%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: MAIN_COLOR,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default HeaderDropdownComponent;
