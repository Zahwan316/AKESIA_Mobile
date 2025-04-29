import {JSX} from 'react';
import FormScreenLayout from '../../screen_layout';
import {ScrollView, View} from 'react-native';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import DropdownInputComponent from '../../../../component/input/dropdown';

const PelayananIbuBersalinSection = (): JSX.Element => {
  return (
    <FormScreenLayout>
      <ScrollView>
        <InputDatePickerComponent
          label="Tanggal Persalinan"
          onChange={() => {}}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Jam Lahir"
          message="Harap diisi"
          name="jam_lahir"
          onChange={() => {}}
          placeholder="Contoh: 09:30"
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Umur Kehamilan"
          message="Harap diisi"
          name="umur_kehamilan"
          onChange={() => {}}
          placeholder="Contoh: 3 Minggu"
          type="text"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Penolong Persalinan'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Cara Persalinan'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Keadaan Ibu'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'KB Pasca Persalinan'}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Keterangan Tambahan"
          message="Harap diisi"
          name="keterangan_tambahan"
          onChange={() => {}}
          placeholder=""
          type="textarea"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
      </ScrollView>
    </FormScreenLayout>
  );
};

export default PelayananIbuBersalinSection;
