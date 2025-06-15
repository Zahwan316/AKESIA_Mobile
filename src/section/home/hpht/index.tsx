import { JSX, useEffect, useState } from 'react';
import HomeFeatureLayoutSection from '../home_feature_layout';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { MAIN_COLOR } from '../../../constants/color';
import { useForm } from 'react-hook-form';
import { modalInfo } from '../tambah_anak';
import InputDatePickerComponent from '../../../component/input/datepicker';
import { handleEditApi } from '../../../api/handleEditApi';
import HphtModal from './component/HphtModal';
import { useQuery } from '@tanstack/react-query';
import { getCurrentIbu } from '../../../api/data/currLoggedIbu';
import { useNavigation } from '@react-navigation/native';

const HphtSection = (): JSX.Element => {
  const navigator = useNavigation<any>();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [acceptModal, setAcceptModal] = useState<boolean>(false);
  const [hpht, setHpht] = useState<string>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: ibuData} = useQuery({
    queryKey: ['ibuData'],
    queryFn: () => getCurrentIbu(),
  });

  const handleSubmitForm = () => {
    handleSubmit((data) => handleEditApi(data, 'ibu/update', ibuData?.data?.id, setSuccess, setModal, setModalInfo))();
  };

  const handleFormHpht = (value: string) => {
    setHpht(value);
  };

  const handleModal = () => {
    if(isSuccess){
      setAcceptModal(false);
      navigator.pop(2);
    }

    setModal(!modal);
  };

  useEffect(() => {
    if(ibuData && ibuData?.data){
      reset({
        hpht: ibuData?.data?.hpht,
      });
    }
  }, [ibuData]);

  return(
    <HomeFeatureLayoutSection
      title=""
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalHandleModal={handleModal}
      onPress={() => setAcceptModal(!modal)}
    >
      <HphtModal
        visible={acceptModal}
        handleCancel={() => setAcceptModal(false)}
        handleSendData={handleSubmitForm}
        hpht={hpht}
      />

      <View style={Style.imgContainer}>
        <View style={Style.imgItemContainer}>
          <Image
            source={require('../../../assets/img/Hpht.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <View style={Style.imgTextContainer}>
          <Text style={{color: MAIN_COLOR, fontWeight: 'bold', fontSize: 20}}>HPHT</Text>
        </View>
      </View>
      <View style={Style.ctaContainer}>
        <Text style={{textAlign: 'center'}}>HPHT Menjadi  Acuan Ukur Ibu Menentukan Usia Kehamilan, Jadi jangan Salah Input ya Bun...</Text>
      </View>
      <View style={Style.titleContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Usia Kehamilan Bunda</Text>
      </View>
      <View style={Style.formContainer}>
        <InputDatePickerComponent
          control={control}
          errors={errors}
          name="hpht"
          label="Pilih hari pertama haid terakhir bunda"
          onChange={handleFormHpht}
          initialValue=''
          labelColor=''
          maximum
          minimum={42}
        />
      </View>
    </HomeFeatureLayoutSection>
  );
};

const Style = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: '30%',
    marginBottom: 12,
    borderWidth: 0,
  },
  imgItemContainer: {
    width: '100%',
    height: '80%',
    marginBottom: 12,
  },
  imgTextContainer: {
    width: '100%',
    height: '12%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaContainer: {
    width: '100%',
    height: '10%',
  },
  titleContainer: {
    width: '100%',
    height: '5%',
    marginBottom: 12,
  },
  formContainer: {
    width: '100%',
    height: 'auto',
  },
});

export default HphtSection;
