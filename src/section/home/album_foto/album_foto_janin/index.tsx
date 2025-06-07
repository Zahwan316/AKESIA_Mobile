import { JSX, useCallback, useEffect, useState } from 'react';
import FotoScreenLayout from '../layout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AlbumItemComponent from '../component/AlbumItem';
import FloatingIcon from '../../../../component/floatingIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import useAlbumFotoStore from '../../../../state/album_foto';
import EmptyDataComponent from '../../../../component/empty';
import { modalInfo } from '../../tambah_anak';
import ModalComponent from '../../../../component/modal';

const AlbumFotoJaninSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const setJaninId = useAlbumFotoStore((state) => state.setJaninId);
  const setCurrJanin = useAlbumFotoStore((state) => state.setcurrJanin);
  const currJanin = useAlbumFotoStore((state) => state.currJanin);
  const handleScreen = (screen: string, screenBeforeName: string, janinId: number) => {
    setJaninId(janinId);
    navigator.navigate(screen, {screenBeforeName: screenBeforeName});
  };
  const {data: janinData, refetch} = useQuery({
    queryKey: ['janinData'],
    queryFn: () => getData('album_foto_janins/getByUserId'),
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });

  const handleModal = () => {
    if(isSuccess){
      navigator.replace('AlbumFotoJanin');
    }
    setModal(!modal);
  };

  const handleEdit = (id: number) => {
    setJaninId(id);
    handleScreen('AlbumFotoForm', 'AlbumFotoJanin', id);
  };

  useEffect(() => {
    setCurrJanin(janinData?.data?.length + 1);
  }, [janinData, setCurrJanin, currJanin]);

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
        isSuccess={isSuccess}
        message={modalInfo.message}
        text={modalInfo.text}
      />
      <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            Mau Upload USG Janin Ke Berapa Bu?
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          {
            janinData?.data?.length === 0 ?
            <EmptyDataComponent />
            :
            janinData?.data?.map((item: any, index: number) => {
              return(
                <AlbumItemComponent
                  key={index}
                  title={item.nama}
                  onPress={() => handleScreen('AlbumFotoUsg', 'AlbumFotoJanin', item.id)}
                  id={item.id}
                  setSuccess={setSuccess}
                  setModal={setModal}
                  setModalInfo={setModalInfo}
                  url="album_foto_janin/"
                  handleEdit={() => handleEdit(item.id)}
                />
              );
            })
          }
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('AlbumFotoForm', 'AlbumFotoJanin')}
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

export default AlbumFotoJaninSection;
