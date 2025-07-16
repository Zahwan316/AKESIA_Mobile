import { JSX } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MAIN_COLOR } from '../../../../../constants/color';

type props = {
  title: string,
  img: ImageSourcePropType,
  handlePress: () => void,
};

const ImageCardItemComponent = (props: props): JSX.Element => {
  return(
    <TouchableOpacity style={style.mainContainer} onPress={props.handlePress}>
      <View style={style.imgContainer}>
        <Image
          source={props.img}
          style={{width: '100%', height: '100%', borderRadius: 12}}
          resizeMode="cover"
        />
      </View>
      <View style={style.headerContainer}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 200,
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    marginBottom: 18,
  },
  imgContainer:{
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    height: '25%',
    display: 'flex',
    padding: 8,
    backgroundColor: '#10101075',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default ImageCardItemComponent;
