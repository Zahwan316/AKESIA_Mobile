import {JSX, memo, useEffect, useMemo, useState} from 'react';
import {
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
import {BUTTON_COLOR, MAIN_COLOR} from '../../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import handleFormStore from '../../../state/form';
import ModalComponent from '../../../component/modal';
import axios from '../../../api/axios';
import handleContentModal from '../../../component/modal/function';
import {useNavigation} from '@react-navigation/native';

type modalInfo = {
  message: string;
  text: string;
};

const Page1 = ({
  onChange,
  control,
  errors,
}: {
  onChange?: () => void;
  control: any;
  errors: any;
}) => {
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
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Jenis Kelamin"
        message="Mohon diisi"
        name="jenis_kelamin"
        onChange={onChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
        control={control}
        errors={errors}
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
          onChange={onChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
        />
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Golongan Darah"
          message="Mohon diisi"
          name="golongan_darah"
          onChange={onChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
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
        />
      </View>
    </>
  );
};

const Page2 = ({
  onChange,
  control,
  errors,
}: {
  onChange?: () => void;
  control: any;
  errors: any;
}) => {
  return (
    <>
      <View>
        <Text style={style.headerFormText}>Primer</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Bayi"
          name="nomor_registrasi_kohort"
          onChange={onChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Balita & Anak Pra-Sekolah"
          name="nomor_registrasi_kohort_balita"
          onChange={onChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
        />
      </View>
      <View>
        <Text style={style.headerFormText}>Puskesmas Domisili</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Ibu"
          name="nomor_registrasi_kohort_ibu"
          onChange={onChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
          control={control}
          errors={errors}
        />
      </View>
    </>
  );
};

const TambahAnakSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const setForm = handleFormStore(state => state.setForm);
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

  const handleNextPage = (page) => {

  };

  const handleSubmitForm = async (data: any) => {
    //console.log('data = ', data);
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
        message: 'Terjadi kesalahan saat menyimpan data. Coba lagi nanti.',
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
            style={style.formContainer}>
            {page === 1 && (
              <Page1 data={[]} control={control} errors={errors} />
            )}
            {page === 2 && (
              <Page2 data={[]} control={control} errors={errors} />
            )}
          </ScrollView>
          <View style={style.buttonContainer}>
            <ButtonComponent
              color={MAIN_COLOR}
              title={page === 1 ? 'Selanjutnya' : 'Selesai'}
              onPress={handlePage.bind(null, 'next')}
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
  },
  buttonContainer: {},
  headerFormText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default TambahAnakSection;
