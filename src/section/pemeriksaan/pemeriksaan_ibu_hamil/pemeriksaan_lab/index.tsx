import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FormScreenLayout from '../../screen_layout';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import {JSX, useEffect, useState} from 'react';
import { modalInfo } from '../../../../type/modalInfo';
import { useForm } from 'react-hook-form';
import { BORDER_COLOR } from '../../../../constants/color';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import axios from '../../../../api/axios';
import handleContentModal from '../../../../component/modal/function';
import { formattedDate, formattedDateData } from '../../../../utils/date';
import InputTimePickerComponent from '../../../../component/input/timepicker';
import RadioInputComponent from '../../../../component/input/radio';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Page1 = ({
  formHandle,
  data,
  control,
  errors,
  pemeriksaanData,
}: {
  formHandle: () => void;
  data: any[];
  control: any;
  errors: any;
  pemeriksaanData: PemeriksaanApiResponse
}): JSX.Element => {
  return (
    <>
      <InputDatePickerComponent
        label="Tanggal Pemeriksaan"
        onChange={formHandle}
        control={control}
        errors={errors}
        name="tanggal_pemeriksaan"
        labelColor=""
        initialValue={data?.tanggal_pemeriksaan}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputTimePickerComponent
        label="Jam Pemeriksaan"
        onChange={formHandle}
        control={control}
        errors={errors}
        name="jam_pemeriksaan"
        labelColor=""
        initialValue={data?.jam_pemeriksaan}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nama Pemeriksaan"
        //message="Harap diisi"
        name="nama"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        //labelColor={'#fff'}
        textColor={''}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.nama}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'50%'}
        width={'100%'}
        label="Hasil Pemeriksaan"
        //message="Harap diisi"
        name="hasil"
        onChange={formHandle}
        placeholder=""
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        //labelColor={'#fff'}
        textColor={''}
        control={control}
        errors={errors}
        borderColor={BORDER_COLOR}
        initialValue={data?.hasil}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
    </>
  );
};

const Page2 = ({
  formHandle,
  data,
  control,
  errors,
  pemeriksaanData,
}: {
  formHandle: () => void;
  data: any[];
  control: any;
  errors: any;
  pemeriksaanData: PemeriksaanApiResponse
}): JSX.Element => {
  return (
    <>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="SOAP"
        message="Harap diisi"
        name="soap"
        onChange={formHandle}
        placeholder=""
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        //labelColor={'#fff'}
        textColor={''}
        control={control}
        errors={errors}
        initialValue={data?.soap}
        borderColor={BORDER_COLOR}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Penatalaksanaan"
        message="Harap diisi"
        name="penatalaksanaan"
        onChange={formHandle}
        placeholder=""
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        //labelColor={'#fff'}
        textColor={''}
        control={control}
        errors={errors}
        initialValue={data?.penatalaksanaan}
        borderColor={BORDER_COLOR}
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputDatePickerComponent
        label="Tanggal Pelayanan"
        onChange={formHandle}
        control={control}
        errors={errors}
        initialValue={data?.tanggal_pelayanan}
        name="tanggal_pelayanan"
        labelColor="#000"
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
      <InputTimePickerComponent
        label="Jam Pelayanan"
        onChange={formHandle}
        control={control}
        errors={errors}
        initialValue={data?.jam_pelayanan}
        name="jam_pelayanan"
        labelColor="#000"
        disabled={pemeriksaanData?.pendaftaran?.status === 'Selesai'}
      />
    </>
  );
};

const PemeriksaanLabSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {pemeriksaanId, pemeriksaanData} = route.params as {
    pemeriksaanId: number;
    pemeriksaanData: any;
  };
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: pemeriksaanLabData} = useQuery({
    queryKey: ['pemeriksaanLab', pemeriksaanId],
    queryFn: () => getForm(`form/pemeriksaan_lab/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (page <= 1) {
      setpage(1);
    } else if (page >= 2) {
      setpage(2);
    }
  }, [page]);

  const handlePage = (operator: string) => {
    /* if (operator === 'next') {
      if (page === 1) {
        handleSubmit(() => setpage(2))(); // Pindah ke page 2
      } else if (page === 2) {
        handleSubmit(handleSubmitForm)(); // Submit form saat di page 2
      }
    } else {
      setpage(prev => Math.max(prev - 1, 1));
    } */
      handleSubmit(handleSubmitForm)();
  };

  const handleSubmitForm = async(data: any) => {
    const mergedData = { ...data, pemeriksaan_id: pemeriksaanId };

    try{
      if(checkIsDataNull(pemeriksaanLabData?.data)) {
        await axios.post('form/pemeriksaan_lab', mergedData).then(response => {
          setSuccess(true);
          handleContentModal({
            setModal,
            setModalInfo,
            message: response.data.message,
            text: 'Tutup',
          });
        });
      }
      else {
        await axios.put(`form/pemeriksaan_lab/${pemeriksaanLabData?.data.id}`, mergedData).then(response => {
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
      navigation.goBack();
    }
    setModal(!modal);
  };

  useEffect(() => {
    if(pemeriksaanLabData?.data != null){
      if(pemeriksaanLabData?.data?.tanggal_pemeriksaan != null){
        setIsAccepted(true);
      }
    }
  }, [pemeriksaanLabData])

  useEffect(() => {
    if(pemeriksaanLabData && pemeriksaanLabData?.data ){
      reset({
        tanggal_pemeriksaan: pemeriksaanLabData?.data?.tanggal_pemeriksaan,
        jam_pemeriksaan: pemeriksaanLabData?.data?.jam_pemeriksaan,
        hasil: pemeriksaanLabData?.data?.hasil,
        nama: pemeriksaanLabData?.data?.nama,
        tanggal_pelayanan: pemeriksaanLabData?.data?.tanggal_pelayanan,
        jam_pelayanan: pemeriksaanLabData?.data?.jam_pelayanan,
        soap: pemeriksaanLabData?.data?.soap,
        penatalaksanaan: pemeriksaanLabData?.data?.penatalaksanaan,
      });
    }
  }, [pemeriksaanLabData]);

  return (
    <FormScreenLayout
      handlePage={handlePage}
      //page={page}
      header="Pemeriksaan Lab & SOAP"
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalVisible={modal}
      pemeriksaanData={pemeriksaanData}
      created_at={checkIsDataNull(pemeriksaanLabData?.data) ? 'Belum ada' : formattedDateData(pemeriksaanLabData?.data?.created_at)}
      updated_at={checkIsDataNull(pemeriksaanLabData?.data) ? 'Belum ada' : formattedDateData(pemeriksaanLabData?.data?.updated_at)}
    >
      <View style={{marginBottom: 32}}>
        <Page2
          control={control}
          data={checkIsDataNull(pemeriksaanLabData?.data) ? [] : pemeriksaanLabData?.data}
          errors={errors}
          formHandle={() => {}}
          pemeriksaanData={pemeriksaanData}
        />
        <View style={Style.checkboxContainer}>
          <BouncyCheckbox
            fillColor="#000"
            onPress={() => setIsAccepted(!isAccepted)}
            isChecked={isAccepted}
          />
          <Text>
            Ingin Mengisi Pemeriksaan Lab?
          </Text>
        </View>
        {
          isAccepted ?
          <Page1
            formHandle={() => {}}
            control={control}
            errors={errors}
            data={checkIsDataNull(pemeriksaanLabData?.data) ? [] : pemeriksaanLabData?.data}
            pemeriksaanData={pemeriksaanData}
          />
          : null
        }
      </View>  
    </FormScreenLayout>
  );
};

const Style = StyleSheet.create({
  checkboxContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
});

export default PemeriksaanLabSection;
