import {JSX} from 'react';
import {Form} from 'react-hook-form';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputComponent from '../../../component/input/text';
import ButtonComponent from '../../../component/button';
import { BUTTON_COLOR} from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';

const CompleteProfileOrangTuaSection = (): JSX.Element => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 26}}>
                Kenalan dulu yuk Ma! 
              </Text>
              <Image
                source={require('../../../assets/icon/wave-hand.png')}
              />
            </View>
            <Text style={{fontSize: 16, color: '#10101095'}}>
              Biar kita makin dekat dan aplikasi KIA semakin mengerti mama
            </Text>
          </View>
          <View style={style.formGroupContainer}>
            <View>
              <InputComponent
                height={40}
                label="Pilih Status si Mama atau si Dedek... "
                message="Mohon diisi"
                name="status"
                onChange={() => {}}
                placeholder="Status"
                type="text"
                width={'100%'}
                backgroundColor=""
              />
              <InputComponent
                height={40}
                label="Nama ibu"
                message="Mohon diisi"
                name="nama_ibu"
                onChange={() => {}}
                placeholder="Nama Ibu"
                type="text"
                width={'100%'}
                backgroundColor=""
              />
              <InputComponent
                height={40}
                label="NIK"
                message="NIK"
                name="status"
                onChange={() => {}}
                placeholder="Status"
                type="number"
                width={'100%'}
                backgroundColor=""
              />
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'space-between',
                }}>
                <InputComponent
                  height={40}
                  label="Tempat Lahir"
                  message="Tempat Lahir"
                  name="status"
                  onChange={() => {}}
                  placeholder="Tempat Lahir"
                  type="text"
                  width={'45%'}
                  backgroundColor=""
                />
                <InputComponent
                  height={40}
                  label="Tanggal Lahir"
                  message="Tanggal Lahir"
                  name="status"
                  onChange={() => {}}
                  placeholder="Tanggal Lahir"
                  type="text"
                  width={'45%'}
                  backgroundColor=""
                />
              </View>
              <InputComponent
                height={40}
                label="Golongan Darah"
                message="Golongan Darah"
                name="status"
                onChange={() => {}}
                placeholder="Golongan Darah"
                type="text"
                width={'100%'}
                backgroundColor=""
              />
              <InputComponent
                height={40}
                label="Alamat Domisili"
                message="Alamat Domisili"
                name="status"
                onChange={() => {}}
                placeholder="Alamat Domisili"
                type="text"
                width={'100%'}
                backgroundColor=""
              />
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'space-between',
                }}>
                <InputComponent
                  height={40}
                  label="Nomor handphone"
                  message="Nomor handphone"
                  name="status"
                  onChange={() => {}}
                  placeholder="+62"
                  type="number"
                  width={'35%'}
                  backgroundColor=""
                />
                <InputComponent
                  height={40}
                  label=""
                  message="Nomor handphone"
                  name="status"
                  onChange={() => {}}
                  placeholder="Nomor handphone"
                  type="number"
                  width={'60%'}
                  backgroundColor=""
                />
              </View>
              <InputComponent
                  height={40}
                  label="Pendidikan"
                  message="Pendidikan"
                  name="status"
                  onChange={() => {}}
                  placeholder="Pendidikan"
                  type="text"
                  width={'100%'}
                  backgroundColor=""
                />
                <InputComponent
                  height={40}
                  label="Pekerjaan"
                  message="Pekerjaan"
                  name="status"
                  onChange={() => {}}
                  placeholder="Pekerjaan"
                  type="text"
                  width={'100%'}
                  backgroundColor=""
                />
              {/* <View 
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'space-between',
                }}>
                  
              </View>    */}     
            </View>
          </View>
          <View style={style.buttonGroupContainer}>
            <ButtonComponent 
              title='Simpan'
              onPress={handleButton}
              color={BUTTON_COLOR}
              customstyle={{fontSize: 14}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(115),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    borderWidth: 0,
    marginBottom: 12,
  },
  formGroupContainer: {
    width: '100%',
    height: '84%',
    borderWidth: 0,
  },
  buttonGroupContainer: {
    width: '100%',
    height: '10%',
    borderWidth: 0,
  },
});

export default CompleteProfileOrangTuaSection;
