import {JSX, memo, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  TextInputComponent,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import InputComponent from '../../../component/input/text';
import InputDatePickerComponent from '../../../component/input/datepicker';
import ButtonComponent from '../../../component/button';
import {BORDER_COLOR, BUTTON_COLOR, MAIN_COLOR} from '../../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import handleFormStore from '../../../state/form';
import ModalComponent from '../../../component/modal';
import axios from '../../../api/axios';
import handleContentModal from '../../../component/modal/function';
import {useNavigation, useRoute} from '@react-navigation/native';
import DropdownInputComponent from '../../../component/input/dropdown';
import Jenis_Kelamin from '../../../data/jenis_kelamin/index';
import golongan_darah_data from '../../../data/golongan_darah';
import { useQuery } from '@tanstack/react-query';
import { getAllAnak } from '../../../api/data/allAnak';
import text from '../../../component/input/text';

export type modalInfo = {
  message: string;
  text: string;
};

type pageProps = {
  onChange?: () => void;
  control: any;
  errors: any;
  data?: {
    'id': number,
    'ibu_id': number,
    'nama_lengkap': string,
    'jenis_kelamin':string,
    'nik': string,
    'golongan_darah':string,
    'tempat_lahir': string,
    'tanggal_lahir': string,
    'no_akta_kelahiran': string,
    'no_registrasi_kohort_bayi': string,
    'no_registrasi_kohort_balita': string,
    'no_catatan_medik_rs': string,
    'anak_ke': 2,
  },
  disabled: boolean
};

const Page1 = ({
  onChange,
  control,
  errors,
  data,
  disabled,
}: pageProps) => {
  return (
    <>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nama Anak"
        message="Mohon diisi"
        name="nama_lengkap"
        onChange={onChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
        control={control}
        errors={errors}
        initialValue={data?.nama_lengkap}
        disabled={disabled}
        borderColor={BORDER_COLOR}
      />
      <DropdownInputComponent
        height={'auto'}
        width={'100%'}
        label="Jenis Kelamin"
        message="Mohon diisi"
        name="jenis_kelamin"
        onSelect={() => {}}
        placeholder=""
        backgroundColor={'#fff'}
        labelColor={'#000'}
        textColor={''}
        control={control}
        errors={errors}
        data={Jenis_Kelamin}
        disabled={disabled}
        initialValue={data?.jenis_kelamin}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Anak Ke"
          message="Mohon diisi"
          name="anak_ke"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          initialValue={data?.anak_ke}
          disabled={disabled}
          borderColor={BORDER_COLOR}
        />
        <DropdownInputComponent
          height={'auto'}
          label="Golongan Darah"
          message="Wajib Diisi"
          name="golongan_darah"
          onSelect={() => {}}
          placeholder="Golongan Darah"
          width={'50%'}
          backgroundColor=""
          control={control}
          errors={errors}
          data={golongan_darah_data}
          getValue="name"
          disabled={disabled}
          initialValue={data?.golongan_darah}
        />
      </View>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nomor Akta Kelahiran"
        message="Mohon diisi"
        name="no_akta_kelahiran"
        onChange={onChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
        control={control}
        errors={errors}
        disabled={disabled}
        borderColor={BORDER_COLOR}
        initialValue={data?.no_akta_kelahiran}
        maxLength={22}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nomor Induk Kependudukan"
        name="nik"
        onChange={onChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
        control={control}
        errors={errors}
        disabled={disabled}
        borderColor={BORDER_COLOR}
        initialValue={data?.nik}
        maxLength={16}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Tempat Lahir"
          message="Mohon diisi"
          name="tempat_lahir"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          disabled={disabled}
          borderColor={BORDER_COLOR}
          initialValue={data?.tempat_lahir}
        />
        <InputDatePickerComponent
          label="Tanggal Lahir"
          onChange={() => {}}
          customStyle={{width: '45%', height: 'auto'}}
          labelColor="#000"
          control={control}
          name="tanggal_lahir"
          errors={errors}
          message='Mohon diisi'
          disabled={disabled}
          initialValue={data?.tanggal_lahir}
        />
      </View>
    </>
  );
};

const Page2 = ({
  onChange,
  control,
  errors,
  data,
  disabled,
}: pageProps) => {
  return (
    <>
      <View>
        <Text style={style.headerFormText}>Primer</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Bayi"
          name="no_registrasi_kohort_bayi"
          onChange={onChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          disabled={disabled}
          borderColor={BORDER_COLOR}
          initialValue={data?.no_registrasi_kohort_bayi}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Balita & Anak Pra-Sekolah"
          name="no_registrasi_kohort_balita"
          onChange={onChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          disabled={disabled}
          borderColor={BORDER_COLOR}
          initialValue={data?.no_registrasi_kohort_balita}
        />
      </View>
      <View>
        <Text style={style.headerFormText}>Nomor Catatan Medik RS</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Catatan Medik Rs"
          name="no_catatan_medik_rs"
          onChange={onChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          disabled={disabled}
          borderColor={BORDER_COLOR}
          initialValue={data?.no_catatan_medik_rs}
        />
      </View>
      <View>
        <Text style={style.headerFormText}>Puskesmas Domisili</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Ibu"
          name="no_registrasi_kohort_ibu"
          onChange={onChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
          disabled={disabled}
          borderColor={BORDER_COLOR}
          initialValue={data?.no_registrasi_kohort_ibu}
        />
      </View>
    </>
  );
};

const TambahAnakSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);
  const [selectedAnakId, setSelectedAnakId] = useState<number>(0);
  const route = useRoute();
  const { screenType } = route.params as { screenType: string } || {};
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const setForm = handleFormStore(state => state.setForm);
  const navigation = useNavigation<any>();
  const { data: allAnakData} = useQuery({
      queryKey: ['allAnak'],
      queryFn: getAllAnak,
  });
  const dataAnak = allAnakData?.data.map((item) => {
    const data = {
      ...item,
      name: item.nama_lengkap,
    };

    return data;
  });
  const filteredAnak = dataAnak?.find((item: any) => item.id === selectedAnakId) || {};
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    /* defaultValues: {
      ...filteredAnak,
    }, */
  });
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

  const handleSubmitForm = async (data: any) => {
    //console.log('data = ', data);
    if(screenType === 'edit_anak'){
      updateData(data);
      return;
    }
    sendData(data);
  };

  const sendData = async(data: any) => {
    try {
      const response = await axios.post('bayi', data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Tutup',
      });
    } catch (e) {
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

  const updateData = async(data: any) => {
    try {
      const response = await axios.put(`bayi/${selectedAnakId}`, data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Tutup',
      });
    } catch (e) {
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

  const handleBackToHome = () => {
    if (isSuccess) {
      navigation.navigate('BottomTabs');
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (screenType === 'edit_anak' && selectedAnakId !== 0 && filteredAnak) {
      reset({
        nama_lengkap: filteredAnak.nama_lengkap,
        jenis_kelamin: filteredAnak?.jenis_kelamin,
        golongan_darah: filteredAnak.golongan_darah,
        tempat_lahir: filteredAnak.tempat_lahir,
        tanggal_lahir: filteredAnak.tanggal_lahir,
        no_akta_kelahiran: filteredAnak.no_akta_kelahiran,
        no_registrasi_kohort_bayi: filteredAnak.no_registrasi_kohort_bayi,
        no_registrasi_kohort_balita: filteredAnak.no_registrasi_kohort_balita,
        no_registrasi_kohort_ibu: filteredAnak.no_registrasi_kohort_ibu,
        no_catatan_medik_rs: filteredAnak.no_catatan_medik_rs,
        anak_ke: filteredAnak.anak_ke.toString(),
        nik: filteredAnak.nik,
      });
    }
  }, [selectedAnakId]);

  useEffect(() => {
    if(screenType === 'edit_anak' && allAnakData?.data?.length === 0 || allAnakData?.data === null){
      Alert.alert('Mohon maaf anda belum bisa mengakes bagian ini', 'Silahkan ke bagian tambah anak terlebih dahulu untuk menggunakan fitur ini', [{text: 'OK', onPress: () => navigation.navigate('BottomTabs')}]);
    }
  }, [screenType, allAnakData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            {page === 2 ? (
              <Icon
                name="angle-left"
                size={38}
                color="#000"
                onPress={handlePage.bind(null, 'prev')}
              />
            ) : null}
            <View style={{width: '100%', paddingHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Hai, Bunda dan Dedek!
              </Text>
              <Text style={{fontSize: 15, color: '#10101096'}}>
                waktunya manjakan Dedek dengan perawatan penuh cinta
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={[style.formContainer, {flex: 1}]}>
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
            {
              screenType && screenType === 'edit_anak' ?
              <DropdownInputComponent
                control={control}
                errors={errors}
                height={'auto'}
                label="Pilih Nama Anak"
                name="anak_ke"
                message="Wajib dipilih"
                onSelect={setSelectedAnakId}
                width={'100%'}
                placeholder=""
                data={dataAnak && dataAnak}
                disabled={false}
              />
              :
              null
            }
            <View style={{}} >
              {page === 1 && (
                screenType === 'edit_anak' ? (
                  <Page1
                    data={screenType === 'edit_anak' && Object.entries(filteredAnak).length !== 0 ? filteredAnak : []}
                    control={control}
                    errors={errors}
                    disabled={(screenType === 'edit_anak' && selectedAnakId === 0) ? true : false}
                  />
                ) : (
                  <Page1
                    data={[]}
                    control={control}
                    errors={errors}
                  />
                )
              )}
              {page === 2 && (
                <Page2
                  data={screenType === 'edit_anak' && filteredAnak != null ? filteredAnak : []}
                  control={control}
                  errors={errors}
                />
              )}
            </View>
          </ScrollView>
          <View style={style.buttonContainer}>
            <ButtonComponent
              color={MAIN_COLOR}
              title={page === 1 ? 'Selanjutnya' : 'Selesai'}
              onPress={handlePage.bind(null, 'next')}
              customstyle={{width: '100%'}}
            />
          </View>
          <ModalComponent
            isSuccess={isSuccess}
            modalVisible={modal}
            message={modalInfo.message}
            text={modalInfo.text}
            handleModal={handleBackToHome}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    padding: 12,
    //flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  formContainer: {
    width: '100%',
    height: '80%',
    marginBottom: 34,
  },
  buttonContainer: {
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerFormText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default TambahAnakSection;
