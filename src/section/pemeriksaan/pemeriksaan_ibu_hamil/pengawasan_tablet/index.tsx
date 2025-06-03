import { JSX } from 'react/jsx-runtime';
import FormScreenLayout from '../../screen_layout';
import { View } from 'react-native';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { modalInfo } from '../../../../type/modalInfo';
import { BORDER_COLOR } from '../../../../constants/color';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import axios from '../../../../api/axios';
import handleContentModal from '../../../../component/modal/function';
import { formattedDateData } from '../../../../utils/date';
import InputTimePickerComponent from '../../../../component/input/timepicker';

const PengawasanObatSection = (): JSX.Element => {
  const router = useRoute();
  const {pemeriksaanId, pemeriksaanData} = router.params as {pemeriksaanId: number, pemeriksaanData: PemeriksaanApiResponse};
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: pengawasanTabletData} = useQuery({
    queryKey: ['pengawasanTablet', pemeriksaanId],
    queryFn: () => getForm(`form/pengawasan_tablet/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });
  const navigation = useNavigation<any>();

  const handleButtonSubmit = () => {
    handleSubmit(handleSendApi)();
  };

  const handleSendApi = async(data: any) => {
    const mergedData = {...data, pemeriksaan_id: pemeriksaanId};

    try{
      if(checkIsDataNull(pengawasanTabletData?.data)){
        await axios.post('form/pengawasan_tablet', mergedData).then(response => {
          setSuccess(true);
          handleContentModal({
            setModal,
            setModalInfo,
            message: response.data.message,
            text: 'Tutup',
          });
        });
      }
      else{
        await axios.put(`form/pengawasan_tablet/${pengawasanTabletData.data.id}`, mergedData).then(response => {
          setSuccess(true);
          handleContentModal({
            setModal,
            setModalInfo,
            message: response.data.message,
            text: 'Tutup',
          });
        });
      }
    }
    catch(e){
      console.log(e.reponse)
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
      navigation.goBack();
    }

    setModal(!modal);
  };

  useEffect(() => {
    console.log(pengawasanTabletData);
    if(pengawasanTabletData && pengawasanTabletData?.data){
      reset({
        bulan_ke: pengawasanTabletData?.data?.bulan_ke.toString(),
        tanggal: pengawasanTabletData?.data?.tanggal,
        jam: pengawasanTabletData?.data?.jam,
      });
    }
  }, [pengawasanTabletData]);

  return(
    <FormScreenLayout
      header='Pengawasan Tablet'
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalVisible={modal}
      handlePage={handleButtonSubmit}
      PemeriksaanData={pemeriksaanData}
      created_at={checkIsDataNull(pengawasanTabletData?.data) ? 'Belum ada' : formattedDateData(pengawasanTabletData?.data?.created_at)}
      updated_at={checkIsDataNull(pengawasanTabletData?.data) ? 'Belum ada' : formattedDateData(pengawasanTabletData?.data?.updated_at)}
    >
      <View>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Bulan ke"
          message="Wajib diisi"
          name="bulan_ke"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(pengawasanTabletData?.data) ? null : pengawasanTabletData?.data?.bulan_ke.toString()}
        />
        <InputDatePickerComponent
          label="Tanggal"
          onChange={() => {}}
          control={control}
          errors={errors}
          name="tanggal"
          labelColor="#000"
          message="Wajib diisi"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(pengawasanTabletData?.data) ? null : pengawasanTabletData?.data?.tanggal}
        />
        <InputTimePickerComponent
          control={control}
          errors={errors}
          name="jam"
          label="Jam"
          labelColor=""
          onChange={() => {}}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(pengawasanTabletData?.data) ? null : pengawasanTabletData?.data?.jam.toString()}
        />
      </View>
    </FormScreenLayout>
  );
};

export default PengawasanObatSection;
