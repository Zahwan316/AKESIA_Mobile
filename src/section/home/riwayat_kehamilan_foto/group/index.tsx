import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FloatingIcon from '../../../../component/floatingIcon';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import AlbumItemComponent from '../../album_foto/component/AlbumItem';
import { useNavigation } from '@react-navigation/native';
import FotoScreenLayout from '../../album_foto/layout';
import EmptyDataComponent from '../../../../component/empty';
import useAlbumFotoStore from '../../../../state/album_foto';

const RiwayatKehamilanFotoGroupSection = () => {
  const navigator = useNavigation<any>();
  const setKehamilanGroupId = useAlbumFotoStore(
    (state) => state.setRiwayatkehamilanGroupId
  );
  const setKehamilanTitleName = useAlbumFotoStore(
    (state) => state.setRiwayatkehamilanTitleName
  )
  const { data: riwayatKehamilanGroupData } = useQuery({
    queryKey: ['riwayatKehamilanGroupData'],
    queryFn: () => getData(`riwayat_kehamilan_groups/getByUserId`),
  });

  const handleScreen = (screen: string, screenBeforeName: string, id: number, titleName: string) => {
    setKehamilanGroupId(id);
    setKehamilanTitleName(titleName);
    navigator.navigate(screen, {
      screenBeforeName: screenBeforeName,
    });
  };

  return (
    <FotoScreenLayout
      title="Riwayat Kehamilan"
      modalVisible={false}
    >
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
