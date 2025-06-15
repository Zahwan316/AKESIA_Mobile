import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BUTTON_COLOR, MAIN_COLOR, SECONDARY_COLOR, TEXT_HEADER_COLOR, TEXT_HEADER_COLOR_2 } from '../../constants/color';
import ButtonComponent from '../../component/button';
import { useNavigation } from '@react-navigation/native';
import { Config } from 'react-native-config'

const LandingSection = (): React.JSX.Element => {
  const [selected, setSelected] = useState('orangtua');
  const navigation = useNavigation();

  const handleSelected = (select: string) => {
    setSelected(select);
  };

  const handleNextPage = () => {
    if(selected === "") return;
    navigation.navigate("Login", {
      selectedUser: selected,
    });
  };

  return(
    <SafeAreaView>
      <View>
        {/* IMG CONTAINER */}
        <View style={style.imgContainer}>
          <Image
            source={require('../../assets/img/LogoBidanBunda.png')}
            style={style.imgLogo}
            resizeMethod='resize'
            resizeMode='contain'
          />
        </View>

        {/* FORM CONTAINER */}
        <View style={style.formContainer}>
          <View style={style.formMainContainer}>
            {/* FORM HEADER */}
            <View style={style.formHeaderContainer}>
              <Text style={style.header1}>
                Selamat datang di
              </Text>
              <Text className='font-bold' style={style.header2}>
                AKESIA
              </Text>
              <Text style={style.header3}>
                Aplikasi kesehatan ibu dan anak
              </Text>
            </View>
            {/* FORM TITLE */}
            <View style={style.formTitleContainer}>
              <Text style={style.formTitle}>
                Masuk sebagai pengguna berikut:
              </Text>
              {/* <Text style={{fontSize: 10}}>{Config.API_URL}</Text> */}
            </View>
            {/* FORM SELECTION */}
            <View style={style.formSelectionContainer}>
              <TouchableOpacity style={style.formSelection} id='orangtua' onPress={() => handleSelected('orangtua')}>
                <Image
                  source={require('../../assets/img/OrangTua.png')}
                  style={[style.formSelectionImage, {opacity: selected === 'orangtua' ? 1 : 0.4}]}
                />
                <Text style={{color: selected === 'orangtua' ? TEXT_HEADER_COLOR_2 : "#000"}}>Orang Tua</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.formSelection} id='bidan' onPress={() => handleSelected('bidan')}>
                <Image
                  source= {require('../../assets/img/bidan.png')}
                  style={[style.formSelectionImage, {opacity: selected === 'bidan' ? 1 : 0.4}]}
                />
                <Text style={{color: selected === 'bidan' ? TEXT_HEADER_COLOR_2 : "#000"}}>Bidan</Text>
              </TouchableOpacity>
            </View>
            <ButtonComponent title='Selanjutnya' color={BUTTON_COLOR} onPress={handleNextPage} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Regular'
  },
  imgContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: SECONDARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '55%',
    height: '85%',
    borderRadius: 0,
    borderWidth: 0,
  },
  formContainer: {
    width: '100%',
    height: '65%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    borderWidth: 0,
  },
  formMainContainer: {
    width: '100%',
    padding: 12,
    paddingTop: 32,
    height: '100%',
    position: 'absolute',
    backgroundColor: '#f4f4f4',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
  },
  formHeaderContainer: {
    textAlign: 'center',
    borderWidth: 0,
    width: '100%',
    marginBottom: 18,
  },
  header1: {
    fontSize: 18,
    textAlign: 'center',
  },
  header2: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: TEXT_HEADER_COLOR,
  },
  header3: {
    fontSize: 18,
    textAlign: 'center',
    color: TEXT_HEADER_COLOR_2,
    fontWeight: 'bold',
  },
  formTitleContainer: {
    width: '100%',
    marginBottom: 16,
  },
  formTitle: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 13,
  },
  formSelectionContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSelection: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSelectionImage: {
    width: '50%',
    height: '65%',
    marginBottom: 8,
  },
});

export default LandingSection;
