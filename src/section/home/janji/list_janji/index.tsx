import { JSX, useCallback, useEffect, useState } from 'react';
import JanjiScreenLayout from '../layout';
import { ScrollView, Text, View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import QueueItemComponent from '../component/queue-item';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { useForm } from 'react-hook-form';
import { formattedDateDataWithoutHour } from '../../../../utils/date';
import { MAIN_COLOR } from '../../../../constants/color';
import { getData } from '../../../../api/data/getData';
import handleContentModal from '../../../../component/modal/function';
import axios from '../../../../api/axios';
import { modalInfoType } from '../../../../type/modalInfo';
import ModalComponent from '../../../../component/modal';
import useUserStore from '../../../../state/user';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const ListJanjiSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const [tanggalFilter, setTanggalFilter] = useState<string | null>(null);
  const { data: pemeriksaanUserData, refetch} = useQuery({
    queryKey: ['pemeriksaan', tanggalFilter],
    queryFn: () => getData(tanggalFilter ? `pemeriksaan?tanggal=${tanggalFilter}` : `pemeriksaan?tanggal=${formattedDateDataWithoutHour(Date.now())}`),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfoType>({
    message: '',
    text: '',
  });
  const currBidanData = useUserStore((state) => state.bidan);
  const [filteredPemeriksaanData, setFilteredPemeriksaanData] = useState<PemeriksaanApiResponse[]>([]);
  const currUser = useUserStore((state) => state.user);

  /* Function Initiation */
  const handleScreen = (screen: string, formId?: string | number, pemeriksaanId?: string | number, pemeriksaanData?: PemeriksaanApiResponse, pendaftaranId: number) => {
    navigation.navigate(screen, {formId: formId, pemeriksaanId: pemeriksaanId, pemeriksaanData: pemeriksaanData, pendaftaranId: pendaftaranId});
  };

  const handleSearchPendaftaranByDate = async(data: any) => {
    try{
      setTanggalFilter(data.tanggal);
      refetch();
    }
    catch(e){
      console.log(e.response);
    }
  };

  const handleBatalkanJanji = async(pendaftaranId: number, pemeriksaanId: number) => {
    const data = { status: 'Dibatalkan' };

    try{
      const response = await axios.put(`pendaftaran/${pendaftaranId}`, data);
      const deletePemeriksaanResponse = await axios.delete(`pemeriksaan/${pemeriksaanId}`);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: 'Pemeriksaan berhasil dibatalkan',
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
      navigation.replace('ListJanji');
    }
    setModal(!modal);
  };

  useEffect(() => {
    let filterPemeriksaanData: PemeriksaanApiResponse[] = pemeriksaanUserData?.data.filter((item: PemeriksaanApiResponse) => item.bidan_id === currBidanData?.id);
    setFilteredPemeriksaanData(filterPemeriksaanData);
    console.log(filterPemeriksaanData);
  }, [tanggalFilter, pemeriksaanUserData, currBidanData?.id]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    console.log('curr user = ', currUser);
  }, [currUser]);

  //tangkap data dari realtime secara realtime untuk mengupdate data pemeriksaan
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { title, body } = remoteMessage.notification || {};
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
        },
      });
      // cek tipe data
      if (remoteMessage?.data?.type === 'pemeriksaan_baru' && remoteMessage?.data?.user_id === currUser?.id.toString()) {
        refetch();
      }
    });

    return unsubscribe;
  }, []);


  return(
    <JanjiScreenLayout
      title="List Pemeriksaan"
    >
      <ModalComponent
        handleModal={handleModal}
        message={modalInfo.message}
        text={modalInfo.text}
        isSuccess={isSuccess}
        modalVisible={modal}
      />
      <View>
        <View style={{flexDirection: 'column', marginBottom: 32}}>
          <View>
            <InputDatePickerComponent 
              control={control}
              errors={errors}
              name='tanggal'
              label="Tanggal Pemeriksaan"
              labelColor="#000"
              initialValue={formattedDateDataWithoutHour(Date.now())}
              onChange={() => {}}
              //customStyle={{width: '100%'}}
            />
            <ButtonComponent
              color={MAIN_COLOR}
              title="Cari"
              onPress={() => handleSubmit(handleSearchPendaftaranByDate)()}
            />
          </View>
        </View>
        <ScrollView style={{position: 'relative', height: '80%'}}>
        {
          filteredPemeriksaanData && filteredPemeriksaanData?.length === 0 ? (
            <View>
              <Text style={{fontSize: 18, textAlign: 'center'}}>Belum ada data pemeriksaan hari ini</Text>
            </View>
          )
          :
          filteredPemeriksaanData?.map((item: PemeriksaanApiResponse, index: number) => (
            <QueueItemComponent
              description={item.pelayanan?.nama}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id, '', item.pendaftaran_id)}
              handleDelete={() => {handleBatalkanJanji(item.pendaftaran_id, item.id);}}
              img={require('../../../../assets/icon/baby.png')}
              time={item.pendaftaran?.jam_ditentukan === null ? 'Segera Diinformasikan' : item.pendaftaran?.jam_ditentukan}
              title={item.ibu?.user?.nama_lengkap}
              key={index}
              status={item.pendaftaran?.status}
              role="bidan"
              pendaftaranId={item.pendaftaran_id}
              date={item.tanggal_kunjungan}
              handlePeriksa={() => handleScreen('Pemeriksaan', item.pelayanan.form_id, item.id, item, item.pendaftaran_id)}
            />
          ))

          /* pemeriksaanUserData?.data.map((item: PemeriksaanApiResponse, index: number) => (
            item.pendaftaran.status !== statusPendaftaran.NOT_CONFIRM && item.pendaftaran.isVerif !== 0 && item.bidan_id === currUserData.id ?
            <QueueItemComponent
              description={item.pelayanan?.nama}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id, '', item.pendaftaran_id)}
              handleDelete={() => {handleBatalkanJanji(item.pendaftaran_id, item.id);}}
              img={require('../../../../assets/icon/baby.png')}
              time={item.pendaftaran?.jam_ditentukan === null ? 'Segera Diinformasikan' : item.pendaftaran?.jam_ditentukan}
              title={item.ibu?.user?.nama_lengkap}
              key={index}
              status={item.pendaftaran?.status}
              role="bidan"
              pendaftaranId={item.pendaftaran_id}
              handlePeriksa={() => handleScreen('Pemeriksaan', item.pelayanan.form_id, item.id, item, item.pendaftaran_id)}
            />
            :
            <EmptyDataComponent

            />
          )) */
        }
      </ScrollView>
      </View>
    </JanjiScreenLayout>
  );
};

export default ListJanjiSection;
