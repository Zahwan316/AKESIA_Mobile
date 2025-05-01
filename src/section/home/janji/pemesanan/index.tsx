import { StyleSheet, Text, View } from "react-native";
import { JSX } from "react/jsx-runtime";
import JanjiScreenLayout from "../layout";
import ChildDropdownComponent from "../buat_janji/detail/component/childDropdown";
import { formattedDate } from "../../../../utils/date";
import InputDatePickerComponent from "../../../../component/input/datepicker";
import InputComponent from "../../../../component/input/text";
import ButtonComponent from "../../../../component/button";
import { MAIN_COLOR } from "../../../../constants/color";

const PemesananJanjiSection = (): JSX.Element => {
  return (
    <JanjiScreenLayout
      title="Pemesanan"
    >
      <View style={style.pesananContainer}>
        <View style={{marginBottom: 12}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Pesanan: </Text>
        </View>
        <ChildDropdownComponent
          title=""
        />
      </View>
      <View style={style.dateContainer}>
        <InputDatePickerComponent
          label="Pilih Tanggal"
          onChange={() => {}}
          labelColor="#000"

        />
      </View>
      <View style={style.formContainer}>
        <View style={style.headerFormContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Detail Pasien</Text>
        </View>
        <View>
          <View style={style.itemFormContainer}>
            <InputComponent
              height={'auto'}
              width={'75%'}
              label="Nama Lengkap"
              name="nama_lengkap"
              message=""
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#6B779A20'}
            />
            <InputComponent
              height={'auto'}
              width={'20%'}
              label="Umur"
              name="umur"
              message=""
              onChange={() => {}}
              placeholder=""
              type="number"
              backgroundColor={'#6B779A20'}
            />
          </View>
          <View style={style.itemFormContainer}>
            <InputComponent
              height={'auto'}
              width={'75%'}
              label="Nama Lengkap"
              name="nama_lengkap"
              message=""
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#6B779A20'}
            />
            <InputComponent
              height={'auto'}
              width={'20%'}
              label="Umur"
              name="umur"
              message=""
              onChange={() => {}}
              placeholder=""
              type="number"
              backgroundColor={'#6B779A20'}
            />
          </View>
          <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tulis Keluhan anda"
              name="keluhan"
              message=""
              onChange={() => {}}
              placeholder=""
              type="textarea"
              backgroundColor={'#6B779A20'}
            />
        </View>

      </View>
      <View style={style.buttonContainer}>
        <ButtonComponent
          color={MAIN_COLOR}
          onPress={() => {}}
          title="Simpan"
        />
      </View>
    </JanjiScreenLayout>
  );
};

const style = StyleSheet.create({
  pesananContainer: {
    width: '100%',
    height: '15%',
    marginBottom: 12,
  },
  dateContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 12,
  },
  formContainer: {
    width: '100%',
    height: '60%',
    marginBottom: 12,
  },
  headerFormContainer: {
    width: '100%',
    height: '8%',
    marginBottom: 2,
  },
  itemFormContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: '100%',
    height: '20%',
    marginBottom: 12,
  },
});

export default PemesananJanjiSection;
