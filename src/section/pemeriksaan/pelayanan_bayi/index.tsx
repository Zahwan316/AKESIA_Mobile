import { JSX, use, useEffect, useState } from 'react';
import FormScreenLayout from '../screen_layout';
import { ScrollView } from 'react-native';
import InputComponent from '../../../component/input/text';
import DropdownInputComponent from '../../../component/input/dropdown';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../api/data/form';
import Jenis_Kelamin from '../../../data/jenis_kelamin';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiResponse } from '../../../type/pendaftaran/pendaftaran';
import calculateAge from '../../../utils/calculateAge';
import axios from '../../../api/axios';
import handleContentModal from '../../../component/modal/function';
import { formattedDateData } from '../../../utils/date';

type modalInfo = {
  message: string;
  text: string;
};

const BORDER_COLOR = '#00000015';

const PelayananBayiSection = (): JSX.Element => {
  const navigate = useNavigation<any>();
  const router = useRoute();
  const { pendaftaranData, pendaftaranId} = router.params as {pendaftaranData: apiResponse, pendaftaranId: number};
  const { data: tambahanLayananData } = useQuery({
    queryKey: ['tambahanLayanan'],
    queryFn: () => getForm('layanan/tambahan_layanan'),
  });
  const { data: pelayananBayiFormData } = useQuery({
    queryKey: ['PelayananBayiFormData', pendaftaranId],
    queryFn: () => getForm(`form/pelayanan_bayi/show_by_pendaftaran/${pendaftaranId}`),
    enabled: !!pendaftaranId,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });

  const chechkIsDataFormBayiNull = () => {
    if(Array.isArray(pelayananBayiFormData?.data[0]) && pelayananBayiFormData?.data.length === 0){
      return true;
    }
    return false;
  };

  const handleSendData = async(page: any) => {
    handleSubmit(sendToApi)();
  };

  const sendToApi = async(data: any) => {
    const dataForm = {...data, pendaftaran_id: pendaftaranId};
    console.log(data);
    try{
      if(chechkIsDataFormBayiNull()){
        const response = await axios.post('form/pelayanan_bayi', dataForm);
        setSuccess(true);
        handleContentModal({
          setModal,
          setModalInfo,
          message: response.data.message,
          text: 'Tutup',
        });
      }
      else{
        const response = await axios.put(`form/pelayanan_bayi/${pelayananBayiFormData.data.id}`, dataForm);
        setSuccess(true);
        handleContentModal({
          setModal,
          setModalInfo,
          message: response.data.message,
          text: 'Tutup',
        });
      }
    }
    catch(e){
      console.log(e.response)
      setSuccess(false);
      handleContentModal({
        setModal,
        setModalInfo,
        message: e.response.data.message,
        text: 'Tutup',
      });
    }
    
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }
    setModal(!modal);
  };

  useEffect(() => {
    console.table(pelayananBayiFormData);
  }, [pelayananBayiFormData]);

  useEffect(() => {
    if (pelayananBayiFormData && pelayananBayiFormData.data) {
      reset({
        nama_bayi: pelayananBayiFormData.data.nama_bayi,
        umur_bayi: pelayananBayiFormData.data.umur_bayi.toString(),
        jenis_kelamin_bayi: pelayananBayiFormData.data.jenis_kelamin_bayi,
        booking_layanan: pelayananBayiFormData.data.booking_layanan,
        keterangan_kondisi_bayi: pelayananBayiFormData.data.keterangan_kondisi_bayi,
        tambahan_layanan_id: pelayananBayiFormData.data.tambahan_layanan_id,
      });
    }
  }, [pelayananBayiFormData]);

  return(
    <FormScreenLayout
      modalHandleModal={handleModal}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      handlePage={handleSendData}
      header="Pelayanan Bayi"
      created_at={chechkIsDataFormBayiNull() ? 'Belum ada' : formattedDateData(pelayananBayiFormData?.data.created_at)}
      updated_at={chechkIsDataFormBayiNull() ? 'Belum ada' : formattedDateData(pelayananBayiFormData?.data.updated_at)}
    >
      <ScrollView >
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
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={chechkIsDataFormBayiNull() ? pendaftaranData.bayi.nama_lengkap : pelayananBayiFormData?.data.nama_bayi}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Umur Bayi"
          message="Harap diisi"
          name="umur_bayi"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={chechkIsDataFormBayiNull() ? calculateAge(pendaftaranData.bayi.tanggal_lahir).toString() : pelayananBayiFormData?.data.umur_bayi.toString() }
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={Jenis_Kelamin}
          height={'auto'}
          textColor={''}
          onSelect={() => {}}
          label={'Jenis Kelamin'}
          control={control}
          errors={errors}
          name="jenis_kelamin_bayi"
          message="Harap diisi"
          getValue="name"
          initialValue={chechkIsDataFormBayiNull() ? pendaftaranData.bayi.jenis_kelamin : pelayananBayiFormData?.data.jenis_kelamin_bayi }
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
          backgroundColor={''}
          border={1}
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={chechkIsDataFormBayiNull() ? pendaftaranData.pelayanan.nama : pelayananBayiFormData?.data.booking_layanan }
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
          backgroundColor={''}
          border={1}
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={chechkIsDataFormBayiNull() ? null : pelayananBayiFormData?.data.keterangan_kondisi_bayi }
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={tambahanLayananData?.data}
          height={'auto'}
          textColor={''}
          onSelect={() => {}}
          label={'Tambahan Layanan'}
          control={control}
          errors={errors}
          name="tambahan_layanan_id"
          initialValue={chechkIsDataFormBayiNull() ? null : pelayananBayiFormData?.data.tambahan_layanan_id }
        />
      </ScrollView>
    </FormScreenLayout>
  );
};

export default PelayananBayiSection;
