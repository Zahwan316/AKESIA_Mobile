import { JSX } from 'react';
import FormScreenLayout from '../../screen_layout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputComponent from '../../../../component/input/text';
import InputDatePickerComponent from '../../../../component/input/datepicker';

const PelayananIbuNifasSection = (): JSX.Element => {
  return(
    <FormScreenLayout title={'Pelayanan Ibu Nifas'}>
      <ScrollView>
        {/*  */}
        <View>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 1 (KF1)(6-48 Jam)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              message="Harap diisi"
              name="klasifikasi1"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              message="Harap diisi"
              name="tindakan1"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
            />
          </View>
        </View>
        {/*  */}
        <View>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 2 (KF2)(3-7 Hari)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              message="Harap diisi"
              name="klasifikasi2"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              message="Harap diisi"
              name="tindakan2"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
            />
          </View>
        </View>
        {/*  */}
        <View >
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 3 (KF3)(8-28 jam)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              message="Harap diisi"
              name="klasifikasi3"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              message="Harap diisi"
              name="tindakan3"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
            />
          </View>
        </View>
        {/*  */}
        <View >
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 4 (KF4)(29-42 jam)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              message="Harap diisi"
              name="klasifikasi4"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              message="Harap diisi"
              name="tindakan4"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              labelColor={'#fff'}
              textColor={''}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </FormScreenLayout>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 'auto',
    borderWidth: 0,
    marginBottom: 12,
  },
  textHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default PelayananIbuNifasSection;
