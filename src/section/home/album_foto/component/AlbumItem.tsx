import { JSX } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MAIN_COLOR } from "../../../../constants/color";
import { handleDeleteApi } from "../../../../api/handleDeleteApi";
import { modalInfo } from '../../tambah_anak/index';
import { useNavigation } from "@react-navigation/native";
import useAlbumFotoStore from "../../../../state/album_foto";

type propsPage = {
  title: string;
  onPress: () => void;
  url: string,
  id: number,
  setModal: any,
  setSuccess: any,
  setModalInfo: any,
  handleEdit: () => void
}

const AlbumItemComponent = ({title, onPress, url, id, setModal, setSuccess, setModalInfo, handleEdit}: propsPage):JSX.Element => {
  const handleAlert = () => {
    Alert.alert('Pemberitahuan',
      'Silahkan pilih ingin menghapus atau edit data ini',[
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          onPress: handleHapus,
        },
        {
          text: 'Edit',
          onPress: handleEdit,
        },
      ]
    );
  };

  const handleHapus = async() => {
    Alert.alert('Peringatan!',
      'Apakah anda yakin ingin menghapus data ini?',
      [
        {
          text: 'Ya, hapus data',
          onPress:handleHapusDataToApi,
        },
        {
          text: 'Batal',
        },
      ]
    );
  };

  const handleHapusDataToApi = async() => {
    handleDeleteApi(`${url}${id}`, setSuccess, setModal, setModalInfo);
  };

  return(
    <TouchableOpacity style={Style.mainContainer} onPress={onPress} onLongPress={handleAlert}>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR,
    width: '100%',
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default AlbumItemComponent;
