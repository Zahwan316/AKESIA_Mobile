import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BUTTON_COLOR,
  BUTTON_COLOR_2,
  BUTTON_COLOR_3,
  MAIN_COLOR,
} from '../../../constants/color';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';
import ButtonComponent from '../../../component/button';
import {useForm} from 'react-hook-form';
import ModalComponent from '../../../component/modal';

type props = {
  page?: number;
  handlePage?: (op: 'next' | 'prev') => void;
  children: React.ReactNode;
  title?: string;
  modalVisible: boolean;
  modalIsSuccess: boolean;
  modalHandleModal: () => {};
  modalMessage: string;
  modalText: string;
  header: string;
  created_at: string;
  updated_at: string;
};

const FormScreenLayout = ({
  header,
  page,
  handlePage,
  children,
  title,
  modalIsSuccess,
  modalHandleModal,
  modalVisible,
  modalMessage,
  modalText,
  created_at,
  updated_at
}: props): React.JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  return (
    <SafeAreaView>
      <ModalComponent
        message={modalMessage}
        text={modalText}
        modalVisible={modalVisible}
        isSuccess={modalIsSuccess}
        handleModal={modalHandleModal}
      />
      <View style={style.mainContainer}>
        <View style={style.headerContainer}>
          <View style={style.textHeaderContainer}>
            {page === 2 && (
              <Icon
                name="angle-left"
                color="#fff"
                size={38}
                style={{marginRight: 12}}
                onPress={() => handlePage('prev')}
              />
            )}
            <Text
              style={{
                fontSize: 24,
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: 4,
              }}>
              {header}
            </Text>
            <Text style={{fontSize: 16, color: '#fff', textAlign: 'center'}}>
              {title
                ? title
                : 'Mohon isi formulir ini dengan lengkap dan akurat!  '}
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={style.formContainer}>{children}</ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={style.buttonContainer}>
          <View style={style.widgetContainer}>
            <Text style={{fontSize: 13}}>Dibuat pada <Text style={{fontWeight: 'bold'}}>{created_at}</Text></Text>
            <Text style={{fontSize: 13}}>Diedit pada <Text style={{fontWeight: 'bold'}}>{updated_at}</Text></Text>
          </View>
          <ButtonComponent
            color={BUTTON_COLOR_3}
            onPress={() => handlePage('next')}
            title={page === 1 ? 'Selanjutnya' : 'Simpan'}
            customstyle={{width: '100%', height: 'auto'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: MAIN_COLOR,
    padding: 0,
  },
  headerContainer: {
    width: '100%',
    height: '18%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderWidth: 0,
  },
  textHeaderContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    padding: 12,
  },
  timeWidget: {
    width: 'auto',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  widgetContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonContainer: {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 0,
  },
});

export default FormScreenLayout;
