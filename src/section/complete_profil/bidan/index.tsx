import {JSX, useEffect, useState} from 'react';
import {
  Button,
  DimensionValue,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  BUTTON_COLOR,
  BUTTON_COLOR_2,
  MAIN_COLOR,
} from '../../../constants/color';
import InputComponent from '../../../component/input/text';
import ButtonComponent from '../../../component/button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import textInputProps from '../../../type/input/text';
import {useForm} from 'react-hook-form';
import DropdownInputComponent from '../../../component/input/dropdown';
import {useQuery} from '@tanstack/react-query';
import {getProvinsi} from '../../../api/data/ref/provinsi';
import {getKota} from '../../../api/data/ref/kota';
import {getJenisPraktik} from '../../../api/data/ref/jenis_praktik';
import ModalComponent from '../../../component/modal';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import UploadSelfie from '../../../component/input/upload/InputUpload';
import axios from '../../../api/axios';
import handleContentModal from '../../../component/modal/function';

interface formBidanAdittion extends textInputProps {
  //typeForm: 'select' | 'text' | 'upload'
  getValue?: string;
}

const formBidan: Omit<formBidanAdittion, 'control'>[] = [
  {
    width: '100%',
    height: 'auto',
    label: 'Nama Lengkap',
    message: 'Wajib Diisi',
    name: 'nama_lengkap',
    onChange: () => {},
    placeholder: '',
    type: 'text',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Provinsi Domisili',
    message: 'Wajib Diisi',
    name: 'provinsi_id',
    onChange: () => {},
    placeholder: 'Jawa Barat...',
    type: 'dropdown',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Kota Domisili',
    message: 'Wajib Diisi',
    name: 'kota_id',
    onChange: () => {},
    placeholder: 'Bandung...',
    type: 'dropdown',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Jenis Praktik',
    message: 'Wajib Diisi',
    name: 'jenis_praktik_id',
    onChange: () => {},
    placeholder: 'Jawa Barat...',
    type: 'dropdown',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Tempat Bekerja',
    message: 'Wajib Diisi',
    name: 'tempat_bekerja',
    onChange: () => {},
    placeholder: '...',
    type: 'text',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Nama Tempat Praktik',
    message: 'Wajib Diisi',
    name: 'nama_tempat_praktik',
    onChange: () => {},
    placeholder: '...',
    type: 'text',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'Status Keanggotaan IBI',
    message: 'Wajib Diisi',
    name: 'status_keanggotaan_ibi',
    onChange: () => {},
    placeholder: '...',
    type: 'dropdown',
    backgroundColor: '',
    border: 1,
    getValue: 'name',
  },
  {
    width: '100%',
    height: 'auto',
    label: 'No STR',
    message: 'Wajib Diisi',
    name: 'no_STR',
    onChange: () => {},
    placeholder: '...',
    type: 'text',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    label: 'No SIP',
    message: 'Wajib Diisi',
    name: 'no_SIP',
    onChange: () => {},
    placeholder: '...',
    type: 'text',
    backgroundColor: '',
    border: 1,
  },
  {
    width: '100%',
    height: 'auto',
    message: 'Wajib mengungah selfie',
    label: 'Unggah Selfie',
    name: 'img',
    onChange: () => {},
    placeholder: '',
    type: 'upload',
    backgroundColor: '',
    border: 1,
  },
];

type modalInfo = {
  message: string;
  text: string;
};

const CompleteProfileBidanSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const [selectedProvinsiId, setSelectedProvinsiId] = useState<
    number | null | string
  >(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const {data: provinsiData} = useQuery({
    queryKey: ['provinsi'],
    queryFn: () => getProvinsi(),
  });
  const {data: kotaData} = useQuery({
    queryKey: ['kota'],
    queryFn: () => getKota(),
  });
  const {data: jenisPraktikData} = useQuery({
    queryKey: ['jenis_praktik'],
    queryFn: () => getJenisPraktik(),
  });

  const filteredKotaOptions = kotaData?.data?.filter((item: any) => item.provinsi_id === selectedProvinsiId).map((item: any) => ({
        name: item.name,
        id: item.id,
  })) || [];

  const mergedBidanForm = formBidan.map(item => {
    let options = [];
    if (item.name === 'provinsi_id') {
      options =
        provinsiData?.data?.map((items: any) => ({
          name: items.name,
          id: items.id,
        })) || [];
    } else if (item.name === 'kota_id') {
      options = filteredKotaOptions;
    } else if (item.name === 'jenis_praktik_id') {
      options =
        jenisPraktikData?.data?.map((items: any) => ({
          name: items.nama,
          id: items.id,
        })) || [];
    } else if (item.name === 'status_keanggotaan_ibi') {
      options = [
        {
          name: 'Aktif',
        },
        {
          name: 'Tidak Aktif',
        },
      ];
    }

    let disabled =
      item.name === 'kota_id' && selectedProvinsiId != null ? false : true;

    return {
      ...item,
      control,
      errors,
      options,
      disabled,
      onChange:
        item.name === 'provinsi_id'
          ? (id: number | string) => setSelectedProvinsiId(id.toString())
          : item.onChange,
    };
  });

  const onSubmit = async(data: any) => {
    console.table(data);
    const formData = new FormData();

    for (const key in data) {
      if (key === 'img') {
        const img = data[key];
        if (img?.uri) {
          formData.append('img', {
            uri: img.uri,
            name: img.fileName || 'photo.jpg',
            type: img.type || 'image/jpeg',
          });
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try{
      const response = await axios.post('bidan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Tutup',
      });
    }
    catch(e){
      console.log(e.response);
      setSuccess(false);
      handleContentModal({
        setModal,
        setModalInfo,
        message: 'Terjadi kesalahan saat menyimpan data. Coba lagi nanti.',
        text: 'Tutup',
      });
    }
  };

  useEffect(() => {}, []);

  const handleModal = () => {
    if(isSuccess){
      navigation.navigate('BottomTabs');
    }

    setModal(!modal);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <ModalComponent
            isSuccess={isSuccess}
            message={modalInfo.message}
            text={modalInfo.text}
            modalVisible={modal}
            handleModal={handleModal}
          />
          <View style={style.headerContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: BUTTON_COLOR_2,
                textAlign: 'center',
              }}>
              Lengkapi data bidan
            </Text>
          </View>
          <View style={style.formContainer}>
            {mergedBidanForm.map((item, index) => {
              if (item.type === 'text') {
                return (
                  <InputComponent
                    width={item.width}
                    height={item.height}
                    label={item.label}
                    message={item.message}
                    name={item.name}
                    onSelect={item.onChange}
                    placeholder={item.placeholder}
                    type={item.type}
                    backgroundColor={item.backgroundColor}
                    key={index}
                    border={item.border}
                    errors={item.errors}
                    control={item.control}
                    data={item.options}
                    initialValue={item.name === 'tempat_bekerja' ? 'Praktek Bidan Mandiri' : null}
                  />
                );
              } else if (item.type === 'dropdown') {
                return (
                  <DropdownInputComponent
                    width={item.width}
                    height={item.height}
                    label={item.label}
                    message={item.message}
                    name={item.name}
                    onSelect={item.onChange}
                    disabled={item.name === 'kota_id' && item.disabled}
                    placeholder={item.placeholder}
                    type={item.type}
                    key={index}
                    errors={item.errors}
                    control={item.control}
                    data={item.options}
                    getValue={item.getValue}
                  />
                );
              } else if (item.type === 'upload'){
                return(
                  <UploadSelfie
                    key={index}
                    control={item.control}
                    name='img'
                    label={item.label}
                    errors={item.errors}
                    message={item.message}
                  />
                );
              }
            })}
            <View style={style.checkboxContainer}>
              <BouncyCheckbox fillColor="#000" onPress={() => setIsAccept(!isAccept)} />
              <Text>Saya setuju data yang saya isikan benar</Text>
            </View>
          </View>
          <ButtonComponent
            color={MAIN_COLOR}
            onPress={handleSubmit(onSubmit)}
            title="Daftar"
            disabled={!isAccept}
            customstyle={{opacity: isAccept ? 1 : 0.5}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(170),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '5%',
    borderWidth: 0,
  },
  formContainer: {
    width: '100%',
    height: '90%',
    borderWidth: 0,
    marginBottom: 8,
  },
  checkboxContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default CompleteProfileBidanSection;
