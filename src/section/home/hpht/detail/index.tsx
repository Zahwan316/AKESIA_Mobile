import { SafeAreaProvider } from 'react-native-safe-area-context';
import FotoScreenLayout from '../../album_foto/layout';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BUTTON_COLOR, MAIN_COLOR } from '../../../../constants/color';
import ButtonComponent from '../../../../component/button';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../../../../state/user';
import { getCurrentIbu } from '../../../../api/data/currLoggedIbu';
import { useQuery } from '@tanstack/react-query';
import { HphtData } from '../../../../data/hpht';
import { useEffect } from 'react';
import { sumHpht } from '../../../../utils/sumHpht';

export const hphtImageMap: { [key: string]: any } = {
  'week1.png': require('../../../../assets/img/week1.png'),
  'week3.png': require('../../../../assets/img/week3.png'),
  'week5.png': require('../../../../assets/img/week5.png'),
  'week7.png': require('../../../../assets/img/week7.png'),
  'week9.png': require('../../../../assets/img/week9.png'),
  'week10.png': require('../../../../assets/img/week10.png'),
  'week11.png': require('../../../../assets/img/week11.png'),
  'week15.png': require('../../../../assets/img/week15.png'),
  'week21.png': require('../../../../assets/img/week21.png'),
  'week23.png': require('../../../../assets/img/week23.png'),
  'week33.png': require('../../../../assets/img/week33.png'),
  'week37.png': require('../../../../assets/img/week37.png'),
};

const HphtDetailSection = () => {
  const navigator = useNavigation<any>();
  const handleScreen = (screen: string) => {
    navigator.navigate(screen);
  };
  const {data: ibuData} = useQuery({
    queryKey: ['ibuData'],
    queryFn: () => getCurrentIbu(),
  });
  const dataHpht = HphtData.find((item) => item.week.find((items) => items === sumHpht(ibuData?.data?.hpht))) || null;

  useEffect(() => {
    console.log(dataHpht);
  }, [dataHpht]);

  useEffect(() => {
    if(ibuData?.data?.hpht === null){
      handleScreen('Hpht');
    }
  }, []);

  return(
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View style={Style.main}>
          <View style={Style.headerContainer}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <Icon name="chevron-left" size={24}/>
            </TouchableOpacity>
          </View>
          <View style={Style.contentContainer}>
            <View style={Style.contentHeader}>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 8,}}>Usia kehamilan mama saat ini ialah:</Text>
              <View style={Style.weekContainer}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Minggu Ke {sumHpht(ibuData?.data?.hpht)}</Text>
              </View>
            </View>
            <View style={Style.contentImage}>
              {
                dataHpht === null ? (
                  <Image
                    source={require("../../../../assets/img/emptydata.png")}
                    style={{width: '100%', height: '100%'}}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={hphtImageMap[dataHpht.img]}
                    style={{width: '100%', height: '100%'}}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                )
              }
              
            </View>
            <ScrollView style={Style.contentDesc}>
              {
                dataHpht === null ? (
                  <Text style={{fontSize: 16}}>Anda belum mengisi hpht, mohon untuk segera mengisi hpht terlebih dahulu dengan menekan tombol klik</Text>
                ) : (
                  <Text style={{fontSize: 16}}>{dataHpht.description}</Text>
                )
              }
            </ScrollView>
          </View>
          <View>
            <ButtonComponent
              title='Edit'
              color={BUTTON_COLOR}
              onPress={() => handleScreen('Hpht')}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  main: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '6%',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '85%',
  },
  contentHeader: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentImage: {
    width: '100%',
    height: '30%',
    marginBottom: 14,
  },
  contentDesc: {
    width: '100%',
    height: '60%',
    paddingVertical: 2,
    marginBottom: 16,
  },
  weekContainer: {
    width: '40%',
    height: 'auto',
    backgroundColor:
    MAIN_COLOR,
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default HphtDetailSection;
