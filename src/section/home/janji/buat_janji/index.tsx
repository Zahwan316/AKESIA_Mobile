import { ScrollView } from 'react-native';
import JanjiScreenLayout from '../layout';
import ImageCardItemComponent from '../component/card-img-item';
import { useNavigation } from '@react-navigation/native';
import { getJenisPelayanan } from '../../../../api/data/jenis_pelayanan';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BASE_URL } from '../../../../constants/baseurl';

type apiResponse = {
  'id': number,
  'img_id': number,
  'nama': string,
  'keterangan': string,
  'created_at': string,
  'updated_at': string,
  'deleted_at': string | null,
  'upload': {
      'id': number,
      'user_id': number,
      'path': string,
      'created_at': string,
      'updated_at': string
  }
}

const BuatJanjiSection = () => {
  const navigation = useNavigation<any>();
  const { data: jenisPelayananData} = useQuery({
      queryKey: ['getJenisPelayanan'],
      queryFn: getJenisPelayanan,
  });

  const handleScreen = (screen: string, subItem: string, id: number) => {
    navigation.navigate(screen, {subItem: subItem, jenisPelayananId: id});
  };

  useEffect(() => {
    console.log(BASE_URL);
  },[]);

  return(
    <JanjiScreenLayout
      title="Buat Janji"
    >
      <ScrollView style={{paddingTop: 8}}>
        {
          jenisPelayananData?.data.map((item: apiResponse, index: number) => (
            <ImageCardItemComponent
              title={item.nama}
              img={{uri: `${BASE_URL}${item.upload.path}`}}
              key={index + item.id}
              handlePress={() => handleScreen('BuatJanjiDetail', item.nama, item.id)}
            />
          ))
        }
      </ScrollView>
    </JanjiScreenLayout>
  );
};

export default BuatJanjiSection;
