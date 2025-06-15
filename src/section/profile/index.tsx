import { JSX } from 'react';
import { Alert, Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MAIN_COLOR } from '../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions, useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
            <Text style={{fontSize: 32, fontWeight: 'bold', color: '#fff'}}>Profil</Text>
          </View>
          <View style={style.menuContainer}>
            {
              itemFeature.map((item, index) =>
                <TouchableOpacity style={style.mainItemContainer} onPress={item.onPress} key={index}>
                  <View style={style.imgContainer}>
                    <Image
                      source={item.icon}
                      style={{width: '100%', height: '100%'}}
                      resizeMode='contain'
                    />
                  </View>
                  <View style={style.textContainer}>
                    <Text style={{fontSize: 18,}}>{item.name}</Text>
                  </View>
                  <View style={style.iconContainer}>
                    <Icon name="angle-right" size={28} color="#000" />
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
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '20%',
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
  },
  mainItemContainer: {
    width: '100%',
    height: '8%',
    borderWidth: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  imgContainer: {
    width: '25%',
    height: '100%',
  },
  iconContainer: {
    width: '10%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default ProfileSection;
