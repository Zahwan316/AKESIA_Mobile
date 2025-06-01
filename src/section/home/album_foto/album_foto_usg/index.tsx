import { JSX, useCallback, useEffect } from 'react';
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

const AlbumFotoUsgSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const router = useRoute();
  const janinId = useAlbumFotoStore((state) => state.janinId);
  const setUsgId = useAlbumFotoStore((state) => state.setUsgId);
  const setUsgTitleName = useAlbumFotoStore((state) => state.setUsgTitleName);
  const {screenBeforeName} = router.params as {screenBeforeName: string};
  const handleScreen = (screen: string, screenBeforeName: string, usgId: number, UsgTitleName: string) => {
    setUsgId(usgId);
    setUsgTitleName(UsgTitleName);
    navigator.navigate(screen, {screenBeforeName: screenBeforeName});
  };
  const {data: usgData, refetch} = useQuery({
    queryKey: ['usgData'],
    queryFn: () => getData(`album_foto_usg/getByJaninId/${janinId}`),
  });

  useEffect(() => {
    console.log(janinId);
    console.log(checkIsDataFormNull(usgData?.data))
  }, [usgData]);

   useFocusEffect(
    useCallback(() => {refetch();},[refetch])
  );

  return(
    <FotoScreenLayout
      title="Album Foto Kita"
      modalVisible={false}
    >
      <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            Usg Ke berapa nih?
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
