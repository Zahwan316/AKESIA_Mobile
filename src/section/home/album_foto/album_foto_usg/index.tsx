import { JSX, useCallback, useEffect, useState } from 'react';
import FotoScreenLayout from '../layout';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AlbumItemComponent from '../component/AlbumItem';
import FloatingIcon from '../../../../component/floatingIcon';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import { checkIsDataFormNull } from '../../../../utils/checkDataIsNull';
import EmptyDataComponent from '../../../../component/empty';
import useAlbumFotoStore from '../../../../state/album_foto';
import { modalInfo } from '../../tambah_anak';
import ModalComponent from '../../../../component/modal';
import TipsComponent from '../../../../component/tips';

const AlbumFotoUsgSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const router = useRoute();
  const janinId = useAlbumFotoStore((state) => state.janinId);
  const setUsgId = useAlbumFotoStore((state) => state.setUsgId);
  const setUsgTitleName = useAlbumFotoStore((state) => state.setUsgTitleName);
  const setCurrUSG = useAlbumFotoStore((state) => state.setcurrUSG);
  const currUSG = useAlbumFotoStore((state) => state.currUSG);
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: usgData, refetch} = useQuery({
    queryKey: ['usgData'],
    queryFn: () => getData(`album_foto_usg/getByJaninId/${janinId}`),
  });

  const handleScreen = (screen: string, screenBeforeName: string, usgId: number, UsgTitleName: string) => {
    setUsgId(usgId);
    setUsgTitleName(UsgTitleName);
    navigator.navigate(screen, {screenBeforeName: screenBeforeName});
  };

  const handleModal = () => {
    if(isSuccess){
      navigator.replace('AlbumFotoUsg');
    }
    setModal(!modal);
  };

  const handleEdit = (usgId: number) => {
    handleScreen('AlbumFotoForm', 'AlbumFotoUsg', usgId);
  };

  useEffect(() => {
    setCurrUSG(usgData?.data?.length + 1);
  }, [usgData, setCurrUSG]);

  useFocusEffect(
    useCallback(() => {refetch();},[refetch])
  );

  return(
    <FotoScreenLayout
      title="Album Foto Kita"
      modalVisible={false}
    >
      <ModalComponent
        handleModal={handleModal}
        modalVisible={modal}
        message={modalInfo.message}
        text={modalInfo.text}
        isSuccess={isSuccess}
      />
      <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            Pertumbuhan bayi ke berapa nih?
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          {
            usgData?.data?.length === 0 ?
              <EmptyDataComponent />
            :
            usgData?.data?.map((item: any, index: number) => {
              return(
                <AlbumItemComponent
                  key={index}
                  title={item.nama}
                  onPress={() => handleScreen('AlbumFoto', 'AlbumFotoUsg', item.id, item.nama)}
                  id={item.id}
                  setModal={setModal}
                  setSuccess={setSuccess}
                  setModalInfo={setModalInfo}
                  url="album_foto_usg/"
                  handleEdit={() => handleEdit(item.id)}
                />
              );
            })
          }
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('AlbumFotoForm', 'AlbumFotoUsg')}
        />
      </View>
    </FotoScreenLayout>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingVertical: 16,
  },
  headerContainer: {
    width: '100%',
    height: '8%',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    width: '100%',
    height: '90%',
    borderWidth: 0,
    position: 'relative',
  },
});

export default AlbumFotoUsgSection;
