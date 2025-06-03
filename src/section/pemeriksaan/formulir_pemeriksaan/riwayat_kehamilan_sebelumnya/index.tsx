import { ScrollView, View } from 'react-native';
import FormScreenLayout from '../../screen_layout';
import { JSX, useEffect, useState } from 'react';
import InputComponent from '../../../../component/input/text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../../type/modalInfo';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';
import { BORDER_COLOR } from '../../../../constants/color';
import { getForm } from '../../../../api/data/form';
import { useQuery } from '@tanstack/react-query';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import { formattedDateData } from '../../../../utils/date';
import DropdownInputComponent from '../../../../component/input/dropdown';
import Jenis_Kelamin from '../../../../data/jenis_kelamin';
import { CaraPesalinanDropdownData, PenolongPersalinanDropdownData } from '../../../../data/pemeriksaan/pelayanan_bersalin/DropdownOption';

const RiwayatKehamilanSebelumnyaSection = (): JSX.Element => {
  const navigate = useNavigation<any>();
  const router = useRoute();
  const { pemeriksaanData, pemeriksaanId, pelayananPemeriksaanHamilId} = router.params as {pemeriksaanData: PemeriksaanApiResponse, pemeriksaanId: number, pelayananPemeriksaanHamilId: number};
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfoType>({
    message: '',
    text: '',
  });
  const { data: riwayatKehamilanSebelumnyaFormData } = useQuery({
    queryKey: ['riwayatKehamilanSebelumnya', pemeriksaanId],
    queryFn: () => getForm(`form/riwayat_kehamilan_sebelumnya/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });

  const handleSend = () => {
    handleSubmit((data) => handlePostFormApi(data, 'form/riwayat_kehamilan_sebelumnya', pemeriksaanId, riwayatKehamilanSebelumnyaFormData, setSuccess, setModal, setModalInfo))();
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }

    setModal(!modal);
  };

  useEffect(() => {
    console.log(riwayatKehamilanSebelumnyaFormData);
    if(riwayatKehamilanSebelumnyaFormData && riwayatKehamilanSebelumnyaFormData?.data){
      reset({
        anak_ke: riwayatKehamilanSebelumnyaFormData?.data.anak_ke.toString(),
        apiah: riwayatKehamilanSebelumnyaFormData?.data.apiah,
        umur_anak: riwayatKehamilanSebelumnyaFormData?.data.umur_anak.toString(),
        p_l: riwayatKehamilanSebelumnyaFormData?.data.p_l,
        bbl: riwayatKehamilanSebelumnyaFormData?.data.bbl,
        cara_persalinan: riwayatKehamilanSebelumnyaFormData?.data.cara_persalinan,
        penolong: riwayatKehamilanSebelumnyaFormData?.data.penolong,
        tempat_persalinan: riwayatKehamilanSebelumnyaFormData?.data.tempat_persalinan,
        keterangan: riwayatKehamilanSebelumnyaFormData?.data.keterangan,
      });
    }
  }, [riwayatKehamilanSebelumnyaFormData]);

  useEffect(() => {
    console.log('form riwayat kehamilan sebelumnya', riwayatKehamilanSebelumnyaFormData);
  }, [pemeriksaanId])

  return(
    <FormScreenLayout
      header="Riwayat Kehamilan Sebelumnya"
      handlePage={handleSend}
      created_at={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? 'Belum Ada' : formattedDateData(riwayatKehamilanSebelumnyaFormData.data.created_at)}
      updated_at={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? 'Belum Ada' : formattedDateData(riwayatKehamilanSebelumnyaFormData.data.updated_at)}
      //updated_at={pemeriksaanData.data.updated_at}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalHandleModal={handleModal}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      pemeriksaanData={pemeriksaanData}
    >
      <ScrollView style={{marginBottom: 64}}>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Anak ke"
          message="Harap diisi"
          name="anak_ke"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData?.data?.anak_ke?.toString()}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="APIAH"
          message="Harap diisi"
          name="apiah"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.apiah}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Umur Anak"
          message="Harap diisi"
          name="umur_anak"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.umur_anak.toString()}
        />
        <DropdownInputComponent
          height={'auto'}
          width={'100%'}
          label="Jenis Kelamin"
          message="Harap diisi"
          name="p_l"
          onSelect={() => {}}
          placeholder=""
          backgroundColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          data={Jenis_Kelamin}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.p_l}
        />      
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="BBL (Gram)"
          message="Harap diisi"
          name="bbl"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.bbl}
        />
        <DropdownInputComponent
          height={'auto'}
          width={'100%'}
          label="Cara Persalinan"
          message="Harap diisi"
          name="cara_persalinan"
          onSelect={() => {}}
          placeholder=""
          backgroundColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          data={CaraPesalinanDropdownData}
          getValue='name'
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.cara_persalinan}
        />
        <DropdownInputComponent
          height={'auto'}
          width={'100%'}
          label="Penolong"
          message="Harap diisi"
          name="penolong"
          onSelect={() => {}}
          placeholder=""
          backgroundColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          data={PenolongPersalinanDropdownData}
          getValue='name'
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.penolong}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Tempat Persalinan"
          message="Harap diisi"
          name="tempat_persalinan"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.tempat_persalinan}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Keterangan"
          message="Harap diisi"
          name="keterangan"
          onChange={() => {}}
          placeholder=""
          type="textarea"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
          initialValue={checkIsDataNull(riwayatKehamilanSebelumnyaFormData?.data) ? '' : riwayatKehamilanSebelumnyaFormData.data.keterangan}
        />
      </ScrollView>
    </FormScreenLayout>
  );
};

export default RiwayatKehamilanSebelumnyaSection;
