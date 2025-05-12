import { JSX, useEffect, useState } from "react";
import JanjiScreenLayout from "../layout";
import { ScrollView, View } from "react-native";
import ButtonComponent from "../../../../component/button";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getPendaftaranUser } from "../../../../api/data/pendaftaran";
import QueueItemComponent from "../component/queue-item";

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
  'jam_ditentukan': string,
  'created_at': string,
  'updated_at': string,
  'pelayanan': {
      'id': number,
      'jenis_layanan_id': number,
      'nama': string,
      'harga': number,
      'kuantitas': number,
      'form_id': number,
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
    title: 'Disetujui',
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
const ListJanjiSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Menunggu Konfirmasi');
  const navigation = useNavigation<any>();
  const { data: pendaftaranData} = useQuery({
    queryKey: ['pendaftaran'],
    queryFn: () => getPendaftaranUser('pendaftaran'),
  });

  const handleCurrMenu = (title: string) => {
    setCurrMenu(title);
  };

  const handleScreen = (screen: string, formId?: string | number, pendaftaranId?: string | number) => {
    navigation.navigate(screen, {formId: formId, pendaftaranId: pendaftaranId});
  };

  useEffect(() => {
    console.log(pendaftaranData);
  }, [pendaftaranData]);

  return(
    <JanjiScreenLayout
      title="List Janji"
    >
      <View>
        <View style={{flexDirection: 'row',flexWrap: 'wrap',gap: 12, justifyContent: 'space-between', marginBottom: 32}}>
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
        <ScrollView style={{position: 'relative', height: '80%'}}>
        {
          pendaftaranData?.data.map((item: apiResponse, index: number) => (
            <QueueItemComponent
              description={item.pelayanan?.keterangan}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id)}
              handleDelete={() => {}}
              img={require('../../../../assets/icon/baby.png')}
              time={item.jam_ditentukan === null ? 'Segera Diinformasikan' : item.jam_ditentukan}
              title={item.pelayanan?.nama}
              key={index + item.id}
              status={item.status}
              role="bidan"
              handlePeriksa={() => handleScreen('Pemeriksaan', item.pelayanan.form_id, item.id)}
            />

          ))
        }
      </ScrollView>
      </View>
    </JanjiScreenLayout>
  );
}

export default ListJanjiSection;
