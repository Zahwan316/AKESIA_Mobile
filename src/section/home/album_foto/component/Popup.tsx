import { JSX, useEffect } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import useComponentStore from '../../../../state/component';
import { BASE_URL } from '../../../../constants/baseurl';
import useAlbumFotoStore from '../../../../state/album_foto';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const PopupImageComponent = (): JSX.Element => {
  const popupImage = useComponentStore((state) => state.popup_img);
  const popup = useComponentStore((state) => state.popup);
  const setPopupImage = useComponentStore((state) => state.setPopupImg);
  const setPopup = useComponentStore((state) => state.setPopup);
  const fotoId = useAlbumFotoStore((state) => state.fotoId);
  const setFotoId = useAlbumFotoStore((state) => state.setFotoId);

  const handlePopup = () => {
    setPopupImage('');
    setFotoId(0);
    setPopup(false);
  };

  const handleDelete = () => {
    
  };

  useEffect(() => {
    console.log(fotoId);
  }, [fotoId]);

  return(
    <TouchableOpacity style={[Style.mainContainer, {display: popup ? 'flex' : 'none'}]} onPress={handlePopup}>
      <View style={Style.mainContent}>
        <Image
          source={{uri: `${BASE_URL}${popupImage}`}}
          style={{width: '100%', height: '100%'}}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <View style={Style.buttonContainer}>
          <TouchableOpacity style={[Style.button, {backgroundColor: '#0a61d9'}]}>
            <Icon name='pencil' size={24} color={'#fff'}/>
          </TouchableOpacity>
          <TouchableOpacity style={[Style.button, {backgroundColor: '#c92d0b'}]}>
            <Icon name='trash' size={24} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#10101055',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    width: '75%',
    height: '60%',
  },
  button: {
    width: '25%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  buttonContainer:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PopupImageComponent;
