import { JSX } from 'react';
import { Alert, Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BUTTON_COLOR, BUTTON_COLOR_2, MAIN_COLOR, SECONDARY_COLOR, THIRD_COLOR, WHITE_BACKGROUND_COLOR } from '../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions, useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { verticalScale } from 'react-native-size-matters';

type item = {
  id: number,
  name: string,
  icon: ImageProps,
  onPress: () => void
}

const ProfileSection = (): JSX.Element => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    signOut();
    EncryptedStorage.removeItem('token');
    //navigation.navigate('Landing');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      })
    );
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };


  const handleButtonLogout = () => {
    Alert.alert('Peringatan!', 'Apakah anda yakin ingin keluar dari akun ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: handleLogout,
      },
    ]);
  };

  const itemFeature: item[] = [
    {
      id: 1,
      name: 'Kebijakan dan Privasi',
      icon: require('../../assets/icon/privacy.png'),
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      id: 2,
      name: 'Keluar',
      icon: require('../../assets/icon/logout.png'),
      onPress: handleButtonLogout,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            <Text style={{fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 12}}>Profile</Text>
            <View style={style.imgProfileContainer}>
              <Image
                source={require('../../assets/img/LogoBidanBunda.png')}
                style={{width: '80%', height: '80%'}}
                resizeMode='contain'
              />
            </View>

          </View>
          <View style={style.menuContainer}>
            {
              itemFeature.map((item, index) =>
                <TouchableOpacity style={style.mainItemContainer} onPress={item.onPress} key={index}>
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%'}}>
                    <View style={style.imgContainer}>
                      <Image
                        source={item.icon}
                        style={{width: '100%', height: '100%'}}
                        resizeMode='contain'
                      />
                    </View>
                    <View style={style.textContainer}>
                      <Text style={{fontSize: 18, color: '#000'}}>{item.name}</Text>
                    </View>
                  </View>
                  <View style={style.iconContainer}>
                    <Icon name="angle-right" size={22} color="#707070" />
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: MAIN_COLOR,
    // padding: 12,
  },
  imgProfileContainer: {
    width: '100%',
    height: '70%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    //justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: WHITE_BACKGROUND_COLOR,
    padding: 22,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  mainItemContainer: {
    width: '100%',
    height: verticalScale(40),
    borderBottomWidth: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 16,
    borderBottomColor: '#90909060',
  },
  imgContainer: {
    width: '10%',
    height: '100%',
    marginRight: 10
  },
  iconContainer: {
    width: '10%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    //width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ProfileSection;
