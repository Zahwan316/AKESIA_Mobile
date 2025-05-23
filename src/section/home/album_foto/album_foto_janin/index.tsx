import { JSX, useEffect } from 'react';
import FotoScreenLayout from '../layout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AlbumItemComponent from '../component/AlbumItem';
import FloatingIcon from '../../../../component/floatingIcon';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';

const AlbumFotoJaninSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const handleScreen = (screen: string, screenBeforeName?: string, janinId?: number) => {
    navigator.navigate(screen, {screenBeforeName: screenBeforeName, janinId: janinId});
  };
  const {data: janinData} = useQuery({
    queryKey: ['janinData'],
    queryFn: () => getData('album_foto_janins/getByUserId'),
  });

  useEffect(() => {
    console.log(janinData);
  }, [janinData]);

  return(
    <FotoScreenLayout
      title="Album Foto Kita"
      modalVisible={false}
    >
      <View style={Style.mainContainer}>
        <View style={Style.headerContainer}>
          <Text style={Style.headerText}>
            Mau Upload USG Janin Ke Berapa Bu?
          </Text>
        </View>
        <ScrollView style={Style.itemContainer}>
          {
            janinData?.data === null ?
            <Text>
              Belum ada Data
            </Text>
            :
            janinData?.data?.map((item: any, index: number) => {
              return(
                <AlbumItemComponent
                  key={index}
                  title={item.nama}
                  onPress={() => handleScreen('AlbumFotoUsg', 'AlbumFotoJanin', item.id)}
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
