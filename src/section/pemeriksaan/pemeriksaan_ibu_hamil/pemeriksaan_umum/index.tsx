import {JSX, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BUTTON_COLOR, MAIN_COLOR} from '../../../../constants/color';
import DropdownInputComponent from '../../../../component/input/dropdown';
import InputComponent from '../../../../component/input/text';
import ButtonComponent from '../../../../component/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormScreenLayout from '../../screen_layout';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import axios from '../../../../api/axios';
import handleContentModal from '../../../../component/modal/function';
import ModalComponent from '../../../../component/modal';
import { useNavigation } from '@react-navigation/native';

type pageProps = {
  formHandle: () => void,
  control: any,
  errors: any,
  data?: {
    bentuktubuh: any[],
    kesadaran: any[],
  }
}

const Page1 = ({ formHandle, data, control, errors }: pageProps): JSX.Element => {
  return (
    <>
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data.bentuktubuh}
        height={'auto'}
        textColor={'#fff'}
        onSelect={formHandle}
        label={'Bentuk tubuh'}
        control={control}
        errors={errors}
        name= "bentuk_tubuh"
        message= "Harap diisi"
      />
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data.kesadaran}
        height={'auto'}
        textColor={'#fff'}
        onSelect={formHandle}
        label={'Kesadaran'}
        control={control}
        errors={errors}
        name= "kesadaran_id"
        message= "Harap diisi"
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
      />
    </>
  );
};

const Page2 = ({ formHandle, data, control, errors }: pageProps) => {
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
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
        labelColor={'#fff'}
        border={1}
        control={control}
        errors={errors}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 12,
          color: '#fff',
        }}>
        LILA
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Tinggi Badan"
          message="Harap diisi"
          name="tinggi_badan"
          onChange={formHandle}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          labelColor={'#fff'}
          border={1}
          control={control}
          errors={errors}
        />
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Berat badan"
          message="Harap diisi"
          name="berat_badan"
          onChange={formHandle}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          labelColor={'#fff'}
          border={1}
          control={control}
          errors={errors}
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
  const { control, handleSubmit, formState: { errors } } = useForm();
  const {data: kesadaranData} = useQuery({
    queryKey: ['kesadaran'],
    queryFn: () => getForm('referensi/kesadaran'),
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
        handleSubmit(handleSubmitForm)(); // Submit form saat di page 2
      }
    } else {
      setpage(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmitForm = async(data: any) => {
    console.table(data);

    try{
      const response = await axios.post('form/pemeriksaan_umum', data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Tutup',
      });
    }
    catch(e){
      console.log(e.response)
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
      navigation.navigate('Pemeriksaan');
    }
    setModal(!modal);
  };

  return (
    <FormScreenLayout page={page} handlePage={handlePage}>
      <ModalComponent
        modalVisible={modal}
        handleModal={handleModal}
        isSuccess={isSuccess}
        message={modalInfo.message}
        text={modalInfo.text}
      />
      {page === 1 ?
          <Page1
            formHandle={handleSubmit(() => {})}
            data={{
              bentuktubuh: bentukTubuhOption,
              kesadaran: kesadaranData.data || [],
            }}
            control={control}
            errors={errors}
          />
        // page1(() => {}, [], control, errors)
      :
        <Page2
          formHandle={handleSubmit(() => {})}
          control={control}
          errors={errors}
        />
      }
    </FormScreenLayout>
  );
};


export default PemeriksaanUmumSection;
