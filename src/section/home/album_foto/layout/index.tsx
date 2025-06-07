import { useNavigation, useRoute } from '@react-navigation/native';
import { JSX, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ModalComponent from '../../../../component/modal';
import { View } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import PopupImageComponent from '../component/Popup';
import useComponentStore from '../../../../state/component';

type props = {
  title: string,
  children: React.ReactNode,
  modalHandleModal: () => void,
  modalVisible: boolean,
  modalIsSuccess: boolean,
  modalMessage: string,
  modalText: string
}

const FotoScreenLayout = (props: props):JSX.Element => {
  const popup = useComponentStore((state) => state.popup);
  
  

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
            {/* <TouchableOpacity onPress={() => navigate.goBack()}>
              <Icon name='chevron-left' size={26}/>
            </TouchableOpacity> */}
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{props.title}</Text>
            {/* <View></View> */}
          </View>
          <View style={Style.contentContainer}>
            {props.children}
          </View>
        </View>
        {
          popup &&
          <PopupImageComponent />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '6%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    flexDirection: 'row',
  },
  contentContainer: {
    width: '100%',
    height: '94%',
    paddingVertical: 16,
   /*  display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row', */
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
  },
});

export default FotoScreenLayout;
