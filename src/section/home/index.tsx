import { JSX, useEffect, use } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BUTTON_COLOR, BUTTON_COLOR_2, SECONDARY_COLOR, THIRD_COLOR } from '../../constants/color';
import ICON from '../../component/icon';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CarouselComponent from '../../component/carousel';
import { useQuery } from '@tanstack/react-query';
import { getUserLogin } from '../../api/data/user';

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
];

const HomeSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const { data: userData} = useQuery({
    queryKey: ['user'],
    queryFn: getUserLogin,
  });

  const handlePressButton = (screen: string, params?: object) => {
    navigation.navigate(screen, params);
  };

  useEffect(() => {
    console.log(userData);
  });

  return(
    <SafeAreaView>
      <ScrollView>
        <View style={Style.profileContainer}>
          <View style={Style.nameContainer}>
            <Text style={{fontSize: 18, color: "#fff"}}>Hi, {userData?.user?.nama_lengkap}</Text>
            <Image
              source={require('../../assets/icon/bell.png')}
              style={{width: 28, height: 28}}
              resizeMode='contain'
            />
          </View>
          <View style={Style.boxGroupContainer}>
            <TouchableOpacity style={Style.boxContainer}>
              <View style={{width: '30%', height: '100%', marginRight: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/icon/baby.png')}
                  style={{width: "80%", height: "80%"}}
                />
              </View>
              <View>
                {
                  userData.role === 'user' ?
                  <>
                    <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold', marginBottom: 4}}>Babyku</Text>
                    <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>7 Minggu</Text>          
                  </>
                  :
                  <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                    Bidan
                  </Text>
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePressButton('TambahAnak')} style={[Style.boxContainer, {justifyContent: 'center', alignItems: 'center', gap: 4, backgroundColor: BUTTON_COLOR, display: userData?.user?.role === 'bidan' ? 'none' : 'flex'}]}>
              <Icon name='plus-circle' size={26} color='#fff' />
              <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold',}}>Tambah Anak</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Style.menuMainContainer}>
          <View style={Style.menuHeaderContainer}>
            <Text style={{fontSize: 16}}>Fitur Rekomendasi</Text>
          </View>
          <View style={Style.menuContainer}>
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
                  <Text style={{fontSize: 13}}>{item.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        <View style={Style.bannerContainer}>
          <View style={Style.ctaContainer}>
            <Text>Hubungi Kami</Text>
            <Image
              source={require("../../assets/icon/whatsappicon.png")}
            />
          </View>
          <View style={Style.bannerItemContainer}>
            <View style={Style.bannerImgContainer}>
              <Image
                source={require('../../assets/img/banner.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
              />
            </View >
            <View style={Style.bannerImgContainer}>
              <Image
                source={require('../../assets/img/banner2.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  profileContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(25),
    backgroundColor: THIRD_COLOR,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuMainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(40),
    padding: 16,
    borderWidth: 0,
  },
  menuHeaderContainer: {
    width: '100%',
    height: '10%',
    marginBottom: 16,
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
    width: '25%',
    height: '40%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(40),
    borderWidth: 0,
    padding: 15,
    marginBottom: 18,
  },
  nameContainer: {
    width: '100%',
    height: '20%',
    marginBottom: 32,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: SECONDARY_COLOR,
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
    flexDirection: 'row',
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
  }
});

export default HomeSection;
