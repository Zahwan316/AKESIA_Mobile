import {View} from 'react-native';
import FormScreenLayout from '../../screen_layout';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import {JSX, useEffect, useState} from 'react';

const page1 = (formHandle: () => void, data: any[]): JSX.Element => {
  return (
    <>
      <InputDatePickerComponent
        label="Tanggal Pemeriksaan"
        onChange={formHandle}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Jam"
        message="Harap diisi"
        name="jam"
        onChange={formHandle}
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
        label="Nama Pemeriksaan"
        message="Harap diisi"
        name="nama_pemeriksaan"
        onChange={formHandle}
        placeholder="0"
        type="text"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#fff'}
        textColor={''}
      />
      <InputComponent
        height={'50%'}
        width={'100%'}
        label="Hasil Pemeriksaan"
        message="Harap diisi"
        name="hasil_pemeriksaan"
        onChange={formHandle}
        placeholder="0"
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#fff'}
        textColor={''}
      />
    </>
  );
};

const page2 = (formHandle: () => void, data: any[]): JSX.Element => {
  return (
    <>
      <InputDatePickerComponent label="Tanggal Pelayanan" onChange={formHandle} />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Jam Pemeriksaan"
        message="Harap diisi"
        name="jam_pemeriksaan"
        onChange={formHandle}
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
        label="SOAP"
        message="Harap diisi"
        name="soap"
        onChange={formHandle}
        placeholder="0"
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#fff'}
        textColor={''}
      />
      <InputComponent
        height={'auto'}
        width={'100%'}
        label="Penatalaksanaan"
        message="Harap diisi"
        name="penatalaksanaan"
        onChange={formHandle}
        placeholder="0"
        type="textarea"
        backgroundColor={'#fff'}
        border={1}
        labelColor={'#fff'}
        textColor={''}
      />
    </>
  );
};

const PemeriksaanLabSection = (): JSX.Element => {
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
    <FormScreenLayout
      handlePage={handlePage}
      page={page}
    >
      {page === 1 ? page1(() => {}, []) : page2(() => {}, [])}
    </FormScreenLayout>
  );
};

export default PemeriksaanLabSection;
