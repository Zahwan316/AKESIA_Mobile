import { JSX } from 'react';
import { Button, DimensionValue, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BUTTON_COLOR, BUTTON_COLOR_2, MAIN_COLOR } from '../../../constants/color';
import InputComponent from '../../../component/input/text';
import ButtonComponent from '../../../component/button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';
import textInputProps from '../../../type/input/text';

const formBidan: textInputProps[] = [
  {
    width:'100%',
    height:'auto',
    label:'Provinsi Domisili',
    message:'Wajib Diisi',
    name:'provinsi_domisili',
    onChange:() => {},
    placeholder:'Jawa Barat...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'Kota Domisili',
    message:'Wajib Diisi',
    name:'kota_domisili',
    onChange:() => {},
    placeholder:'Bandung...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'Jenis Praktik',
    message:'Wajib Diisi',
    name:'jenis_praktik',
    onChange:() => {},
    placeholder:'Jawa Barat...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'Tempat Bekerja',
    message:'Wajib Diisi',
    name:'tempat_bekerja',
    onChange:() => {},
    placeholder:'...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'Nama Jenis Praktik',
    message:'Wajib Diisi',
    name:'nama_tempat_praktik',
    onChange:() => {},
    placeholder:'...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'Status Keanggotaan IBI',
    message:'Wajib Diisi',
    name:'status_keanggotaan_ibi',
    onChange:() => {},
    placeholder:'...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width:'100%',
    height:'auto',
    label:'No STR',
    message:'Wajib Diisi',
    name:'no_str',
    onChange:() => {},
    placeholder:'...',
    type:'text',
    backgroundColor:'',
    border:1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Unggah Selfie',
    message: '',
    name: '',
    onChange: () => {},
    placeholder: '',
    type: 'textarea',
    backgroundColor: '',
    border:1,
  },
];

const CompleteProfileBidanSection = (): JSX.Element => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.navigate('Home');
  };

  return(
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: BUTTON_COLOR_2, textAlign: 'center'}}>Lengkapi data bidan</Text>
          </View>
          <View style={style.formContainer}>
            {
              formBidan.map((item, index) => (
                <InputComponent
                  width={item.width}
                  height={item.height}
                  label={item.label}
                  message={item.message}
                  name={item.name}
                  onChange={item.onChange}
                  placeholder={item.placeholder}
                  type={item.type}
                  backgroundColor={item.backgroundColor}
                  key={index}
                  border={item.border}
                />
              ))
            }
            <View style={style.checkboxContainer}>
              <BouncyCheckbox
                fillColor="#000"
              />
              <Text>Saya setuju data yang saya isikan benar</Text>
            </View>
          </View>
          <ButtonComponent
            color={MAIN_COLOR}
            onPress={handleButton}
            title="Daftar"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(125),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '5%',
    borderWidth: 0,
  },
  formContainer: {
    width: '100%',
    height: '90%',
    borderWidth: 0,
    marginBottom: 8,
  },
  checkboxContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default CompleteProfileBidanSection;
