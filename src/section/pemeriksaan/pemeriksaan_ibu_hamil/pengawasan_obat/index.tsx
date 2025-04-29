import { JSX } from 'react/jsx-runtime';
import FormScreenLayout from '../../screen_layout';
import { View } from 'react-native';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';

const PengawasanObatSection = (): JSX.Element => {
  return(
    <FormScreenLayout>
      <View>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Bulan ke"
          message="Harap diisi"
          name="bulan"
          onChange={() => {}}
          placeholder="Contoh: 09:30"
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
        <InputDatePickerComponent label="Tanggal" onChange={() => {}} />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Jam"
          message="Harap diisi"
          name="jam"
          onChange={() => {}}
          placeholder="Contoh: 09:30"
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
      </View>
    </FormScreenLayout>
  );
};

export default PengawasanObatSection;
