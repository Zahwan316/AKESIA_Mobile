import {JSX, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BUTTON_COLOR,
  BUTTON_COLOR_2,
  MAIN_COLOR,
  TEXT_HEADER_COLOR,
} from '../../constants/color';
import InputComponent from '../../component/input/text';
import RadioInputComponent from '../../component/input/radio';
import ButtonComponent from '../../component/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import handleFormStore from '../../state/form';
import Axios from '../../api/axios';
import { shallow } from 'zustand/shallow';
import { useForm } from 'react-hook-form';
import ModalComponent from '../../component/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleContentModal from '../../component/modal/function';
import EncryptedStorage from 'react-native-encrypted-storage';

type registerProps = {
  onChange: (name: string, value: any) => void;
  control: any,
};

const RegisterLayout = (props: registerProps) => {
  return (
    <>
      <InputComponent
        width="100%"
        height="auto"
        backgroundColor={MAIN_COLOR}
        label={'Email'}
        onChange={props.onChange}
        name="email"
        message="Email harus diisi"
        placeholder="Nama Anda"
        type="email"
        control={props.control}
      />
      <InputComponent
        width="100%"
        height="auto"
        backgroundColor={MAIN_COLOR}
        label={'Password'}
        onChange={props.onChange}
        name="password"
        message="Password harus diisi"
        placeholder="Password Anda"
        type="password"
        control={props.control}
      />
      <InputComponent
        width="100%"
        height="auto"
        backgroundColor={MAIN_COLOR}
        label={'Konfirmasi Password'}
        onChange={props.onChange}
        name="password_confirmation"
        message="Password harus diisi"
        placeholder="Password Anda"
        type="password"
        control={props.control}
      />
    </>
  );
};

const LoginLayout = (props: registerProps) => {
  return (
    <>
      <InputComponent
        width="100%"
        height="auto"
        backgroundColor={MAIN_COLOR}
        label={'Email'}
        onChange={props.onChange}
        name="email"
        message="Email harus diisi"
        placeholder="Email Anda"
        type="text"
        control={props.control}
      />
      <InputComponent
        width="100%"
        height="auto"
        backgroundColor={MAIN_COLOR}
        label={'Password'}
        onChange={props.onChange}
        name="password"
        message="Password harus diisi"
        placeholder="Password Anda"
        type="password"
        control={props.control}
      />
    </>
  );
};

type modalInfo = {
  message: string;
  text: string; 
}

const LoginSection = (): JSX.Element => {
  const [currSelect, setcurrSelect] = useState('login');
  const [successLogin, setSuccessLogin] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({message:'', text: ''});
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {selectedUser} = route.params as {selectedUser: string};
  const setForm = handleFormStore((state) => state.setForm);
  const resetForm = handleFormStore((state) => state.resetForm);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleSelected = (select: string) => {
    setcurrSelect(select);
  };

  const onSubmit = async(data: any) => {
    console.log('Data Form:', data);
    //handleLogin(data);
  };

  const handleLogin = async(data: []) => {
    try{
      const response = await Axios.post('login', data);
      console.log(response.data);
      EncryptedStorage.setItem('token', response.data.token);
      setSuccessLogin(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Lanjutkan',
      });
    }
    catch(e){
      console.log('Login Error:', e);
      const errorMessage = e?.response?.data?.message || 'Terjadi kesalahan saat login. Coba lagi nanti.';
      setSuccessLogin(false);
      handleContentModal({
        setModal,
        setModalInfo,
        message: errorMessage,
        text: 'Tutup',
      });
    }
  };

  const handleSplashScreen = () => {
    if(successLogin){
      navigation.navigate('SplashScreen', {
        selectedUser: selectedUser,
        screen_from: 'login',
      });
    }
    else{
      setModal(!modal);
    }
  };

  return (
    <SafeAreaView>
      <ModalComponent
        isSuccess={successLogin}
        handleModal={handleSplashScreen}
        modalVisible={modal}
        message={modalInfo.message}
        text={modalInfo.text}
      />
      <View style={style.mainContainer}>
        <View style={style.imgContainer}>
          <View style={style.imgWrapper}>
            <Image
              source={require('../../assets/img/LogoBidanBunda.png')}
              style={style.imgLogo}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View style={style.headingContainer}>
            <Text style={style.heading1}>Lahir dengan cinta,</Text>
            <Text style={style.heading1}>Tumbuh dengan bahagia</Text>
          </View>
        </View>
        {/*  */}
        <View style={style.formContainer}>
          <View style={style.buttonGroup}>
            <TouchableOpacity
              style={[
                style.buttonRadio,
                {
                  backgroundColor:
                    currSelect === 'login' ? BUTTON_COLOR_2 : '#fff',
                },
              ]}
              onPress={() => handleSelected('login')}>
              <Text
                style={{
                  color: currSelect === 'login' && '#fff',
                  fontWeight: 'bold',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.buttonRadio,
                {
                  backgroundColor:
                    currSelect === 'register' ? BUTTON_COLOR_2 : '#fff',
                  display: selectedUser === 'bidan' ? 'none' : 'flex'
                },
              ]}
              onPress={() => handleSelected('register')}>
              <Text
                style={{
                  color: currSelect === 'register' && '#fff',
                  fontWeight: 'bold',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={style.formGroup}>
            {currSelect === 'login' ? (
              <LoginLayout onChange={setForm} control={control} />
            ) : (
              <RegisterLayout onChange={setForm} control={control}/>
            )}
          </View>
          <View style={[style.agreeTermContainer, {position: 'relative', top: currSelect === "register" ? 64 : 0, zIndex: 4}]}>
            <RadioInputComponent
              customstyle={{borderColor: '#606060', marginRight: 8}}
              innerstyle={{backgroundColor: MAIN_COLOR}}
            />
            <Text style={{fontSize: 12}}>
              l agree with the Terms of Service & Privacy Policy
            </Text>
          </View>
          <View style={[style.agreeTermContainer, {position: 'relative', top: 60, zIndex: 4, display: 'flex', justifyContent: 'center'}]}>
            <ButtonComponent
              title={currSelect === 'login' ? 'Sign In' : 'Sign Up'}
              color={BUTTON_COLOR}
              onPress={handleSubmit(onSubmit)}
              customstyle={{width: '100%'}}
            />
          </View>
          <View style={style.bottomContainer}>
            <View style={{marginBottom: 8}}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icon/google.png')}
                  style={{width: 44, height: 44}}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '90%'}}>
              <Text style={{ textAlign: 'center', color:'#20202095', fontSize: 12 }}>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    borderWidth: 0,
  },
  imgContainer: {
    width: '100%',
    height: '35%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imgWrapper: {
    borderWidth: 0,
    width: '80%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '80%',
    height: '80%',
  },
  headingContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading1: {
    fontWeight: 700,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    borderWidth: 0,
    width: '100%',
    height: '75%',
    display: 'flex',
    alignItems: 'center',
  },
  buttonGroup: {
    width: '90%',
    height: '8%',
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#505050',
    borderWidth: 0,
    borderRadius: 8,
    marginBottom: 12,
    position: 'relative'
  },
  buttonRadio: {
    backgroundColor: '#fff',
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
  },
  formGroup: {
    width: '90%',
    height: '30%',
    borderWidth: 0,
    marginBottom: 2,
    position: 'relative'
  },
  agreeTermContainer: {
    width: '90%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative'
  },
  bottomContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: MAIN_COLOR,
    borderWidth: 0,
    display: 'flex',
    //position: 'absolute',
    bottom: 0,
    top: 26,
    alignItems: 'center',
    padding: 36
  },
});

export default LoginSection;
