import { JSX, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import JanjiScreenLayout from '../layout';
import ButtonComponent from '../../../../component/button';
import QueueItemComponent, { style } from '../component/queue-item';
import { ScrollView } from 'react-native';
import FloatingIcon from '../../../../component/floatingIcon';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPendaftaranUser } from '../../../../api/data/pendaftaran';
import handleContentModal from '../../../../component/modal/function';
import axios from '../../../../api/axios';
import ModalComponent from '../../../../component/modal';
import { modalInfoType } from '../../../../type/modalInfo';
import EmptyDataComponent from '../../../../component/empty';

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
      'keterangan': string,
      'created_at': number,
      'updated_at': number,
      'deleted_at': null
  }
}

const ButtonMenu: button[] = [
  {
    title: 'Semua',
    onPress: () => {},
    color: '#000',
  },
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

const JanjiKitaSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Semua');
  const navigation = useNavigation<any>();
  const { data: pendaftaranUserData} = useQuery({
    queryKey: ['getCurrUserPendaftaran'],
    queryFn: () => getPendaftaranUser('getCurrUserPendaftaran'),
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfoType>({
    message: '',
    text: '',
  });

  const handleCurrMenu = (title: string) => {
    setCurrMenu(title);
  };

  const handleScreen = (screen: string, pelayananId?: string | number, pendaftaranId?: string | number) => {
    navigation.navigate(screen, {pelayananId: pelayananId, pendaftaranId: pendaftaranId});
  };

  const handleBatalkanJanji = async(pendaftaranId: number) => {
    const data = { status: 'Dibatalkan' };

    try{
      const response = await axios.put(`pendaftaran/${pendaftaranId}`, data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: 'Janji berhasil dibatalkan',
        text: 'Tutup',
      });
    }
    catch(e){
      console.log(e.response);
      setSuccess(false);
      handleContentModal({
        setModal,
        setModalInfo,
        message: e.response.data.message,
        text: 'Tutup',
      });
    }
  };

  const handleModal = () => {
    if(isSuccess){
      navigation.replace('JanjiKita');
    }
    setModal(!modal);
  };

  /* useEffect(() => {
    console.log(pendaftaranUserData);
  },[]);  */

  return (
    <JanjiScreenLayout
      title="Janji Kita"
    >
      <ModalComponent
        handleModal={handleModal}
        message={modalInfo.message}
        text={modalInfo.text}
        isSuccess={isSuccess}
        modalVisible={modal}
      />
      <View style={{flexDirection: 'row',flexWrap: 'wrap',gap: 12, justifyContent: 'flex-start', marginBottom: 32}}>
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
          pendaftaranUserData?.data.length === 0 ?
          <EmptyDataComponent
            customTextDescription="Belum ada janji nih, tambah yuk!"
          />
          :
          pendaftaranUserData?.data.map((item: apiResponse, index: number) => (
            (currMenu === 'Semua' || currMenu === item.status) &&
            <QueueItemComponent
              description={item.pelayanan?.keterangan}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id)}
              handleDelete={() => handleBatalkanJanji(item.id)}
              img={require('../../../../assets/icon/baby.png')}
              time={ item.status === 'Dibatalkan' ? 'Dibatalkan' : (item.jam_ditentukan === null ? 'Segera Diinformasikan' : item.jam_ditentukan)}
              title={item.pelayanan?.nama}
              key={index}
              status={item.status}
              role="user"
              pendaftaranId={item.id}
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
