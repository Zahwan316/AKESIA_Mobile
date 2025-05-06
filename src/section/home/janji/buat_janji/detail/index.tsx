import { JSX, useEffect } from 'react';
import JanjiKitaScreen from '../../../../../screen/JanjiKita';
import JanjiScreenLayout from '../../layout';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MAIN_COLOR } from '../../../../../constants/color';
import HeaderDropdownComponent from './component/headerDropdown';
import ChildDropdownComponent from './component/childDropdown';
import useDimension from '../../../../../hooks/useDimensions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formattedDate } from '../../../../../utils/date';
import { getPelayanan } from '../../../../../api/data/pelayanan';
import { useQuery } from '@tanstack/react-query';

type apiResponse = {
  'id': number,
  'jenis_layanan_id': number,
  'nama': string,
  'harga': number,
  'kuantitas': number,
  'keterangan': string,
}

const BuatJanjiDetailSection = (): JSX.Element => {
  const route = useRoute();
  const {subItem, jenisPelayananId} = route.params as {subItem: string, jenisPelayananId: number};
  const { data: pelayananData} = useQuery({
    queryKey: ['getPelayanan'],
    queryFn: () => getPelayanan('layanan/pelayanan'),
  });
  const navigation = useNavigation<any>();
  const filteredPelayananData = pelayananData?.data.filter((item) => item.jenis_layanan_id === jenisPelayananId) || [];

  const handleToPemesanan = (pelayananId: number) => {
    navigation.navigate('PemesananJanji', {
      pelayananId: pelayananId,
    });
  };

  return(
    <JanjiScreenLayout
      title="Buat Janji"
    >
      <ScrollView>
        <View style={style.mainHeaderContainer}>
          <View style={style.imgContainer}>
            <Image
              source={require('../../../../../assets/icon/bell-gray.png')}
              style={{width: '80%', height: '80%', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
              resizeMode="contain"
            />
          </View>
          <View style={style.textContainer}>
            <Text style={{fontSize: 14}}>{formattedDate}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{subItem}</Text>
          </View>
        </View>
        <View>
          {
            filteredPelayananData?.map((item: apiResponse, index: number) => (
              <>
              {/* {
                item.header != null ?
                <HeaderDropdownComponent
                  key={item.id + index}
                  title={item.header}
                />
                :
                null
              } */}
                {
                    <View>
                      <ChildDropdownComponent
                        key={item.id + index}
                        title={item.nama}
                        code={item.keterangan}
                        harga={item.harga}
                        handlePress={() => handleToPemesanan(item.id)}
                      />
                    </View>
                }
              </>
            ))
          }
        </View>
      </ScrollView>
    </JanjiScreenLayout>
  );
};

const style = StyleSheet.create({
  mainHeaderContainer: {
    width: '100%',
    minHeight: 72,
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 16,
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    flex: 1,
  },
  imgContainer: {
    width: '15%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    height: '100%',
    borderWidth: 0,
    flex: 1,
  },
});

export default BuatJanjiDetailSection;
