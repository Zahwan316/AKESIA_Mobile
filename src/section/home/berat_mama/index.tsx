import { JSX, useEffect, useState } from 'react';
import HomeFeatureLayoutSection from '../home_feature_layout';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { BORDER_COLOR, MAIN_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '../../../constants/color';
import { set, useForm } from 'react-hook-form';
import InputComponent from '../../../component/input/text';
import { useQuery } from '@tanstack/react-query';
import { getCurrentIbu } from '../../../api/data/currLoggedIbu';
import { checkIsDataNull } from '../../../utils/checkDataIsNull';
import { modalInfo } from '../tambah_anak';
import handleContentModal from '../../../component/modal/function';
import axios from '../../../api/axios';
import { useNavigation } from '@react-navigation/native';

type IbuApiResponse = {
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
  no_registrasi_kohort_ibu: number;
  Nama_Keluarga: string;
  berat_badan: number;
  tinggi_badan: number;
  usia_kehamilan: number;
  created_at: string;
  updated_at: string;
}

const BeratMamaSection = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const {data: ibuData} = useQuery({
    queryKey: ['ibuData'],
    queryFn: () => getCurrentIbu(),
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });

  const handleSubmitData = () => {
    handleSubmit(sendDataToApi)();
  };

  const sendDataToApi = async(data: any) => {
    try{
      const response = await axios.put(`ibu/update/${ibuData?.data?.id}`, data);
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

  const handleModal = () => {
    if(isSuccess){
      navigation.pop(1);
    }
    setModal(!modal);
  };

  useEffect(() => {
    if(ibuData && ibuData?.data){
      reset({
        berat_badan: ibuData?.data?.berat_badan?.toString(),
        tinggi_badan: ibuData?.data?.tinggi_badan?.toString(),
      });
    }
  }, [ibuData]);

  return (
    <HomeFeatureLayoutSection
      title="Berat Badan Mama"
      onPress={handleSubmitData}
      modalHandleModal={handleModal}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
    >
      <View style={Style.ctaContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: MAIN_COLOR}}>Bu, yuk isi data ini dengan benar</Text>
        <Text style={{fontSize: 16, textAlign: 'center'}}>Data ini akan digunakan buat menentukan rentang untuk memantau kenaikan berat badan ideal Mama setiap minggu selama kehamilan</Text>
      </View>
      <View>
        <InputComponent
          control={control}
          errors={errors}
          name="berat_badan"
          border={1}
          borderColor={BORDER_COLOR}
          label="Berat Badan (kg)"
          type="number"
          onChange={() => {}}
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.berat_badan}
          message="*Wajib Diisi"
        />
        <InputComponent
          control={control}
          errors={errors}
          name="tinggi_badan"
          border={1}
          borderColor={BORDER_COLOR}
          label="Tinggi Badan (cm)"
          type="number"
          onChange={() => {}}
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.tinggi_badan}
          message="*Wajib Diisi"
        />
      </View>
    </HomeFeatureLayoutSection>
  );
};

const Style = StyleSheet.create({
  ctaContainer: {
    width: '100%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BeratMamaSection;
