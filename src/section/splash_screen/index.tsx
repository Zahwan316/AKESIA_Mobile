import { useNavigation, useRoute } from "@react-navigation/native";
import { JSX, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaFrameContext, SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Axios from '../../api/axios';
import EncryptedStorage from "react-native-encrypted-storage";

const SplashScreenSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const router = useRoute();
  const token = EncryptedStorage.getItem('token');
  const {screen_from = null, selectedUser = null} = router.params as {screen_from: string, selectedUser: string} || {};

  useEffect(() => {
    console.log(token);
    const handleCheck = async() => {
      try{
        const responseToken = await Axios.get('checktoken');
        if(responseToken?.data){
          const responseUser = await Axios.get('checkiscompleteprofile');
          const isCompleteProfile = responseUser?.data?.isCompleteProfile;
          const getRole = responseToken?.data?.user?.role;
          if(!isCompleteProfile){
            switch(getRole){
              case 'user':
                navigation.navigate('ProfileOrangTua');
                break;
              case 'bidan':
                navigation.navigate('ProfileBidan');
                break;
            }
          }
          else{
            if(responseToken?.data?.isValid){
              navigation.navigate('BottomTabs');
            }
            else{
              navigation.navigate('Landing');
            }
          }
        }
        else{
          if(responseToken?.data?.isValid){
            navigation.navigate('BottomTabs');
          }
          else{
            navigation.navigate('Landing');
          }
        }
      }
      catch(e){
        console.log(e);
      }
    };

    handleCheck();
  },[navigation, screen_from, selectedUser]);

  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={style.mainContainer}>
          <View style={style.imgContainer}>
            <Image
              source={require('../../assets/img/LogoBidanBunda.png')}
            />
          </View>
          <View style={style.textContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 32, color: '#fff'}}>AKESIA Mobile</Text>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Aplikasi Kesehatan Ibu & Anak</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#A778B7',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
    top: 0,
    borderWidth: 0,
  },
  textContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
});

export default SplashScreenSection;
