import { JSX, useEffect } from 'react';
import FotoScreenLayout from '../layout';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AlbumItemComponent from '../component/AlbumItem';
import FloatingIcon from '../../../../component/floatingIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import { checkIsDataFormNull } from '../../../../utils/checkDataIsNull';
import EmptyDataComponent from '../../../../component/empty';

const AlbumFotoUsgSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const router = useRoute();
  const {screenBeforeName, janinId} = router.params as {screenBeforeName: string, janinId: number};
  const handleScreen = (screen: string, screenBeforeName?: string, usgId?: number, janinId?: number, UsgTitleName?: string) => {
    navigator.navigate(screen, {screenBeforeName: screenBeforeName, usgId: usgId, janinId: janinId, usgTitleName: UsgTitleName});
  };
  const {data: usgData} = useQuery({
    queryKey: ['usgData'],
    queryFn: () => getData(`album_foto_usg/getByJaninId/${janinId}`),
  });

  useEffect(() => {
    console.log(usgData);
    console.log(checkIsDataFormNull(usgData?.data))
  }, [usgData]);

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
                  onPress={() => handleScreen('AlbumFoto', 'AlbumFotoUsg', item.id, 0 , item.nama)}
                />
              );
            })
          }
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('AlbumFotoForm', 'AlbumFotoUsg', 0, janinId)}
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
