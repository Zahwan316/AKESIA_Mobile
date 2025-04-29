import { JSX } from "react/jsx-runtime";
import FormScreenLayout from "../../screen_layout";
import { View } from "react-native";
import InputComponent from "../../../../component/input/text";
import DropdownInputComponent from "../../../../component/input/dropdown";

const BayiSaatLahirSection = (): JSX.Element => {
  return(
    <FormScreenLayout >
      <View>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Anak ke berapa?"
          message="Harap diisi"
          name="anak_ke"
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
          label="Berat Lahir(gr)"
          message="Harap diisi"
          name="berat_lahir"
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
          label="Panjang Kepala (cm)"
          message="Harap diisi"
          name="panjang_kepala"
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
          label="Lingkar Kepala (cm)"
          message="Harap diisi"
          name="lingkar_kepala"
          onChange={() => {}}
          placeholder=""
          type="number"
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
          label={'Jenis Kelamin'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Kondisi Bayi Saat Lahir'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Asuhan Bayi Baru Lahir'}
        />
      </View>
    </FormScreenLayout>
  );
};

export default BayiSaatLahirSection;