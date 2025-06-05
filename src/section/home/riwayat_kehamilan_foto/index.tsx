import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AlbumImageItemComponent from '../album_foto/component/AlbumImgItem';
import { useQuery } from '@tanstack/react-query';
import useAlbumFotoStore from '../../../state/album_foto';
import { getData } from '../../../api/data/getData';
import FotoScreenLayout from '../album_foto/layout';
import FloatingIcon from '../../../component/floatingIcon';
import { useCallback, useEffect } from 'react';
import EmptyDataComponent from '../../../component/empty';

const RiwayatKehamilanFotoSection = () => {
  const navigator = useNavigation<any>();
  const router = useRoute();
  const RiwayatKehamilanGroupId = useAlbumFotoStore((state) => state.riwayatKehamilanGroupId);
  const RiwayatKehamilanTitleName = useAlbumFotoStore((state) => state.riwayatKehamilanTitleName);
  const {
    screenBeforeName,
  } = router.params as {screenBeforeName: string};

  const {data: RiwayatKehamilanFotoData, refetch} = useQuery({
    queryKey: ['RiwayatKehamilanFotoData'],
    queryFn: () => getData(`riwayat_kehamilan_foto/getByGroupId/${RiwayatKehamilanGroupId}`),
  });

  const handleScreen = (screen: string, screenBeforeName: string, id: number) => {
    navigator.navigate(screen, {
      screenBeforeName: screenBeforeName,
    });
  };

  useFocusEffect(
    useCallback(() => {refetch();},[refetch])
  );

  return(
    <FotoScreenLayout
      modalVisible={false}
      title='Riwayat Kehamilan'
    >
      <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            {RiwayatKehamilanTitleName}
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between'}}>
            {
              RiwayatKehamilanFotoData?.data?.length === 0 ?
              <EmptyDataComponent
                customTextHeader='Oops!! Buku KIA masih kosong'
                customTextDescription='Belum ada nih fotonya tambah yuk!'
              />
              :
              RiwayatKehamilanFotoData?.data?.map((item: any, index: number) => {
                return(
                  <AlbumImageItemComponent
                    key={index}
                    title={item.nama}
                    //onPress={() => handleScreen('AlbumFoto', 'AlbumFotoUsg', item.id)}
                    img={item.upload?.path}
                  />
                );
              })
            }

          </View>
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('RiwayatKehamilanForm', 'RiwayatKehamilanFoto')}
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

export default RiwayatKehamilanFotoSection;
