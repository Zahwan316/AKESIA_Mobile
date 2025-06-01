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
import { ChangePrice } from '../../../../../utils/changePrice';
import LoadingIndicator from '../../../../../component/loading';
import { getData } from '../../../../../api/data/getData';

export type PelayananResponse = {
  id: number;
  jenis_layanan_id: number;
  nama: string;
  harga: number;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  jenis_layanan: {
    id: number;
    imgId: number;
    nama: string;
    keterangan: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

const iconData = [
  {
    jenis_layanan: 'Baby Spa dan Message',
    img: '../../../../../assets/icon/babyspa.png',
  },
  {
    jenis_layanan: 'Persalinan',
    img: '../../../../../assets/icon/persalinan.png',
  },
  {
    jenis_layanan: 'Bidan Bunda',
    img: '../../../../../assets/icon/bunda.png',
  },
  {
    jenis_layanan: 'Periksa Hamil Nyaman',
    img: '../../../../../assets/icon/bunda.png',
  },
];

const searchItemRegex = /Periksa Hamil Nyaman/i;

const imgMap: {[key: string]: ImageSourcePropType} = {
  'Baby Spa dan Massage': require('../../../../../assets/icon/babyspa.png'),
  'Persalinan': require('../../../../../assets/icon/persalinan.png'),
  'Bidan Bunda': require('../../../../../assets/icon/bunda.png'),
  'Periksa Hamil Nyaman': require('../../../../../assets/icon/bunda.png'),
};

const BuatJanjiDetailSection = (): JSX.Element => {
  const route = useRoute();
  const {subItem, jenisPelayananId} = route.params as {subItem: string, jenisPelayananId: number};
  const { data: pelayananData} = useQuery({
    queryKey: ['getPelayanan'],
    queryFn: () => getPelayanan('layanan/pelayanan'),
  });
  const {data: jenisPelayananData} = useQuery({
    queryKey: ['getJenisPelayananData', jenisPelayananId],
    queryFn: () => getData(`layanan/jenis_pelayanan/${jenisPelayananId}`),
  });
  const navigation = useNavigation<any>();

  //filter data per kategori
  const filteredPelayananData = pelayananData?.data.filter((item: PelayananResponse) => {
    if(searchItemRegex.test(item.jenis_layanan?.nama)){
      return item.harga === 0 && item.jenis_layanan_id === jenisPelayananId;
    }
    else{
      return item.jenis_layanan_id === jenisPelayananId;
    }
  }) || [];

  const handleToPemesanan = (pelayananId: number) => {
    navigation.navigate('PemesananJanji', {
      pelayananId: pelayananId,
      jenisPelayananId: jenisPelayananId,
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
              source={imgMap[subItem]}
              style={{width: '80%', height: '80%', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
              resizeMode="cover"
            />
          </View>
          <View style={style.textContainer}>
            <Text style={{fontSize: 14, color: '#fff'}}>{formattedDate}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>{subItem}</Text>
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
                        key={index + item.id}
                        title={item.nama}
                        code={item.keterangan}
                        harga={ChangePrice(item.harga, item.nama, item.kuantitas)}
                        handlePress={() => handleToPemesanan(item.id)}
                        jenis_layanan={item.jenis_layanan_id}
                        img={imgMap[subItem]}
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
