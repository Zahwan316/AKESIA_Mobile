import {JSX, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import InputComponent from '../../../component/input/text';
import InputDatePickerComponent from '../../../component/input/datepicker';
import ButtonComponent from '../../../component/button';
import {BUTTON_COLOR, MAIN_COLOR} from '../../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';

const Page1 = (OnChange: () => void, data: Array<Object>): JSX.Element => {
  return (
    <>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nama Anak"
        message="Harap diisi"
        name="nama_anak"
        onChange={OnChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Anak Ke"
          message="Harap diisi"
          name="anak_ke"
          onChange={OnChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Golongan Darah"
          message="Harap diisi"
          name="golongan_darah"
          onChange={OnChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
      </View>
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nomor Akta Kelahiran"
        message="Harap diisi"
        name="no_akta_kelahiran"
        onChange={OnChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Nomor Induk Kependudukan"
        message="Harap diisi"
        name="no_induk_kependudukan"
        onChange={OnChange}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#000'}
        textColor={''}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <InputComponent
          height={'auto'}
          width={'45%'}
          label="Tempat Lahir"
          message="Harap diisi"
          name="tempat_lahir"
          onChange={() => {}}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
        <InputDatePickerComponent
          label="Tanggal Lahir"
          onChange={() => {}}
          customStyle={{width: '45%', height: 'auto'}}
          labelColor='#000'
        />
      </View>
    </>
  );
};

const Page2 = (OnChange: () => void, data: Array<Object>): JSX.Element => {
  return (
    <>
      <View>
        <Text style={style.headerFormText}>Primer</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Bayi"
          message="Harap diisi"
          name="nomor_registrasi_kohort"
          onChange={OnChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Balita & Anak Pra-Sekolah"
          message="Harap diisi"
          name="nomor_registrasi_kohort_balita"
          onChange={OnChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
      </View>
      <View>
        <Text style={style.headerFormText}>Puskesmas Domisili</Text>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nomor Registrasi Kohort Ibu"
          message="Harap diisi"
          name="nomor_registrasi_kohort_ibu"
          onChange={OnChange}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#000'}
          textColor={''}
        />
      </View>
    </>
  );
};

const TambahAnakSection = (): JSX.Element => {
  const [page, setpage] = useState<number>(1);

  useEffect(() => {
    if (page <= 1) {
      setpage(1);
    } else if (page >= 2) {
      setpage(2);
    }
  }, [page]);

  const handlePage = (operator: string) => {
    if (operator === 'next') {
      setpage(prev => prev + 1);
    } else {
      setpage(prev => prev - 1);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            {
              page === 2 ? (
                <Icon name='angle-left' size={32} color='#000' onPress={handlePage.bind(null, 'prev')}/>
              ) :
              null
            }
            <View style={{width: '100%', paddingHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Hai, Bunda dan Dedek!
              </Text>
              <Text style={{fontSize: 15, color: '#10101096'}}>
                waktunya manjakan Dedek dengan perawatan penuh cinta
              </Text>
            </View>
          </View>
          <View style={style.formContainer}>
            {page === 1 ? Page1(() => {}, []) : Page2(() => {}, [])}
          </View>
          <View style={style.buttonContainer}>
            <ButtonComponent
              color={MAIN_COLOR}
              title={page === 1 ? 'Selanjutnya' : 'Selesai'}
              onPress={handlePage.bind(null, 'next')}
            />
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
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  formContainer: {
    width: '100%',
    height: '80%',
  },
  buttonContainer: {},
  headerFormText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default TambahAnakSection;
