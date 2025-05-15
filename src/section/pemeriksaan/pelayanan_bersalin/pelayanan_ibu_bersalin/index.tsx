import {JSX, useEffect, useState} from 'react';
import FormScreenLayout from '../../screen_layout';
import {ScrollView, View} from 'react-native';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import InputComponent from '../../../../component/input/text';
import DropdownInputComponent from '../../../../component/input/dropdown';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import { BORDER_COLOR } from '../../../../constants/color';
import { CaraPesalinanDropdownData, KBPascaPersalinanDropdownData, KeadaanIbuDropdownData, PenolongPersalinanDropdownData } from '../../../../data/pemeriksaan/pelayanan_bersalin/DropdownOption';
import axios from '../../../../api/axios';
import handleContentModal from '../../../../component/modal/function';
import { formattedDateData } from '../../../../utils/date';
import { modalInfoType } from '../../../../type/modalInfo';

const PelayananIbuBersalinSection = (): JSX.Element => {
  const navigate = useNavigation<any>();
  const router = useRoute();
  const { pendaftaranData, pendaftaranId} = router.params as {pendaftaranData: apiResponse, pendaftaranId: number};
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfoType>({
    message: '',
    text: '',
  });
  const {data: pelayananIbuBersalinData} = useQuery({
    queryKey: ['pelayananIbuBersalinData', pendaftaranId],
    queryFn: () => getForm(`form/pelayanan_ibu_bersalin/show_by_pendaftaran/${pendaftaranId}`),
    enabled: !!pendaftaranId,
  });

  const handlePage = () => {
    handleSubmit(handleSendToApi)();
  };

  const handleSendToApi = async(data: any) => {
    const mergedData = {...data, pendaftaran_id: pendaftaranId};
    try{
      if(checkIsDataNull(pelayananIbuBersalinData?.data)){
        await axios.post('form/pelayanan_ibu_bersalin', mergedData).then(response => {
          setSuccess(true);
          handleContentModal({
            setModal,
            setModalInfo,
            message: response.data.message,
            text: 'Tutup',
          });
        });
      }
      else{
        await axios.put(`form/pelayanan_ibu_bersalin/${pelayananIbuBersalinData?.data.id}`, mergedData).then(response => {
          setSuccess(true);
          handleContentModal({
            setModal,
            setModalInfo,
            message: response.data.message,
            text: 'Tutup',
          });
    });
      }
    }
    catch(e){
      console.log(e.response);
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
    console.log(pendaftaranId);
    console.log(pelayananIbuBersalinData);
    if(pelayananIbuBersalinData && pelayananIbuBersalinData?.data){
      reset({
        tanggal_persalinan: pelayananIbuBersalinData?.data?.tanggal_persalinan,
        jam_lahir: pelayananIbuBersalinData?.data?.jam_lahir,
        umur_kehamilan: pelayananIbuBersalinData?.data?.umur_kehamilan,
        penolong_persalinan: pelayananIbuBersalinData?.data?.penolong_persalinan,
        cara_persalinan: pelayananIbuBersalinData?.data?.cara_persalinan,
        cara_pesalinan: pelayananIbuBersalinData?.data?.cara_pesalinan,
        keadaan_ibu: pelayananIbuBersalinData?.data?.keadaan_ibu,
        kb_pasca_persalinan: pelayananIbuBersalinData?.data?.kb_pasca_persalinan,
        keterangan_tambahan: pelayananIbuBersalinData?.data?.keterangan_tambahan,
      });
    }
  }, [pelayananIbuBersalinData]);

  return (
    <FormScreenLayout
      handlePage={handlePage}
      header="Pelayanan Ibu Bersalin"
      modalHandleModal={handleModal}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      created_at={checkIsDataNull(pelayananIbuBersalinData) ? 'Belum ada' : formattedDateData(pelayananIbuBersalinData?.data?.created_at)}
      updated_at={checkIsDataNull(pelayananIbuBersalinData) ? 'Belum ada' : formattedDateData(pelayananIbuBersalinData?.data?.updated_at)}
    >
      <ScrollView>
        <InputDatePickerComponent
          label="Tanggal Persalinan"
          onChange={() => {}}
          name="tanggal_persalinan"
          labelColor='#000'
          control={control}
          errors={errors}
          message="Wajib diisi"
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.tanggal_persalinan}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Jam Lahir"
          message="Harap diisi"
          name="jam_lahir"
          onChange={() => {}}
          placeholder="Contoh: 09:30"
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.jam_lahir}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Umur Kehamilan"
          message="Harap diisi"
          name="umur_kehamilan"
          onChange={() => {}}
          placeholder="Hanya angka (Dalam minggu)"
          type="text"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.umur_kehamilan}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={PenolongPersalinanDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Penolong Persalinan'}
          control={control}
          errors={errors}
          name="penolong_persalinan"
          message="Wajib diisi"
          getValue="name"
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.penolong_persalinan}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={CaraPesalinanDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Cara Persalinan'}
          control={control}
          errors={errors}
          name="cara_persalinan"
          message="Wajib diisi"
          getValue="name"
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.cara_persalinan}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KeadaanIbuDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Keadaan Ibu'}
          control={control}
          errors={errors}
          name="keadaan_ibu"
          message="Wajib diisi"
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.keadaan_ibu}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KBPascaPersalinanDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'KB Pasca Persalinan'}
          control={control}
          errors={errors}
          name="kb_pasca_persalinan"
          message="Wajib diisi"
          getValue='name'
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.kb_pasca_persalinan}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Keterangan Tambahan"
          message="Harap diisi"
          name="keterangan_tambahan"
          onChange={() => {}}
          placeholder=""
          type="textarea"
          backgroundColor={'#fff'}
          border={1}
          // labelColor={'#fff'}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={checkIsDataNull(pelayananIbuBersalinData?.data) ? null : pelayananIbuBersalinData?.data?.keterangan_tambahan}
        />
      </ScrollView>
    </FormScreenLayout>
  );
};

export default PelayananIbuBersalinSection;
