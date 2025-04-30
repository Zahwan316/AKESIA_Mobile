import { ScrollView, View } from "react-native";
import FormScreenLayout from "../../screen_layout";
import { JSX } from "react";
import InputComponent from "../../../../component/input/text";

const RiwayatKehamilanSebelumnyaSection = (): JSX.Element => {
  return(
    <FormScreenLayout>
      <ScrollView style={{marginBottom: 64}}>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Anak ke"
          message="Harap diisi"
          name="anak_ke"
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
          label="APIAH"
          message="Harap diisi"
          name="apiah"
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
          label="Umur Anak"
          message="Harap diisi"
          name="umur_anak"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="P/L"
          message="Harap diisi"
          name="jenis_kelamin"
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
          label="BBL (Gram)"
          message="Harap diisi"
          name="bbl"
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
          label="Cara Persalinan"
          message="Harap diisi"
          name="cara_persalinan"
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
          label="Penolong"
          message="Harap diisi"
          name="penolong"
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
          label="Tempat Persalinan"
          message="Harap diisi"
          name="tempat_persalinan"
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
          label="Keterangan"
          message="Harap diisi"
          name="keterangan"
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

export default RiwayatKehamilanSebelumnyaSection;
