import { useNavigation } from '@react-navigation/native';
import HomeFeatureLayoutSection from '../home_feature_layout';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { modalInfo } from '../tambah_anak';
import { getCurrentIbu } from '../../../api/data/currLoggedIbu';
import { ScrollView } from 'react-native';
import InputComponent from '../../../component/input/text';
import { BORDER_COLOR } from '../../../constants/color';
import { checkIsDataNull } from '../../../utils/checkDataIsNull';
import dayjs from 'dayjs';
import InputDatePickerComponent from '../../../component/input/datepicker';
import DropdownInputComponent from '../../../component/input/dropdown';
import Jenis_Kelamin from '../../../data/jenis_kelamin';
import golongan_darah_data from '../../../data/golongan_darah';
import { getPendidikan } from '../../../api/data/ref/pendidikan';
import { getPekerjaan } from '../../../api/data/ref/pekerjaan';
import { handleEditApi } from '../../../api/handleEditApi';

const DataIbuSection = () => {
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
  const {data: pendidikanData} = useQuery({
    queryKey: ['pendidikanData'],
    queryFn: () => getPendidikan(),
  });
  const {data: pekerjaanData} = useQuery({
    queryKey: ['pekerjaanData'],
    queryFn: () => getPekerjaan(),
  });
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });

  const handleModal = () => {
    if(isSuccess){
      navigation.navigate('BottomTabs');
    }
    setModal(!modal);
  };

  const handleSendData = async() => {
    handleSubmit((data) => handleEditApi(data, 'ibu/update', ibuData?.data?.id, setSuccess, setModal, setModalInfo))();
  };

  useEffect(() => {
    console.log(ibuData);
    if(ibuData && ibuData?.data){
      reset({
        nama_lengkap: ibuData?.data?.user?.nama_lengkap,
        tanggal_lahir: ibuData?.data?.tanggal_lahir,
        telepon: ibuData?.data?.telepon,
        golongan_darah: ibuData?.data?.golongan_darah,
        alamat_domisili: ibuData?.data?.alamat_domisili,
        pendidikan: ibuData?.data?.pendidikan,
        pekerjaan: ibuData?.data?.pekerjaan,
      });
    }
  }, [ibuData]);

  return(
    <HomeFeatureLayoutSection
      title="Data Ibu"
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalVisible={modal}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      onPress={handleSendData}
    >
      <ScrollView>
        <InputComponent
          control={control}
          errors={errors}
          width="100%"
          height="auto"
          border={1}
          borderColor={BORDER_COLOR}
          name="nama_lengkap"
          label="Nama Lengkap"
          type="text"
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.user?.nama_lengkap}
          backgroundColor={'#fff'}
          message="Wajib Diisi"
        />
        <InputDatePickerComponent
          control={control}
          errors={errors}
          name="tanggal_lahir"
          label="Tanggal Lahir"
          labelColor=""
          message="Wajib Diisi"
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.tanggal_lahir}
          onChange={() => {}}
        />
        <InputComponent
          control={control}
          errors={errors}
          width="100%"
          height="auto"
          border={1}
          borderColor={BORDER_COLOR}
          name="telepon"
          label="Nomor Telepon"
          type="number"
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.telepon}
          backgroundColor={"#fff"}
          message="Wajib Diisi"
        />
        <DropdownInputComponent
          name="golongan_darah"
          control={control}
          errors={errors}
          label="Golongan Darah"
          message="Wajib diisi"
          data={golongan_darah_data}
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.golongan_darah}
          onSelect={() => {}}
        />
        <InputComponent
          control={control}
          errors={errors}
          width="100%"
          height="auto"
          border={1}
          borderColor={BORDER_COLOR}
          name="alamat_domisili"
          label="Alamat Domisili"
          type="number"
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.alamat_domisili}
          backgroundColor={"#fff"}
          message="Wajib Diisi"
        />
        <DropdownInputComponent
          name="pendidikan"
          control={control}
          errors={errors}
          label="Pendidikan"
          message="Wajib diisi"
          data={pendidikanData?.data}
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.pendidikan}
          onSelect={() => {}}
        />
        <DropdownInputComponent
          name="pekerjaan"
          control={control}
          errors={errors}
          label="Pekerjaan"
          message="Wajib diisi"
          data={pekerjaanData?.data}
          initialValue={checkIsDataNull(ibuData?.data) ? null : ibuData?.data?.pekerjaan}
          onSelect={() => {}}
        />
      </ScrollView>
    </HomeFeatureLayoutSection>
  );
};

export default DataIbuSection;
