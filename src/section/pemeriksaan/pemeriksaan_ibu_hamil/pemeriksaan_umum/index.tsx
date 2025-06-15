import {JSX, useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import {BORDER_COLOR} from '../../../../constants/color';
import DropdownInputComponent from '../../../../component/input/dropdown';
import InputComponent from '../../../../component/input/text';
import FormScreenLayout from '../../screen_layout';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import axios from '../../../../api/axios';
import handleContentModal from '../../../../component/modal/function';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formattedDateData } from '../../../../utils/date';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';

type pageProps = {
  formHandle: () => void,
  control: any,
  errors: any,
  data?: {
    bentuktubuh: any[],
    kesadaran: any[],
    pemeriksaanUmumData: any[],
  },
  pemeriksaanData: PemeriksaanApiResponse
}

const Page1 = ({ formHandle, data, control, errors, pemeriksaanData }: pageProps): JSX.Element => {
  return (
    <>
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data.bentuktubuh}
        height={'auto'}
        //textColor={''}
        onSelect={formHandle}
        label={'Bentuk tubuh'}
        control={control}
        errors={errors}
        name= "bentuk_tubuh"
        message= "Harap diisi"
        getValue='name'
        initialValue={data?.pemeriksaanUmumData?.bentuk_tubuh}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data.kesadaran}
        height={'auto'}
        //textColor={'#fff'}
        onSelect={formHandle}
        label={'Kesadaran'}
        control={control}
        errors={errors}
        name= "kesadaran_id"
        message= "Harap diisi"
        initialValue={data?.pemeriksaanUmumData?.kesadaran_id}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Mata"
        message="Harap diisi"
        name="mata"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.mata}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Leher"
        message="Harap diisi"
        name="leher"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.leher}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Payudara"
        message="Harap diisi"
        name="payudara"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.payudara}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Paru"
        message="Harap diisi"
        name="paru"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.paru}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
    </>
  );
};

const Page2 = ({ formHandle, data, control, errors, pemeriksaanData }: pageProps) => {
  return (
    <>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Jantung"
        message="Harap diisi"
        name="jantung"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.jantung}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Hati"
        message="Harap diisi"
        name="hati"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.hati}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Suhu Badan"
        message="Harap diisi"
        name="suhu_badan"
        onChange={formHandle}
        placeholder=""
        type="number"
        backgroundColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.suhu_badan}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Genetalia/Luar/Dalam"
        message="Harap diisi"
        name="genetalia"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        //labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.pemeriksaanUmumData?.genetalia}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputDatePickerComponent
        control={control}
        errors={errors}
        label="Tanggal Kontrol Kembali"
        name="tanggal_kontrol_kembali"
        labelColor="#000"
        initialValue={data?.pemeriksaanUmumData?.tanggal_kontrol_kembali}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        onChange={() => {}}
        minimum
      />
      <InputComponent
          control={control}
          errors={errors}
          name={'soap'}
          width={'auto'}
          label="SOAP"
          onChange={() => {}}
          type="textarea"
          border={1}
          textColor={'#000'}
          borderColor={BORDER_COLOR}
          message="Wajib Diisi"
          initialValue={data?.pemeriksaanUmumData?.soap}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 12,
          //color: '#fff',
        }}>
        LILA
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 150,
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Tinggi Badan"
          message="Harap diisi"
          name="tinggi_badan"
          onChange={formHandle}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          //labelColor={'#fff'}
          border={1}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={data?.pemeriksaanUmumData?.tinggi_badan}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Berat Badan"
          message="Harap diisi"
          name="berat_badan"
          onChange={formHandle}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          //labelColor={'#fff'}
          border={1}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={data?.pemeriksaanUmumData?.berat_badan}
          disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
        />
      </View>
    </>
  );
};

const bentukTubuhOption = [
  {
    id: 1,
    name: 'Normal',
  },
  {
    id: 2,
    name: 'Kelainan',
  },
  {
    id: 3,
    name: 'Abnormal',
  },
];

type modalInfo = {
  message: string;
  text: string;
};

const PemeriksaanUmumSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);
  const router = useRoute();
  const {pemeriksaanId, PemeriksaanData} = router.params as {pemeriksaanId: number, PemeriksaanData: PemeriksaanApiResponse};
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const {data: kesadaranData} = useQuery({
    queryKey: ['kesadaran'],
    queryFn: () => getForm('referensi/kesadaran'),
  });
  const {data: pemeriksaanUmumData} = useQuery({
    queryKey: ['pemeriksaanUmum', pemeriksaanId],
    queryFn: () => getForm(`form/pemeriksaan_umum/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (page <= 1) {
      setpage(1);
    } else if (page >= 2) {
      setpage(2);
    }
  }, [page]);

  const handlePage = (operator: string) => {
    if (operator === 'next') {
      if (page === 1) {
        handleSubmit(() => setpage(2))(); // Pindah ke page 2
      } else if (page === 2) {
        handleSubmit((data) => handlePostFormApi(data, 'form/pemeriksaan_umum', pemeriksaanId, pemeriksaanUmumData, setSuccess, setModal, setModalInfo, PemeriksaanData.ibu.user_id))(); // Submit form saat di page 2
      }
    } else {
      setpage(prev => Math.max(prev - 1, 1));
    }
  };


  const handleModal = () => {
    if(isSuccess){
      navigation.goBack();
    }
    setModal(!modal);
  };

  const checkIsDataFormPemeriksaanUmumNull = () => {
    return !pemeriksaanUmumData?.data;
  };

  useEffect(() => {
    if (pemeriksaanUmumData && pemeriksaanUmumData.data) {
      reset({
        bentuk_tubuh: pemeriksaanUmumData?.data.bentuk_tubuh,
        soap: pemeriksaanUmumData?.data.soap,
        kesadaran_id: pemeriksaanUmumData?.data.kesadaran_id,
        mata: pemeriksaanUmumData?.data.mata,
        leher: pemeriksaanUmumData?.data.leher,
        payudara: pemeriksaanUmumData?.data.payudara,
        paru: pemeriksaanUmumData?.data.paru,
        jantung: pemeriksaanUmumData?.data.jantung,
        hati: pemeriksaanUmumData?.data.hati,
        suhu_badan: pemeriksaanUmumData?.data.suhu_badan,
        genetalia: pemeriksaanUmumData?.data.genetalia,
        tinggi_badan: pemeriksaanUmumData?.data.tinggi_badan.toString(),
        berat_badan: pemeriksaanUmumData?.data.berat_badan,
        tanggal_kontrol_kembali: pemeriksaanUmumData?.data.tanggal_kontrol_kembali,
      });
    }
  }, [pemeriksaanUmumData]);

  useEffect(() => {console.log('Pemeriksaan data = ', pemeriksaanUmumData);}, [pemeriksaanUmumData]);

  return (
    <FormScreenLayout
      header= 'Pemeriksaan Umum'
      page={page}
      handlePage={handlePage}
      modalHandleModal={handleModal}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      pemeriksaanData={PemeriksaanData}
      created_at={checkIsDataFormPemeriksaanUmumNull() ? 'Belum ada' : formattedDateData(pemeriksaanUmumData?.data?.created_at)}
      updated_at={checkIsDataFormPemeriksaanUmumNull() ? 'Belum ada' : formattedDateData(pemeriksaanUmumData?.data?.updated_at)}
    >
      <View style={{marginBottom: 62}}>
        {page === 1 ?
            <Page1
              formHandle={handleSubmit(() => {})}
              data={{
                bentuktubuh: bentukTubuhOption,
                kesadaran: kesadaranData?.data || [],
                pemeriksaanUmumData: checkIsDataFormPemeriksaanUmumNull() ? [] : pemeriksaanUmumData?.data,
              }}
              control={control}
              errors={errors}
              pemeriksaanData={PemeriksaanData}
            />
          // page1(() => {}, [], control, errors)
        :
          <Page2
            formHandle={handleSubmit(() => {})}
            control={control}
            errors={errors}
            data={{
              pemeriksaanUmumData: checkIsDataFormPemeriksaanUmumNull() ? [] : pemeriksaanUmumData?.data,
            }}
            pemeriksaanData={PemeriksaanData}
          />
        }

      </View>
    </FormScreenLayout>
  );
};


export default PemeriksaanUmumSection;
