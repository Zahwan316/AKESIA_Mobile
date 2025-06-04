import { Alert, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { JSX } from 'react/jsx-runtime';
import JanjiScreenLayout from '../layout';
import ChildDropdownComponent from '../buat_janji/detail/component/childDropdown';
import { formattedDate } from '../../../../utils/date';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import ButtonComponent from '../../../../component/button';
import { BORDER_COLOR, MAIN_COLOR } from '../../../../constants/color';
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
import DropdownInputComponent from '../../../../component/input/dropdown';
import { getAllAnak } from '../../../../api/data/allAnak';
import useComponentStore from '../../../../state/component';
import { ChangePrice } from '../../../../utils/changePrice';
import InputTimePickerComponent from '../../../../component/input/timepicker';
import JamPicker from '../../../../component/input/jadwalPicker';
import { useWatch } from 'react-hook-form';
import LoadingIndicator from '../../../../component/loading';

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

//define ico
const imgMap: {[key: string]: ImageSourcePropType} = {
  'Baby Spa dan Massage': require('../../../../assets/icon/babyspa.png'),
  'Persalinan': require('../../../../assets/icon/persalinan.png'),
  'Bidan Bunda': require('../../../../assets/icon/bunda.png'),
  'Periksa Hamil Nyaman': require('../../../../assets/icon/bunda.png'),
};

//regex
const searchPijatRegex = /^Pijat/i;
const BabySpaRegex = /Baby Spa dan Massage/i;
const jenisLayananBidanBundaRegex = /Bidan Bunda/i;
const PersalinanRegex = /Persalinan/i;
const BidanBundaRegex = /Bidan Bunda/i;
const PeriksaHamilNyamanRegex = /Periksa Hamil Nyaman/i;
const ImunisasiRegex = /^Imunisasi/i;
const BayiRegex = /Bayi/i;

const PemesananJanjiSection = (): JSX.Element => {
  const {control, handleSubmit, reset, formState: {errors}} = useForm();
  const route = useRoute();
  const { pelayananId, pendaftaranId = null, jenisPelayananId = null } = route.params as { pelayanId: number } || {};
  const { data: pelayananData} = useQuery({
    queryKey: ['getPelayanan', pelayananId],
    queryFn: () => getPelayanan(`layanan/pelayanan/${pelayananId}`),
    //enabled: !!pelayananId,
  });
  const { data: pendaftaranUserData, isLoading} = useQuery({
      queryKey: ['getCurrUserPendaftaran', pendaftaranId],
      queryFn: () => getPendaftaranUser(`pendaftaran/${pendaftaranId}`),
      enabled: !!pendaftaranId,
    });
  const { data: currUserAnakData } = useQuery({
    queryKey: ['currUserAnak'],
    queryFn: getAllAnak,
  });
  const pendaftaranItem: apiResponse = pendaftaranUserData?.data;
  const [ successLogin, setSuccessLogin ] = useState<boolean>(false);
  const [ modal, setModal ] = useState<boolean>(false);
  const [ modalInfo, setModalInfo ] = useState<modalInfo>({message:'', text: ''});
  const navigate = useNavigation<any>();
  const [ ageChildren, setChildrenAge ] = useState<number>(0);
  const setLoading = useComponentStore((state) => state.setLoading);
  const tanggalPertemuan = useWatch({ control, name: 'tanggal_pendaftaran' });
  const parsedTanggal = tanggalPertemuan ? new Date(tanggalPertemuan) : undefined;
  const dayFromDate = parsedTanggal?.getDay();

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

  //fungsi tampilkan alert saat submit
  const handleAlert = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin dengan pesanan anda? lihat kembali tanggal dan pesanan anda',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => handleSubmit(onSubmit)(),
        },
      ]
    );
  };

  const handleModal = () => {
    if(successLogin){
      //navigate.navigate('JanjiKita');
      navigate.pop(3);
    }
    setModal(!modal);
  };

  //fungsi memilih anak
  const handleChangeAnak = (id: number) => {
    setLoading(true);
    const findChildren = currUserAnakData?.data.find((item) => item.id === id);
    const age = calculateAge(findChildren?.tanggal_lahir);
    setChildrenAge(age);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  //fungsi filter select anak berdasarkan pelayanan
  const handleShowInputAnak = () => {
    const nama = pelayananData?.data?.nama || '';
    const jenisLayanan = pelayananData?.data?.jenis_layanan?.nama || '';

    const isNotPijat = !searchPijatRegex.test(nama);
    const isBabySpa = BabySpaRegex.test(jenisLayanan);
    const isJenisLayananBidanBunda = jenisLayananBidanBundaRegex.test(jenisLayanan);
    const isImunisasi = ImunisasiRegex.test(nama);
    const isBayi = BayiRegex.test(nama);
    const hasPendaftaran = pendaftaranId != null;

    const isBabySpaValid = isNotPijat && isBabySpa;

    const isBidanBundaValid = isJenisLayananBidanBunda && (isImunisasi || isBayi);
    console.log('pendaftaran',hasPendaftaran);
    // Final filter:
    const isValid = (hasPendaftaran && (isBabySpa || isJenisLayananBidanBunda)) || (isBabySpaValid || isBidanBundaValid);
    return isValid;
  };

  useEffect(() => {
    if(pendaftaranUserData && pendaftaranUserData?.data){
      reset({
        keluhan: pendaftaranUserData?.data?.keluhan,
        nama_ibu: pendaftaranUserData?.data?.ibu?.user?.nama_lengkap,
        jam_ditentukan: pendaftaranUserData?.data?.jam_ditentukan ,
        tanggal_pendaftaran: pendaftaranUserData?.data?.tanggal_pendaftaran,
      });
    }
    const age = calculateAge(pendaftaranUserData?.data?.bayi?.tanggal_lahir);
    setChildrenAge(age);
  }, [pendaftaranUserData]);

  useEffect(() => {
    console.log('Pendaftaran user data', pendaftaranUserData)
  },[pendaftaranUserData]);

  useEffect(() => {
    if(dayFromDate === 0 && (BidanBundaRegex.test(pelayananData?.data?.jenis_layanan?.nama) || PeriksaHamilNyamanRegex.test(pelayananData?.data?.jenis_layanan?.nama ) || PersalinanRegex.test(pelayananData?.data?.jenis_layanan?.nama )) && pendaftaranId === null){
      Alert.alert('Info', 'Layanan ini ditutup pada hari minggu, mohon untuk mengganti dengan hari yang lain');
    }
  }, [dayFromDate, pelayananData, pendaftaranId]);

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
      {
        isLoading &&
        <LoadingIndicator />
      }
      <ScrollView>
        <View style={style.dateContainer}>
          <InputDatePickerComponent
            label="Tanggal Pertemuan"
            onChange={() => {}}
            labelColor="#000"
            control={control}
            name="tanggal_pendaftaran"
            message="Tanggal harus diisi"
            disabled={pendaftaranId != null || tanggalPertemuan === null}
            initialValue={pendaftaranId != null ? pendaftaranItem?.tanggal_pendaftaran : null}
            errors={errors}
          />
          {
            pendaftaranId === null &&
            <JamPicker
              control={control}
              jenisLayanan={pelayananData?.data != null ? pelayananData?.data?.jenis_layanan?.nama : pendaftaranUserData?.data?.pelayanan?.jenis_layanan?.nama }
              label="Jam Pertemuan"
              name="jam_ditentukan"
              errors={errors}
              message="Wajib Diisi"
              initialValue={'14:30:00'}
              disabled={pendaftaranId != null}
              tanggal_pertemuan={parsedTanggal}
            />
          }

          {
            pendaftaranId != null &&
            <InputTimePickerComponent
            control={control}
            name="jam_ditentukan"
            label="Jam Pertemuan"
            onChange={() => {}}
            labelColor="#000"
            message="Jam harus diisi"
            disabled={pendaftaranId != null}
            initialValue={pendaftaranId != null ? pendaftaranItem?.jam_ditentukan : null}
            errors={errors}
          />
          }

        </View>
        <View style={style.formContainer}>
          <View style={style.headerFormContainer}>
            {
              handleShowInputAnak() ?
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Detail Pasien</Text>
              :
              null
            }
          </View>
          <ScrollView style={{height: '100%', marginBottom: 0}}>
            <View style={style.itemFormContainer}>
              {
                  handleShowInputAnak() ?
                  <DropdownInputComponent
                    height={'auto'}
                    width={'100%'}
                    label="Anak"
                    name="bayi_id"
                    control={control}
                    errors={errors}
                    message="Wajib Diisi"
                    data={currUserAnakData?.data?.map((anak: any) => ({
                      name: anak.nama_lengkap,
                      id: anak.id,
                    }))}
                    onSelect={handleChangeAnak}
                    backgroundColor={'#6B779A20'}
                    disabled={pendaftaranId != null}
                    initialValue={pendaftaranId != null ? pendaftaranItem?.bayi_id : null}
                  />
                : null
              }
              {
                !BabySpaRegex.test(pelayananData?.data?.jenis_layanan?.nama) && pendaftaranId != null ?
                <InputComponent
                  height={'auto'}
                  width={'100%'}
                  label="Nama Ibu"
                  name="bayi_id"
                  control={control}
                  errors={errors}
                  onChange={() => {}}
                  backgroundColor={'#6B779A20'}
                  disabled={pendaftaranId != null}
                  initialValue={pendaftaranId != null ? pendaftaranUserData?.data?.ibu?.user?.nama_lengkap : ''}
                />
                : null
              }
            </View>
            <InputComponent
                height={'auto'}
                width={'100%'}
                label="Tulis Keluhan anda"
                name="keluhan"
                message="Wajib Diisi"
                onChange={() => {}}
                placeholder="Contoh: Tidak ada keluhan"
                type="textarea"
                backgroundColor={'#fff'}
                control={control}
                errors={errors}
                disabled={pendaftaranId != null}
                border={1}
                borderColor={BORDER_COLOR}
                initialValue={pendaftaranId != null ? pendaftaranItem?.keluhan : null}
              />
          </ScrollView>
        </View>
        <View style={style.pesananContainer}>
          <View style={{marginBottom: 12}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Pesanan: </Text>
          </View>
          <ChildDropdownComponent
            title={pelayananId ? pelayananData?.data?.nama : pendaftaranUserData?.data?.pelayanan?.nama}
            harga={pelayananId ? ChangePrice(pelayananData?.data?.harga, pelayananData?.data?.nama, ageChildren) : ChangePrice(pendaftaranUserData?.data?.pelayanan?.harga, pendaftaranUserData?.data?.pelayanan?.nama, ageChildren)}
            code={pelayananId ? pelayananData?.data?.keterangan : pendaftaranUserData?.data?.pelayanan?.keterangan}
            img={imgMap[pelayananId ? pelayananData?.data?.jenis_layanan?.nama : pendaftaranUserData?.data?.pelayanan?.jenis_layanan?.nama]}
          />
        </View>
      </ScrollView>
      <View style={style.buttonContainer}>
        {
          dayFromDate === 0 && (BidanBundaRegex.test(pelayananData?.data?.jenis_layanan?.nama) || PeriksaHamilNyamanRegex.test(pelayananData?.data?.jenis_layanan?.nama)) ?
          null
          :
          <ButtonComponent
            color={MAIN_COLOR}
            onPress={handleAlert}
            title="Tentukan Janji Temu"
            customstyle={{width: '100%', display: pendaftaranId != null ? 'none' : 'flex'}}
          />

        }
      </View>
    </JanjiScreenLayout>
  );
};

const style = StyleSheet.create({
  pesananContainer: {
    width: '100%',
    height: '25%',
    marginBottom: 12,
  },
  dateContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 12,
  },
  formContainer: {
    width: '100%',
    height: '40%',
    marginBottom: 12,
    borderWidth: 0,
    position: 'relative',
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
    height: '17%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PemesananJanjiSection;
