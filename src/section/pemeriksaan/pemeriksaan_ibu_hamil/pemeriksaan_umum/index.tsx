import {JSX, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BUTTON_COLOR, MAIN_COLOR} from '../../../../constants/color';
import DropdownInputComponent from '../../../../component/input/dropdown';
import InputComponent from '../../../../component/input/text';
import ButtonComponent from '../../../../component/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormScreenLayout from '../../screen_layout';

const page1 = (formHandle: () => void, data: any[]) => {
  return (
    <>
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data}
        height={'auto'}
        textColor={'#fff'}
        onSelect={formHandle}
        label={'Bentuk tubuh'}
      />
      <DropdownInputComponent
        width={'100%'}
        backgroundColor={''}
        data={data}
        height={'auto'}
        textColor={'#fff'}
        onSelect={formHandle}
        label={'Kesadaran'}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Mata"
        message="Harap diisi"
        name="mata"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Leher"
        message="Harap diisi"
        name="leher"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Payudara"
        message="Harap diisi"
        name="Payudara"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Paru"
        message="Harap diisi"
        name="paru"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
    </>
  );
};

const page2 = (formHandle: () => void, data: any[]) => {
  return (
    <>
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Jantung"
        message="Harap diisi"
        name="jantung"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Hati"
        message="Harap diisi"
        name="hati"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Suhu Badan"
        message="Harap diisi"
        name="suhu_badan"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <InputComponent
        height={'6%'}
        width={'100%'}
        label="Genetalia/Luar/Dalam"
        message="Harap diisi"
        name="genetalia"
        onChange={formHandle}
        placeholder=""
        type="text"
        backgroundColor={'#fff'}
        labelColor={'#fff'}
        border={1}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 12,
          color: '#fff',
        }}>
        LILA
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <InputComponent
          height={'6%'}
          width={'45%'}
          label="Tinggi Badan"
          message="Harap diisi"
          name="tinggi_badan"
          onChange={formHandle}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          labelColor={'#fff'}
          border={1}
        />
        <InputComponent
          height={'6%'}
          width={'45%'}
          label="Berat badan"
          message="Harap diisi"
          name="berat_badan"
          onChange={formHandle}
          placeholder=""
          type="text"
          backgroundColor={'#fff'}
          labelColor={'#fff'}
          border={1}
        />
      </View>
    </>
  );
};

const PemeriksaanUmumSection = (): JSX.Element => {
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
    <FormScreenLayout page={page} handlePage={handlePage}>
      {page === 1 ? page1(() => {}, []) : page2(() => {}, [])}
    </FormScreenLayout>
  );
};


export default PemeriksaanUmumSection;
