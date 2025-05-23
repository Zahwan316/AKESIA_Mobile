import { JSX, useEffect, useState } from 'react';
import JanjiScreenLayout from '../layout';
import { ScrollView, Text, View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPendaftaranUser } from '../../../../api/data/pendaftaran';
import QueueItemComponent from '../component/queue-item';
import statusPendaftaran from '../../../../type/statusPendaftaran';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { useForm } from 'react-hook-form';
import { formattedDateData, formattedDateDataWithoutHour } from '../../../../utils/date';
import { MAIN_COLOR } from '../../../../constants/color';
import { checkIsDataFormNull } from '../../../../utils/checkDataIsNull';
import { getData } from '../../../../api/data/getData';
import handleContentModal from '../../../../component/modal/function';
import axios from '../../../../api/axios';
import { Alert } from 'react-native';
import { modalInfoType } from '../../../../type/modalInfo';
import { modalInfo } from '../../../pemeriksaan/pelayanan_bayi/index';
import ModalComponent from '../../../../component/modal';

const ListJanjiSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Menunggu Konfirmasi');
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

  const handleScreen = (screen: string, formId?: string | number, pemeriksaanId?: string | number, pemeriksaanData?: PemeriksaanApiResponse, pendaftaranId: number) => {
    navigation.navigate(screen, {formId: formId, pemeriksaanId: pemeriksaanId, pemeriksaanData: pemeriksaanData, pendaftaranId: pendaftaranId});
  };

  const handleSearchPendaftaranByDate = async(data: any) => {
    try{
      //const formattedDate = formattedDateData(data.tanggal);
      console.log('Tanggal = ', data);
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
    console.log(pemeriksaanUserData);
  }, [pemeriksaanUserData]);

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
          <View >
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
          !pemeriksaanUserData?.data || pemeriksaanUserData.data.length === 0 ? (
            <View>
              <Text style={{fontSize: 18, textAlign: 'center'}}>Belum ada data pemeriksaan hari ini</Text>
            </View>
          )
          :
          pemeriksaanUserData?.data.map((item: PemeriksaanApiResponse, index: number) => (
            item.pendaftaran.status !== statusPendaftaran.NOT_CONFIRM && item.pendaftaran.isVerif !== 0 ?
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
            null

          ))
        }
      </ScrollView>
      </View>
    </JanjiScreenLayout>
  );
};

export default ListJanjiSection;
