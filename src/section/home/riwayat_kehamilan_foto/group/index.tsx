import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FloatingIcon from '../../../../component/floatingIcon';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import AlbumItemComponent from '../../album_foto/component/AlbumItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FotoScreenLayout from '../../album_foto/layout';
import EmptyDataComponent from '../../../../component/empty';
import useAlbumFotoStore from '../../../../state/album_foto';
import { useCallback, useEffect, useState } from 'react';
import { modalInfo } from '../../tambah_anak';
import ModalComponent from '../../../../component/modal';

const RiwayatKehamilanFotoGroupSection = () => {
  const navigator = useNavigation<any>();
  const setKehamilanGroupId = useAlbumFotoStore(
    (state) => state.setRiwayatkehamilanGroupId
  );
  const setKehamilanTitleName = useAlbumFotoStore(
    (state) => state.setRiwayatkehamilanTitleName
  );
  const { data: riwayatKehamilanGroupData, refetch } = useQuery({
    queryKey: ['riwayatKehamilanGroupData'],
    queryFn: () => getData(`riwayat_kehamilan_groups/getByUserId`),
  });
  const setCurrKehamilan = useAlbumFotoStore(
    (state) => state.setcurrKehamilan
  );
  const currKehamilan = useAlbumFotoStore(
    (state) => state.currKehamilan
  );
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });

  //handle change screen
  const handleScreen = (screen: string, screenBeforeName: string, id: number, titleName: string) => {
    setKehamilanGroupId(id);
    setKehamilanTitleName(titleName);
    navigator.navigate(screen, {
      screenBeforeName: screenBeforeName,
    });
  };

  const handleModal = () => {
    if(isSuccess){
      navigator.replace('RiwayatKehamilanGroup');
    }
    setModal(!modal);
  };

  //set current kehamilan data to form
  useEffect(() => {
    setCurrKehamilan(riwayatKehamilanGroupData?.data?.length + 1);
    console.log('curr kehamilan = ', currKehamilan);
  }, [riwayatKehamilanGroupData, setCurrKehamilan, currKehamilan]);


  useFocusEffect(
    useCallback(() => {refetch();},[refetch])
  );

  return (
    <FotoScreenLayout
      title="Riwayat Kehamilan"
      modalVisible={false}
    >
      <ModalComponent
        handleModal={handleModal}
        modalVisible={modal}
        message={modalInfo.message}
        text={modalInfo.text}
        isSuccess
      />
        <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            Kehamilan ke berapa nih...
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          {
            riwayatKehamilanGroupData?.data?.length === 0 ?
            <EmptyDataComponent />
            :
            riwayatKehamilanGroupData?.data?.map((item: any, index: number) => {
              return(
                <AlbumItemComponent
                  key={index}
                  title={item.nama}
                  onPress={() => handleScreen('RiwayatKehamilanFoto', 'RiwayatKehamilanGroup', item.id, item.nama)}
                  id={item.id}
                  setModal={setModal}
                  setSuccess={setSuccess}
                  setModalInfo={setModalInfo}
                  url="riwayat_kehamilan_group/"
                />
              );
            })
          }
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('RiwayatKehamilanForm', 'RiwayatKehamilanGroup')}
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
    //position: 'relative',
    //flexWrap: 'wrap',
    //flexDirection: 'row',

  },
});

export default RiwayatKehamilanFotoGroupSection;
