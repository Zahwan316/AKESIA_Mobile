import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../../../component/button';
import { MAIN_COLOR, WHITE_BACKGROUND_COLOR } from '../../../constants/color';
import ModalComponent from '../../../component/modal';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

type props = {
  title: string,
  children: React.ReactNode,
  onPress: () => void,
  modalHandleModal: () => void,
  modalVisible: boolean,
  modalIsSuccess: boolean,
  modalMessage: string,
  modalText: string
}

const HomeFeatureLayoutSection = (props: props) => {
  const navigate = useNavigation<any>();

  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <ModalComponent
          handleModal={props.modalHandleModal}
          modalVisible={props.modalVisible}
          isSuccess={props.modalIsSuccess}
          message={props.modalMessage}
          text={props.modalText}
        />
        <View style={Style.mainContainer}>
          <View style={Style.headerContainer}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Icon name='chevron-left' style={{color: '#fff', marginRight: 14}} size={26}/>
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fFf'}}>{props.title}</Text>
          </View>
          <View style={Style.contentContainer}>
            {props.children}
          </View>
          <View style={Style.buttonContainer}>
            <ButtonComponent
              onPress={props.onPress}
              title="Simpan"
              color={MAIN_COLOR}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    //padding: 12,
    backgroundColor: MAIN_COLOR,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    //justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    flexDirection: 'row', 
    padding: 16,
  },
  contentContainer: {
    width: '100%',
    height: verticalScale(510),
    paddingVertical: 16,
    backgroundColor: WHITE_BACKGROUND_COLOR,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonContainer: {
    width: '100%',
    height: verticalScale(100),
    padding: 16,
    backgroundColor: WHITE_BACKGROUND_COLOR,
  },
});

export default HomeFeatureLayoutSection;
