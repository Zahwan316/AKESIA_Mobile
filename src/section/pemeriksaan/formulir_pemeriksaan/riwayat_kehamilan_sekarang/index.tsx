import { JSX, useEffect, useState } from "react";
import FormScreenLayout from "../../screen_layout";
import { ScrollView, View } from "react-native";
import InputComponent from "../../../../component/input/text";
import DropdownInputComponent from "../../../../component/input/dropdown";

const Page1 = (OnChange: () => void, data: Array<Object>): JSX.Element => {
  return (
    <>
      <InputComponent
          height={'auto'}
          width={'100%'}
          label="Gravida"
          message="Harap diisi"
          name="gravida"
          onChange={OnChange}
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
          label="Pardus"
          message="Harap diisi"
          name="pardus"
          onChange={OnChange}
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
          label="RR/RT/RST"
          message="Harap diisi"
          name="rr"
          onChange={OnChange}
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
          label="HPHT"
          message="Harap diisi"
          name="hpht"
          onChange={OnChange}
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
          label="HPL"
          message="Harap diisi"
          name="hpl"
          onChange={OnChange}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={'#fff'}
          textColor={''}
        />
    </>
  );
};

const Page2 = (onChange: () => void, data: Array<Object>): JSX.Element => {
  return (
    <>
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Muntah Muntah'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Pusing'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Nyeri Perut'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Nafsu Makan'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Pendarahan'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Riwayat Penyakit'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Riwayat Penyakit Keluarga'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Kebiasaan'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Keluhan'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Pasangan Sexual Istri'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Pasangan Sexual Suami'}
        />
      <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={data}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Mendiskusikan HIV / AIDS / PMS'}
        />
    </>
  );
};

const RiwayatKehamilanSekarangSection = (): JSX.Element => {
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
        setpage((prev) => prev + 1);
      } else {
        setpage((prev) => prev - 1);
      }
    };
  return (
    <FormScreenLayout
      page={page}
      handlePage={handlePage}
      title={page === 2 ? 'Keluhan Utama' : 'Mohon isi formulir ini dengan lengkap dan akurat!  '}
    >
      <ScrollView>
        {
          page === 1 ? Page1(() => {}, []) : Page2(() => {}, [])
        }
      </ScrollView>
    </FormScreenLayout>
  );
};

export default RiwayatKehamilanSekarangSection;
