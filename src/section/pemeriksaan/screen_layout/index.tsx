import {StyleSheet} from 'react-native';
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

type props = {
  page?: number,
  handlePage?: (op: "next" | "prev") => void,
  children: React.ReactNode,
}

const FormScreenLayout = ({page, handlePage, children}: props): React.JSX.Element => {
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
            Mohon isi formulir ini dengan lengkap dan akurat!
          </Text>
        </View>
        <View style={style.formContainer}>
          {children}
        </View>
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
