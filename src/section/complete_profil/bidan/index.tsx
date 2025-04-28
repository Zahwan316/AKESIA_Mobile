import { JSX } from 'react';
import { Button, DimensionValue, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { BUTTON_COLOR, BUTTON_COLOR_2, MAIN_COLOR } from '../../../constants/color';
import InputComponent from '../../../component/input/text';
import ButtonComponent from '../../../component/button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';

type formProperties = {
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  message: string,
  name: string,
  onChange: () => void,
  placeholder: string,
  type: string,
  backgroundColor: string
}

const formBidan: formProperties[] = [
  {
    width:'100%',
    height:38,
    label:'Provinsi Domisili',
    message:'Wajib Diisi',
    name:'provinsi_domisili',
    onChange:() => {},
    placeholder:'Jawa Barat...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'Kota Domisili',
    message:'Wajib Diisi',
    name:'kota_domisili',
    onChange:() => {},
    placeholder:'Bandung...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'Jenis Praktik',
    message:'Wajib Diisi',
    name:'jenis_praktik',
    onChange:() => {},
    placeholder:'Jawa Barat...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'Tempat Bekerja',
    message:'Wajib Diisi',
    name:'tempat_bekerja',
    onChange:() => {},
    placeholder:'...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'Nama Jenis Praktik',
    message:'Wajib Diisi',
    name:'nama_tempat_praktik',
    onChange:() => {},
    placeholder:'...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'Status Keanggotaan IBI',
    message:'Wajib Diisi',
    name:'status_keanggotaan_ibi',
    onChange:() => {},
    placeholder:'...',
    type:'',
    backgroundColor:'',
  },
  {
    width:'100%',
    height:38,
    label:'No STR',
    message:'Wajib Diisi',
    name:'no_str',
    onChange:() => {},
    placeholder:'...',
    type:'',
    backgroundColor:'',
  },
  {
    width: '100%',
    height: 156,
    label: 'Unggah Selfie',
    message: '',
    name: '',
    onChange: () => {},
    placeholder: '',
    type: '',
    backgroundColor: '',
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
    height: heightPercentageToDP(115),
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
    marginBottom: 8
  },
  checkboxContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  }
});

export default CompleteProfileBidanSection