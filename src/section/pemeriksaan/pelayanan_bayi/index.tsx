import { JSX } from "react";
import FormScreenLayout from "../screen_layout";
import { ScrollView } from "react-native";
import InputComponent from "../../../component/input/text";
import DropdownInputComponent from "../../../component/input/dropdown";

const PelayananBayiSection = (): JSX.Element => {
  return(
    <FormScreenLayout>
      <ScrollView>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nama Bayi"
          message="Harap diisi"
          name="nama_bayi"
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
          label="Umur Bayi"
          message="Harap diisi"
          name="umur/_bayi"
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
          label="Booking Layanan"
          message="Harap diisi"
          name="booking_layanan"
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
          label="Keterangan Kondisi Bayi"
          message="Harap diisi"
          name="keterangan_kondisi_bayi"
          onChange={() => {}}
          placeholder=""
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
          label={'Tambahan Layanan'}
        />
      </ScrollView>
    </FormScreenLayout>
  )
};

export default PelayananBayiSection;
