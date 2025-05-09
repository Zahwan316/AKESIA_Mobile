import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { JSX } from 'react/jsx-runtime';
import JanjiScreenLayout from '../layout';
import ChildDropdownComponent from '../buat_janji/detail/component/childDropdown';
import { formattedDate } from '../../../../utils/date';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import ButtonComponent from '../../../../component/button';
import { MAIN_COLOR } from '../../../../constants/color';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getPelayanan } from '../../../../api/data/pelayanan';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalComponent from '../../../../component/modal';
import { useEffect, useState } from 'react';
import handleContentModal from '../../../../component/modal/function';
import axios from '../../../../api/axios';
import { getPendaftaranUser } from '../../../../api/data/pendaftaran';
import calculateAge from '../../../../utils/calculateAge';

type modalInfo = {
  message: string;
  text: string;
}

type IbuType = {
  id: number;
  user_id: number;
  nik: string;
  golongan_darah: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  pendidikan: number;
  pekerjaan: number;
  alamat_domisili: string;
  telepon: string;
  no_registrasi_kohort_ibu: null;
  Nama_Keluarga: null;
  berat_badan: null;
  tinggi_badan: null;
  usia_kehamilan: null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
    nama_lengkap: string;
    email: string;
    email_verified_at: null;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

type apiResponse = {
  'id': number,
  'ibu_id': number,
  'bidan_id': number | null,
  'pelayanan_id': number,
  'tanggal_pendaftaran': string,
  'jam_pendaftaran': null | string,
  'status': 'Menunggu Konfirmasi' | 'Disetujui' | 'Dibatalkan' | 'Selesai' | string,
  'keluhan': string,
  'nama_anak': string,
  'umur_anak': number,
  'created_at': string,
  'updated_at': string,
  'pelayanan': {
      'id': number,
      'jenis_layanan_id': number,
      'nama': string,
      'harga': number,
      'kuantitas': number,
      'keterangan': string,
      'created_at': number,
      'updated_at': number,
      'deleted_at': null
  },
  'ibu': IbuType
}
const PemesananJanjiSection = (): JSX.Element => {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const route = useRoute();
  const { pelayananId, pendaftaranId = null } = route.params as { pelayanId: number } || {};
  const { data: pelayananData} = useQuery({
    queryKey: ['getPelayanan', pelayananId],
    queryFn: () => getPelayanan(`layanan/pelayanan/${pelayananId}`),
    //enabled: !!pelayananId,
  });
  const { data: pendaftaranUserData} = useQuery({
      queryKey: ['getCurrUserPendaftaran', pendaftaranId],
      queryFn: () => getPendaftaranUser(`pendaftaran/${pendaftaranId}`),
      enabled: !!pendaftaranId,
    });
  const pesananItem = pelayananData?.data;
  const pendaftaranItem: apiResponse = pendaftaranUserData?.data;
  const [successLogin, setSuccessLogin] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({message:'', text: ''});
  const navigate = useNavigation<any>();
  const age = pendaftaranId != null ? calculateAge(pendaftaranItem?.ibu?.tanggal_lahir || '') : '';

  const onSubmit = async(data: any) => {
    const dataForm = {...data, pelayanan_id: pelayananId};
    try{
      const response = await axios.post('pendaftaran', dataForm);
      console.table(response);
      setSuccessLogin(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Lanjutkan',
      });
    }
    catch(e){
      console.table(e.response);
      setSuccessLogin(false);
      handleContentModal({
        setModal,
        setModalInfo,
        message: e.response.data.message,
        text: 'Lanjutkan',
      });
    }
  };

  const handleModal = () => {
    if(successLogin){
      navigate.navigate('JanjiKita');
    }
    setModal(!modal);
  };

  useEffect(() => {
    console.table(pendaftaranItem);
  },[pendaftaranItem]);

  return (
    <JanjiScreenLayout
      title="Janji Temu"
    >
      <ModalComponent
        isSuccess={successLogin}
        message={modalInfo.message}
        text="Tutup"
        modalVisible={modal}
        handleModal={handleModal}
      />
      <View style={style.pesananContainer}>
        <View style={{marginBottom: 12}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Pesanan: </Text>
        </View>
        <ChildDropdownComponent
          title={pesananItem?.nama}
          harga={pesananItem?.harga}
          code={pesananItem?.keterangan}
        />
      </View>
      <View style={style.dateContainer}>
        <InputDatePickerComponent
          label="Tanggal"
          onChange={() => {}}
          labelColor="#000"
          control={control}
          name="tanggal_pendaftaran"
          message="Tanggal harus diisi"
          disabled={pendaftaranId != null}
          initialValue={pendaftaranId != null && pendaftaranItem?.tanggal_pendaftaran}
        />
      </View>
      <View style={style.formContainer}>
        <View style={style.headerFormContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Detail Pasien</Text>
        </View>
        <ScrollView style={{height: '100%', marginBottom: 8}}>
          <View style={style.itemFormContainer}>
            <InputComponent
              height={'auto'}
              width={'75%'}
              label="Nama Lengkap Ibu"
              name="nama_ibu"
              message="Wajib Diisi"
              onChange={() => {}}
              placeholder=""
              type="text"
              control={control}
              errors={errors}
              backgroundColor={'#6B779A20'}
              disabled={pendaftaranId != null}
              initialValue={pendaftaranId != null && pendaftaranItem?.ibu?.user?.nama_lengkap}
            />
            <InputComponent
              height={'auto'}
              width={'20%'}
              label="Umur"
              name="umur_ibu"
              message="Wajib Diisi"
              onChange={() => {}}
              placeholder=""
              type="number"
              control={control}
              errors={errors}
              backgroundColor={'#6B779A20'}
              disabled={pendaftaranId != null}
              initialValue={pendaftaranId != null && age.toString()}
            />
          </View>
          <View style={style.itemFormContainer}>
            <InputComponent
              height={'auto'}
              width={'75%'}
              label="Nama Lengkap Anak"
              name="nama_anak"
              message="Wajib Diisi"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#6B779A20'}
              control={control}
              errors={errors}
              disabled={pendaftaranId != null}
              initialValue={pendaftaranId != null && pendaftaranItem?.nama_anak}
            />
            <InputComponent
              height={'auto'}
              width={'20%'}
              label="Umur"
              name="umur_anak"
              message="Wajib Diisi"
              onChange={() => {}}
              placeholder=""
              type="number"
              backgroundColor={'#6B779A20'}
              control={control}
              errors={errors}
              disabled={pendaftaranId != null}
              initialValue={pendaftaranId != null && pendaftaranItem?.umur_anak.toString()}
            />
          </View>
          <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tulis Keluhan anda"
              name="keluhan"
              message="Wajib Diisi"
              onChange={() => {}}
              placeholder=""
              type="textarea"
              backgroundColor={'#6B779A20'}
              control={control}
              errors={errors}
              disabled={pendaftaranId != null}
              initialValue={pendaftaranId != null && pendaftaranItem?.keluhan}
            />
        </ScrollView>
      </View>
      <View style={style.buttonContainer}>
        <ButtonComponent
          color={MAIN_COLOR}
          onPress={handleSubmit(onSubmit)}
          title="Tentukan Janji Temu"
          customstyle={{width: '100%', display: pendaftaranId != null ? 'none' : 'flex'}}
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
    height: '55%',
    marginBottom: 12,
    borderWidth: 0,
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
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '100%',
    height: '8%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PemesananJanjiSection;
