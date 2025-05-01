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
          style={{width: '100%', height: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
          resizeMode="cover"
        />
      </View>
      <View style={style.headerContainer}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 160,
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    marginBottom: 18,
  },
  imgContainer:{
    width: '100%',
    height: '70%',
  },
  headerContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    padding: 8,
    backgroundColor: '#d9d9d9',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
  },
});

export default ImageCardItemComponent;
