import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BUTTON_COLOR, MAIN_COLOR} from '../../../constants/color';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import ButtonComponent from '../../../component/button';
import { useForm } from 'react-hook-form';

type props = {
  page?: number,
  handlePage?: (op: "next" | "prev") => void,
  children: React.ReactNode,
  title?: string,
  
}

const FormScreenLayout = ({page, handlePage, children, title}: props): React.JSX.Element => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <SafeAreaView>
      <View style={style.mainContainer}>
        <View style={style.headerContainer}>
          {page === 2 && (
            <Icon
              name="angle-left"
              color="#fff"
              size={42}
              style={{marginRight: 12}}
              onPress={() => handlePage("prev")}
            />
          )}
          <Text style={{fontSize: 24, color: '#fff'}}>
            {
              title ?
              title
              :
              'Mohon isi formulir ini dengan lengkap dan akurat!  '
            }
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView  style={style.formContainer}>
              {children}
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View>
          <ButtonComponent
            color={BUTTON_COLOR}
            onPress={() => handlePage("next")}
            title={page === 1 ? 'Selanjutnya' : 'Selesai'}
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
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
  },
  formContainer: {
    width: '100%',
    height: '80%',
  },
});

export default FormScreenLayout;
