import { JSX, useEffect, use } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BUTTON_COLOR, BUTTON_COLOR_2, FOURTH_COLOR, MAIN_COLOR, SECONDARY_COLOR, TEXT_COLOR, THIRD_COLOR, WHITE_BACKGROUND_COLOR } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useQuery } from '@tanstack/react-query';
import { getUserLogin } from '../../api/data/user';
import useUserStore from '../../state/user';
import ImageSlider from '../../component/img_slider';
import { getData } from '../../api/data/getData';
import useComponentStore from '../../state/component';
import { BASE_URL } from '../../constants/baseurl';
import { sumHpht } from '../../utils/sumHpht';
import requestNotificationPermission from '../../function/request_notification';
import { requestFCMToken } from '../../function/fcm_token';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type menu = {
  name: string,
  icon: ImageSourcePropType,
  screen: string,
  role: string,
  onChange?: () => void,
  params?: object,
}

const menuList: menu[] = [
  {
    name: 'Buat Janji',
    icon: require('../../assets/icon/buat_janji.png'),
    screen: 'JanjiKita',
    role: 'user',
  },
  {
    name: 'Data Bayi',
    icon: require('../../assets/icon/databayi.png'),
    screen: 'TambahAnak',
    role: 'user',
    params: {
      screenType: 'edit_anak',
    },
  },
  {
    name: 'Pemeriksaan',
    icon: require('../../assets/icon/pemeriksaan.png'),
    screen: 'ListJanji',
    role: 'bidan',
  },
  {
    name: 'Berat Mama',
    icon: require('../../assets/icon/berat_mama_icon.png'),
    screen: 'BeratMama',
    role: 'user',
  },
  {
    name: 'Ubah Data Ibu',
    icon: require('../../assets/icon/data_ibu_icon.png'),
    screen: 'DataIbu',
    role: 'user',
  },
  {
    name: 'Album Foto Kita',
    icon: require('../../assets/icon/album_foto_icon.png'),
    screen: 'AlbumFotoJanin',
    role: 'user',
  },
  {
    name: 'Riwayat Buku KIA',
    icon: require('../../assets/icon/riwayat_buku_kia.png'),
    screen: 'RiwayatKehamilanGroup',
    role: 'user',
  },
];

const HomeSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const popup = useComponentStore((state) => state.popup);
  const popup_img = useComponentStore((state) => state.popup_img);
  const setPopup = useComponentStore((state) => state.setPopup);
  const setPopupImg = useComponentStore((state) => state.setPopupImg);
  const { data: userData} = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogin,
  });
  const {data: ibuData} = useQuery({
    queryKey: ['ibuData'],
    queryFn: () => getData(`ibu/getCurrIbu`),
  });
  const {data: bidanData} = useQuery({
    queryKey: ['bidanData'],
    queryFn: () => getData(`getCurrBidan`),
  });
  const { data: bannerData} = useQuery({
    queryKey: ['banner'],
    queryFn: () => getData('banner'),
  });
  const handleUser = useUserStore((state) => state.handleUser);
  const handleIbu = useUserStore((state) => state.handleIbu);
  const handleBidan = useUserStore((state) => state.handleBidan);

  const handlePressButton = (screen: string, params?: object) => {
    navigation.navigate(screen, params);
  };

  const handleClosePopUp = () => {
    setPopup(false);
    setPopupImg('');
  };

  const handleOpenHpht = (role: string) => {
    if(role === 'bidan'){
      return;
    }

    handlePressButton('HphtDetail');
  };

  useEffect(() => {
    const setUser = () => {
      if(userData && userData?.user != null){
        const data = userData?.user;
        for(const key in data){
          handleUser(key, data[key]);
        }
      }
    };
    setUser();
    console.log(userData)
  }, [userData, handleUser]);

  useEffect(() => {
    const setIbu = () => {
      if(ibuData && ibuData?.data != null){
        const data = ibuData?.data;
        for(const key in data){
          handleIbu(key, data[key]);
        }
      }
    };
    setIbu();
  }, [ibuData, handleIbu]);

  useEffect(() => {
    const setBidan = () => {
      if(bidanData && bidanData?.data != null){
        const data = bidanData?.data;
        for(const key in data){
          handleBidan(key, data[key]);
        }
      }
    };
    setBidan();
  }, [bidanData, handleBidan]);

  useEffect(() => {
    requestNotificationPermission();
    requestFCMToken();
  }, []);

  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView stickyHeaderIndices={[3]} style={{width: widthPercentageToDP(100), backgroundColor: MAIN_COLOR}}>
          <View style={Style.profileContainer}>
            {/* Name Container */}
            <View style={Style.nameContainer}>
              <Text style={{fontSize: 20, color: "#fff", fontWeight: 'bold'}}>Halo, {userData?.user?.nama_lengkap}</Text>
              <TouchableOpacity onPress={() => handlePressButton('Notifikasi')}>
                <Image
                  source={require('../../assets/icon/bell.png')}
                  style={{width: 28, height: 28}}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
            {/* Box Menu Container */}
            <View style={Style.boxGroupContainer}>
              {/* Bayiku Button */}
              <TouchableOpacity
                style={Style.boxContainer}
                onPress={() => handleOpenHpht(userData?.user?.role)}>
                <View style={{width: '30%', height: '100%', marginRight: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/icon/baby.png')}
                    style={{width: "80%", height: "80%"}}
                  />
                </View>
                <View style={{height: '100%', width: '70%', display: 'flex', justifyContent: 'center'}}>
                  {
                    userData?.user?.role === 'user' ?
                    <>
                      <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold', marginBottom: 4}}>Bayiku</Text>
                      <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>{sumHpht(ibuData?.data?.hpht)} Minggu</Text>
                    </>
                    :
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                      Bidan
                    </Text>
                  }
                </View>
              </TouchableOpacity>
              {/* Tambah Anak Button */}
              <TouchableOpacity
                onPress={() => handlePressButton('TambahAnak')} 
                style={[Style.boxContainer, {justifyContent: 'center', alignItems: 'center', gap: 4, backgroundColor: BUTTON_COLOR, display: userData?.user?.role === 'bidan' ? 'none' : 'flex'}]}>
                <Icon name='plus-circle' size={26} color='#fff' />
                <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold',}}>Tambah Anak</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Style.menuMainContainer}>
            <View style={Style.menuHeaderContainer}>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 0, color: TEXT_COLOR}}>Fitur Rekomendasi</Text>
            </View>
            <View style={[Style.menuContainer, {justifyContent: userData?.user?.role === 'bidan' ? 'center' : 'flex-start'}]}>
              {
                menuList.map((item, index) => (
                  item.role === userData?.user?.role &&
                  <TouchableOpacity style={Style.menuItemContainer} key={index} onPress={() => handlePressButton(item.screen, item.params)}>
                    <View style={{width: "100%", height: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 4}}>
                      <Image
                        source={item.icon}
                        style={{width: "100%", height: "100%"}}
                        resizeMethod="auto"
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{width: '100%', height: '30%'}}>
                      <Text style={{fontSize: 13, textAlign: 'center'}}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
          <View style={Style.bannerContainer}>
            <View style={Style.bannerItemContainer}>
              <Text style={{fontSize: 18, marginBottom: 12, fontWeight: 'bold', color: TEXT_COLOR}}>Informasi Terkini</Text>
              {
                bannerData?.data?.length != 0 ?
                <ImageSlider
                  images={bannerData?.data}
                />
                :
                null
              }
            </View>
          </View>
          <TouchableOpacity style={[Style.popupContainer, {display: popup ? 'flex' : 'none'}]} onPress={handleClosePopUp}>
            <Text style={{color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 42}}>Klik untuk menutup</Text>
            <Image
              source={{uri: `${BASE_URL}${popup_img}`}}
              resizeMode="contain"
              style={{width: '100%', height: '50%'}}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  profileContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(25),
    backgroundColor: MAIN_COLOR,
    /* borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18, */
    padding: 16,
    paddingVertical: 24,
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuMainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(45),
    padding: 16,
    borderWidth: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: WHITE_BACKGROUND_COLOR
  },
  menuHeaderContainer: {
    width: '100%',
    height: '10%',
    marginBottom: 8,
  },
  menuContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 0,
  },
  menuItemContainer: {
    width: '22%',
    height: '40%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(80),
    borderWidth: 0,
    padding: 15,
    marginBottom: 18,
    backgroundColor: WHITE_BACKGROUND_COLOR,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18, 
  },
  nameContainer: {
    width: '100%',
    height: '20%',
    marginBottom: 32,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  boxGroupContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxContainer: {
    width: '45%',
    height: '70%',
    backgroundColor: FOURTH_COLOR,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  ctaContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  bannerItemContainer: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  bannerImgContainer: {
    width: '50%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    zIndex: 15,
    backgroundColor: '#10101099',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default HomeSection;
