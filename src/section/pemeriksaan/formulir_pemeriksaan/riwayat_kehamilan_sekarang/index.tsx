import { JSX, useEffect, useState } from 'react';
import FormScreenLayout from '../../screen_layout';
import { ScrollView, View } from 'react-native';
import InputComponent from '../../../../component/input/text';
import DropdownInputComponent from '../../../../component/input/dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../../type/modalInfo';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';
import { BORDER_COLOR } from '../../../../constants/color';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import { formattedDate, formattedDateData } from '../../../../utils/date';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { AdaTidakDropdownData, BiasaDropdownData, KebiasaanDropdownData, KeluhanDropdownData, MuntahDropdownData, NafsuMakanDropdownData, RiwayatPenyakitDropdownData, RiwayatPenyakitKeluargaDropdownData, SatuDropdonwData } from '../../../../data/pemeriksaan/riwayat_kehamilan_sekarang/DropdownData';
import { getData } from '../../../../api/data/getData';

type pageProps = {
  OnChange: () => void,
  data?: Array<Object>,
  initialValue: Array<Object>,
  control: any,
  errors: any,
  pemeriksaanData: PemeriksaanApiResponse,
}

const Page1 = ({OnChange, data, initialValue, control, errors, pemeriksaanData}: pageProps): JSX.Element => {
  return (
    <>
      <InputComponent
          height={'auto'}
          width={'100%'}
          label="Gravida"
          message="Harap diisi"
          name="gravida"
          onChange={OnChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={initialValue.gravida}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <InputComponent
          height={'auto'}
          width={'100%'}
          label="Partus"
          message="Harap diisi"
          name="partus"
          onChange={OnChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={initialValue.partus}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <InputComponent
          height={'auto'}
          width={'100%'}
          label="RR/RT/RST"
          message="Harap diisi"
          name="rr_rt"
          onChange={OnChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={initialValue.rr_rt}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <InputDatePickerComponent 
          label="HPHT"
          name='hpht'
          control={control}
          errors={errors}
          initialValue={initialValue.hpht}
          message="Wajib Diisi"
          labelColor=""
          onChange={() => {}}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <InputDatePickerComponent 
          label="HPL"
          name='hpl'
          control={control}
          errors={errors}
          initialValue={initialValue.hpl}
          message="Wajib Diisi"
          labelColor=""
          onChange={() => {}}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
    </>
  );
};

const Page2 = ({OnChange, data, initialValue, control, errors, pemeriksaanData}: pageProps): JSX.Element => {
  return (
    <>
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={MuntahDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Muntah Muntah'}
          control={control}
          errors={errors}
          name='muntah'
          initialValue={initialValue.muntah}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={MuntahDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Pusing'}
          control={control}
          errors={errors}
          name="pusing"
          initialValue={initialValue.pusing}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={AdaTidakDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Nyeri Perut'}
          control={control}
          errors={errors}
          name='nyeri_perut'
          initialValue={initialValue.nyeri_perut}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={NafsuMakanDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Nafsu Makan'}
          control={control}
          errors={errors}
          name='nafsu_makan'
          initialValue={initialValue.nafsu_makan}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={AdaTidakDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Pendarahan'}
          control={control}
          errors={errors}
          name="pendarahan"
          initialValue={initialValue.pendarahan}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={RiwayatPenyakitDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Riwayat Penyakit'}
          control={control}
          errors={errors}
          name='riwayat_penyakit'
          initialValue={initialValue.riwayat_penyakit}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={RiwayatPenyakitKeluargaDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Riwayat Penyakit Keluarga'}
          control={control}
          errors={errors}
          name='riwayat_penyakit_keluarga'
          initialValue={initialValue.riwayat_penyakit_keluarga}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KebiasaanDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Kebiasaan'}
          control={control}
          errors={errors}
          name="kebiasaan"
          initialValue={initialValue.kebiasaan}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KeluhanDropdownData}
          height={'auto'}
          onSelect={() => {}}
          label={'Keluhan'}
          control={control}
          errors={errors}
          name='keluhan'
          initialValue={initialValue.keluhan}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={SatuDropdonwData}
          height={'auto'}
          onSelect={() => {}}
          label={'Pasangan Sexual Istri'}
          control={control}
          errors={errors}
          name='pasangan_sexual_istri'
          initialValue={initialValue.pasangan_sexual_istri}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={SatuDropdonwData}
          height={'auto'}
          onSelect={() => {}}
          label={'Pasangan Sexual Suami'}
          control={control}
          errors={errors}
          name='pasangan_sexual_suami'
          initialValue={initialValue.pasangan_sexual_suami}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={SatuDropdonwData}
          height={'auto'}
          onSelect={() => {}}
          label={'Mendiskusikan HIV / AIDS / PMS'}
          control={control}
          errors={errors}
          name='mendiskusikan_hiv'
          initialValue={initialValue.mendiskusikan_hiv}
          getValue="name"
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
    </>
  );
};

const RiwayatKehamilanSekarangSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);
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

  const { data: riwayatKehamilanSekarangFormData } = useQuery({
    queryKey: ['RiwayatKehamilanSekarangFormData', pemeriksaanId],
    queryFn: () => getForm(`form/riwayat_kehamilan_sekarang/show_by_pendaftaran/${pemeriksaanId}`),
  });

  const {data: currIbuPeriksaData} = useQuery({
    queryKey: ['currIbuPeriksaData', pemeriksaanData?.ibu?.user_id],
    queryFn: () => getData(`ibu/getdataibu/${pemeriksaanData?.ibu?.user_id}`),
  });

  const handlePage = (operator: string) => {
    if (operator === 'next') {
      if (page === 1) {
        handleSubmit(() => setpage(2))(); // Pindah ke page 2
      } else if (page === 2) {
        handleSubmit((data) => handlePostFormApi(data, 'form/riwayat_kehamilan_sekarang', pemeriksaanId, riwayatKehamilanSekarangFormData, setSuccess, setModal, setModalInfo))(); // Submit form saat di page 2
      }
    } else {
      setpage(prev => Math.max(prev - 1, 1));
    }
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (page <= 1) {
      setpage(1);
    } else if (page >= 2) {
      setpage(2);
    }
  }, [page]);

  useEffect(() => {
    //console.log('riwayat kehamilan sekarang form = ',riwayatKehamilanSekarangFormData);
    if(riwayatKehamilanSekarangFormData && riwayatKehamilanSekarangFormData?.data){
      reset({
        ...riwayatKehamilanSekarangFormData?.data,
      });
    }
  }, [riwayatKehamilanSekarangFormData]);

  useEffect(() => {
    console.log('pemeriksaan id = ', pemeriksaanId);
    console.log('pemeriksaan form data id = ', riwayatKehamilanSekarangFormData);
  }, [pemeriksaanId, riwayatKehamilanSekarangFormData]);

  return (
    <FormScreenLayout
      page={page}
      header="Riwayat Kehamilan Sekarang"
      handlePage={handlePage}
      title={page === 2 ? 'Keluhan Utama' : 'Mohon isi formulir ini dengan lengkap dan akurat!  '}
      modalHandleModal={handleModal}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      pemeriksaanData={pemeriksaanData}
      created_at={checkIsDataNull(riwayatKehamilanSekarangFormData?.data) ? 'Belum ada' : formattedDateData(riwayatKehamilanSekarangFormData?.data.created_at)}
      updated_at={checkIsDataNull(riwayatKehamilanSekarangFormData?.data) ? 'Belum ada' : formattedDateData(riwayatKehamilanSekarangFormData?.data.updated_at)}
    >
      <ScrollView style={{marginBottom: 64}}>
        {
          page === 1 ?
          <Page1
            control={control}
            errors={errors}
            data={[]}
            OnChange={() => {}}
            pemeriksaanData={pemeriksaanData}
            initialValue={checkIsDataNull(riwayatKehamilanSekarangFormData?.data) ? '' : riwayatKehamilanSekarangFormData?.data}
          />
          :
          <Page2
            control={control}
            errors={errors}
            data={[]}
            OnChange={() => {}}
            pemeriksaanData={pemeriksaanData}
            initialValue={checkIsDataNull(riwayatKehamilanSekarangFormData?.data) ? '' : riwayatKehamilanSekarangFormData?.data}
          />
        }
      </ScrollView>
    </FormScreenLayout>
  );
};

export default RiwayatKehamilanSekarangSection;
