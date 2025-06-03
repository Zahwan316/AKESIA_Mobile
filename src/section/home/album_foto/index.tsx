import { JSX, useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import FotoScreenLayout from './layout';
import AlbumItemComponent from './component/AlbumItem';
import EmptyDataComponent from '../../../component/empty';
import { checkIsDataFormNull } from '../../../utils/checkDataIsNull';
import { getData } from '../../../api/data/getData';
import FloatingIcon from '../../../component/floatingIcon';
import AlbumImageItemComponent from './component/AlbumImgItem';
import useAlbumFotoStore from '../../../state/album_foto';
import PopupImageComponent from './component/Popup';
import useComponentStore from '../../../state/component';

const AlbumFotoSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const router = useRoute();
  const janinId = useAlbumFotoStore((state) => state.janinId);
  const usgId = useAlbumFotoStore((state) => state.usgId);
  const usgTitleName = useAlbumFotoStore((state) => state.usgTitleName);
  const setFotoId = useAlbumFotoStore((state) => state.setFotoId);
  const setPopup = useComponentStore((state) => state.setPopup);
  const setPopupImage = useComponentStore((state) => state.setPopupImg);
  const { screenBeforeName } = router.params as {screenBeforeName: string};
  const handleScreen = (screen: string, screenBeforeName?: string, usgId?: number, usgTitleName?: string) => {
    navigator.navigate(screen, {screenBeforeName: screenBeforeName, usgId: usgId, usgTitleName: usgTitleName});
  };
  const {data: AlbumFotoData, refetch} = useQuery({
    queryKey: ['albumFoto'],
    queryFn: () => getData(`album_foto/getByUsgId/${usgId}`),
  });

  //Open Popup and Set Image Id Every Click Image
  const handleImage = (id: number, image: string) => {
    setFotoId(id);
    setPopup(true);
    setPopupImage(image);
  };

  useEffect(() => {
    console.log(usgId);
  }, [usgId]);

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
            {usgTitleName}
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between'}}>
            {
              AlbumFotoData?.data?.length === 0 ?
              <View style={{width:'100%', borderWidth:0, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image
                  source={require('../../../assets/icon/image_blank.png')}
                  style={{width: 200, height: 200, marginBottom: 12}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
                  Upload hasil usg Kita yuk..
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'normal'}}>
                  Album masih kosong nih
                </Text>
              </View>
              :
              AlbumFotoData?.data?.map((item: any, index: number) => {
                return(
                  <AlbumImageItemComponent
                    key={index}
                    title={item.judul}
                    onPress={() => handleImage(item.id, item.uploads?.path)}
                    img={item.uploads?.path}
                  />
                );
              })
            }

          </View>
        </ScrollView>
        <FloatingIcon
          handlePress={() => handleScreen('AlbumFotoForm', 'AlbumFoto', usgId, usgTitleName)}
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

export default AlbumFotoSection;
