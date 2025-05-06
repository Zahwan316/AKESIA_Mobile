import { JSX, useEffect, useState } from 'react';
import { View } from 'react-native';
import JanjiScreenLayout from '../layout';
import ButtonComponent from '../../../../component/button';
import QueueItemComponent from '../component/queue-item';
import { ScrollView } from 'react-native';
import FloatingIcon from '../../../../component/floatingIcon';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPendaftaranUser } from '../../../../api/data/pendaftaran';

type button = {
  title: string,
  onPress: () => void,
  color: string
}

type apiResponse = {
  'id': number,
  'ibu_id': number,
  'bidan_id': number | null,
  'pelayanan_id': number,
  'tanggal_pendaftaran': string,
  'jam_pendaftaran': null | string,
  'status': 'Menunggu Konfirmasi' | 'Disetujui' | 'Dibatalkan' | 'Selesai' | string,
  'keluhan': string,
  'nama_anak': string,
  'umur_anak': number,
  'created_at': string,
  'updated_at': string,
  'pelayanan': {
      'id': number,
      'jenis_layanan_id': number,
      'nama': string,
      'harga': number,
      'kuantitas': number,
      'keterangan': string,
      'created_at': number,
      'updated_at': number,
      'deleted_at': null
  }
}

const ButtonMenu: button[] = [
  {
    title: 'Menunggu Konfirmasi',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Selesai',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Dibatalkan',
    onPress: () => {},
    color: '#000',
  },
];

const JanjiKitaSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Menunggu Konfirmasi');
  const navigation = useNavigation<any>();
  const { data: pendaftaranUserData} = useQuery({
    queryKey: ['getCurrUserPendaftaran'],
    queryFn: () => getPendaftaranUser('getCurrUserPendaftaran'),
  });

  const handleCurrMenu = (title: string) => {
    setCurrMenu(title);
  };

  const handleScreen = (screen: string, pelayananId?: string | number, pendaftaranId?: string | number) => {
    navigation.navigate(screen, {pelayananId: pelayananId, pendaftaranId: pendaftaranId});
  }; 

  /* useEffect(() => {
    console.log(pendaftaranUserData);
  },[]);  */

  return (
    <JanjiScreenLayout
      title="Janji Kita"
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32}}>
        {
          ButtonMenu.map((item, index) => (
            <ButtonComponent
              title={item.title}
              onPress={() => handleCurrMenu(item.title)}
              color={currMenu === item.title ? '#000' : '#D9D9D9'}
              key={index}
            />
          ))
        }
      </View>
      <ScrollView style={{position: 'relative', height: '50%'}}>
        {
          pendaftaranUserData?.data.map((item: apiResponse, index: number) => (
            currMenu === item.status &&
            <QueueItemComponent
              description={item.pelayanan?.keterangan}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id)}
              handleDelete={() => {}}
              img={require('../../../../assets/icon/baby.png')}
              time={item.jam_pendaftaran === null ? 'Segera Diinformasikan' : item.jam_pendaftaran}
              title={item.pelayanan?.nama}
              key={index + item.id}
              status={item.status}
            />

          ))
        }
      </ScrollView>
      <FloatingIcon
        handlePress={() => handleScreen('BuatJanji')}
      />
    </JanjiScreenLayout>
  );
};



export default JanjiKitaSection;
