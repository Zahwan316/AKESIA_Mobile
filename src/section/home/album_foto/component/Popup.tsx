import { JSX, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import useComponentStore from '../../../../state/component';
import { BASE_URL } from '../../../../constants/baseurl';
import useAlbumFotoStore from '../../../../state/album_foto';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { handleDeleteApi } from '../../../../api/handleDeleteApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AlbumFotoDeleteRoute } from '../../../../data/album_foto_delete_route';
import { modalInfo } from '../../tambah_anak';
import ModalComponent from '../../../../component/modal';
import text from '../../../../component/input/text';

type props = {
  item_id?: string,
}

const PopupImageComponent = (props: props): JSX.Element => {
  const popupImage = useComponentStore((state) => state.popup_img);
  const popup = useComponentStore((state) => state.popup);
  const setPopupImage = useComponentStore((state) => state.setPopupImg);
  const setPopup = useComponentStore((state) => state.setPopup);
  const fotoId = useAlbumFotoStore((state) => state.fotoId);
  const setFotoId = useAlbumFotoStore((state) => state.setFotoId);
  const route = useRoute();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const urlDelete = AlbumFotoDeleteRoute.find((item) => item.nameScreen === route.name);
  const navigator = useNavigation<any>();

  const handlePopup = () => {
    setPopupImage('');
    setFotoId(0);
    setPopup(false);
  };

  const handleDelete = async() => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menghapus data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: handleDeleteDataToApi,
        },
      ]
    );
  };

  const handleDeleteDataToApi = async() => {
    handleDeleteApi(`${urlDelete?.url}${fotoId}`, setSuccess, setModal, setModalInfo);
  };

  const handleModal = () => {
    if(isSuccess){
      handlePopup();
      navigator.replace(route.name, route.params);
    }
    setModal(!modal);
  };

  useEffect(() => {
    console.log(AlbumFotoDeleteRoute.find((item) => item.nameScreen === route.name));
  }, [route]);

  return(
    <>
      {
        popup ?
        <TouchableOpacity style={[Style.mainContainer]} onPress={handlePopup}>
          <ModalComponent
            handleModal={handleModal}
            isSuccess={isSuccess}
            message={modalInfo.message}
            text={modalInfo.text}
            modalVisible={modal}
          />
          <View style={Style.mainContent}>
            <View style={Style.textContent}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Klik untuk menutup</Text>
            </View>
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
              <TouchableOpacity style={[Style.button, {backgroundColor: '#c92d0b'}]} onPress={handleDelete}>
                <Icon name="trash" size={24} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        : null
      }
  
    </>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#10101099',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 15,
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
  textContent: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PopupImageComponent;
