import { JSX } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants/baseurl';
import useComponentStore from '../../state/component';

type props = {
  item: any,
}

const { width } = Dimensions.get('window');

const SliderItem = (props: props): JSX.Element => {
  const setPopup = useComponentStore((state) => state.setPopup);
  const setPopupImg = useComponentStore((state) => state.setPopupImg);

  const handlePressPopUp = (url: string) => {
    setPopup(true);
    setPopupImg(url);
  };

  return(
    <TouchableOpacity style={Style.mainItem} onPress={() => handlePressPopUp(props.item.upload?.path)}>
      <Image
        source={{ uri: `${BASE_URL}${props.item.upload?.path}` }}
        style={Style.mainImg}
      />
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainItem: {
    gap: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    marginRight: 12,
  },
  mainImg: {
    width: width * 0.9,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default SliderItem;
