import {JSX, useEffect, useState} from 'react';
import {Form, useForm} from 'react-hook-form';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputComponent from '../../../component/input/text';
import ButtonComponent from '../../../component/button';
import { BORDER_COLOR, BUTTON_COLOR} from '../../../constants/color';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import handleFormStore from '../../../state/form';
import DropdownInputComponent from '../../../component/input/dropdown';
import InputDatePickerComponent from '../../../component/input/datepicker';
import { useQuery } from '@tanstack/react-query';
import { getPendidikan } from '../../../api/data/ref/pendidikan';
import { getPekerjaan } from '../../../api/data/ref/pekerjaan';
import ModalComponent from '../../../component/modal';
import axios from '../../../api/axios';
import handleContentModal from '../../../component/modal/function';
import golongan_darah_data from '../../../data/golongan_darah/index';

type modalInfo = {
  message: string;
  text: string;
}

const CompleteProfileOrangTuaSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const { control, reset, handleSubmit, formState: { errors } } = useForm({mode: 'onChange', reValidateMode:'onSubmit'});
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({ message: '', text: '' });
  const setForm = handleFormStore((state) => state.setForm);
  const { dataUser } = useRoute().params as { dataUser: any };
  const { data: pendidikanData} = useQuery({
    queryKey: ['pendidikan'],
    queryFn: getPendidikan,
  });
  const { data: pekerjaanData } = useQuery({
    queryKey: ['pekerjaan'],
    queryFn: getPekerjaan,
  });

  const handleSimpan = async(data: any) => {
    console.log('Data : ', data);
    handleSend(data);
  };

  const handleSend = async(data: any) => {
    try{
      const response = await axios.post('ibu/lengkapidata', data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
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

  const handleButtonModal = () => {
    if(isSuccess){
      //navigation.navigate('BottomTabs');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'BottomTabs' }],
        })
      );
    }
    setModal(false);
  };

  useEffect(() => {
    if(dataUser){
      reset({
        nama_lengkap: dataUser.nama_lengkap,
      });
    }
  }, [dataUser])

  useEffect(() => {
    console.log(dataUser);
  },[dataUser]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 26}}>
                Kenalan dulu yuk Ma! 
              </Text>
              <Image
                source={require('../../../assets/icon/wave-hand.png')}
              />
            </View>
            <Text style={{fontSize: 16, color: '#10101095'}}>
              Biar kita makin dekat dan aplikasi KIA semakin mengerti mama
            </Text>
          </View>
          <View style={style.formGroupContainer}>
            <View>
              <InputComponent
                height={"auto"}
                label="Nama ibu"
                message="Mohon diisi"
                name="nama_lengkap"
                onChange={setForm}
                placeholder="Nama Ibu"
                type="text"
                width={'100%'}
                backgroundColor="#fff"
                border={1}
                borderColor={BORDER_COLOR}
                control={control}
                errors={errors}
                initialValue={dataUser?.nama_lengkap}
              />
              <InputComponent
                height={"auto"}
                label="NIK"
                message="NIK Wajib Diisi"
                name="nik"
                onChange={setForm}
                placeholder="Nik"
                type="number"
                width={'100%'}
                backgroundColor="#fff"
                borderColor={BORDER_COLOR}
                border={1}
                control={control}
                errors={errors}
                maxLength={16}
                //minLength={16}
              />
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'space-between',
                }}>
                <InputComponent
                  height={"auto"}
                  label="Tempat Lahir"
                  message="Wajib Diisi"
                  name="tempat_lahir"
                  onChange={setForm}
                  placeholder="Tempat Lahir"
                  type="text"
                  width={'45%'}
                  backgroundColor="#fff"
                  border={1}
                  control={control}
                  errors={errors}
                  borderColor={BORDER_COLOR}
                />

                 <InputDatePickerComponent
                  control={control}
                  label="Tanggal Lahir"
                  message="Wajib Diisi"
                  name="tanggal_lahir"
                  onChange={setForm}
                  customStyle={{width: "45%"}}
                  labelColor="#000"
                  errors={errors}
                />
              </View>
              <DropdownInputComponent
                height={"auto"}
                label="Golongan Darah"
                message="Wajib Diisi"
                name="golongan_darah"
                onSelect={setForm}
                placeholder="Golongan Darah"
                width={'100%'}
                backgroundColor=""
                control={control}
                errors={errors}
                data={golongan_darah_data}
                getValue="name"
              />
              <InputComponent
                height={"auto"}
                label="Alamat Domisili"
                message="Wajib Diisi"
                name="alamat_domisili"
                onChange={setForm}
                placeholder="Alamat Domisili"
                type="text"
                width={'100%'}
                backgroundColor="#fff"
                border={1}
                control={control}
                errors={errors}
                borderColor={BORDER_COLOR}
              />
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'space-between',
                }}>
                {/* <InputComponent
                  height={'auto'}
                  label="Nomor handphone"
                  message="Nomor handphone"
                  name="kode_telepon"
                  onChange={() => {}}
                  placeholder="+62"
                  type="number"
                  width={'38%'}
                  backgroundColor=""
                  border={1}
                  control={control}
                  value='+62'
                /> */}
                <InputComponent
                  height={'auto'}
                  label="Nomor handphone"
                  message="Wajib Diisi"
                  name="telepon"
                  onChange={setForm}
                  placeholder="Nomor handphone"
                  type="number"
                  width={'100%'}
                  backgroundColor="#fff"
                  border={1}
                  control={control}
                  errors={errors}
                  borderColor={BORDER_COLOR}
                  maxLength={13}
                />
              </View>

              <DropdownInputComponent
                backgroundColor={''}
                control={control}
                data={pendidikanData?.data || []}
                height={'auto'}
                label="Pendidikan"
                message="Mohon untuk diisi"
                name="pendidikan"
                onSelect={setForm}
                placeholder=""
                errors={errors}
              />
              <DropdownInputComponent
                backgroundColor={'#ffff4440'}
                control={control}
                data={pekerjaanData?.data || []}
                height={'auto'}
                label="Pekerjaan"
                message="Mohon untuk diisi"
                name="pekerjaan"
                onSelect={setForm}
                placeholder=""
                errors={errors}
              />
            </View>
          </View>
          <View style={style.buttonGroupContainer}>
            <ButtonComponent
              title='Simpan'
              onPress={handleSubmit(handleSimpan)}
              color={BUTTON_COLOR}
              customstyle={{fontSize: 14}}
            />
          </View>
          <ModalComponent
            message={modalInfo.message}
            text={modalInfo.text}
            modalVisible={modal}
            isSuccess={isSuccess}
            handleModal={handleButtonModal}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(135),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    borderWidth: 0,
    marginBottom: 12,
  },
  formGroupContainer: {
    width: '100%',
    height: 'auto',
    borderWidth: 0,
    marginBottom: 16,
  },
  buttonGroupContainer: {
    width: '100%',
    height: '10%',
    borderWidth: 0,
  },
});

export default CompleteProfileOrangTuaSection;
