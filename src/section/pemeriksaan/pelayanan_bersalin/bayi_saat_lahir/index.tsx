import { JSX } from 'react/jsx-runtime';
import FormScreenLayout from '../../screen_layout';
import { View } from 'react-native';
import InputComponent from '../../../../component/input/text';
import DropdownInputComponent from '../../../../component/input/dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../../type/modalInfo';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { BORDER_COLOR } from '../../../../constants/color';
import handleContentModal from '../../../../component/modal/function';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import axios from '../../../../api/axios';
import Jenis_Kelamin from '../../../../data/jenis_kelamin';
import { AsuhanBayiSaatLahirDropdownData, JenisKelaminDropdownDataBayiSaatLahir, KondisiBayiSaatLahirDropdownData } from '../../../../data/pemeriksaan/bayi_saat_lahir';
import { formattedDateData } from '../../../../utils/date';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';

const BayiSaatLahirSection = (): JSX.Element => {
  const navigate = useNavigation<any>();
  const router = useRoute();
  const { pemeriksaanData, pemeriksaanId} = router.params as {pemeriksaanData: apiResponse, pemeriksaanId: number};
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

  const { data: bayiSaatLahirFormData } = useQuery({
    queryKey: ['bayiSaatlahir', pemeriksaanId],
    queryFn: () => getForm(`form/bayi_saat_lahir/show_by_pendaftaran/${pemeriksaanId}`),
  });

  const handlePage = () => {
    handleSubmit((data) => handlePostFormApi(data, 'form/bayi_saat_lahir', pemeriksaanId, bayiSaatLahirFormData, setSuccess, setModal, setModalInfo))();
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }
    setModal(!modal);
  };

  useEffect(() => {
    console.log(bayiSaatLahirFormData);
    if(bayiSaatLahirFormData && bayiSaatLahirFormData?.data){
      reset({
        anak_ke: bayiSaatLahirFormData?.data?.anak_ke.toString(),
        berat_lahir: bayiSaatLahirFormData?.data?.berat_lahir,
        panjang_badan: bayiSaatLahirFormData?.data?.panjang_badan,
        lingkar_kepala: bayiSaatLahirFormData?.data?.lingkar_kepala,
        jenis_kelamin: bayiSaatLahirFormData?.data?.jenis_kelamin,
        kondisi_bayi_saat_lahir: bayiSaatLahirFormData?.data?.kondisi_bayi_saat_lahir,
        asuhan_bayi_baru_lahir: bayiSaatLahirFormData?.data?.asuhan_bayi_baru_lahir,
      });
    }
  }, [bayiSaatLahirFormData]);

  return(
    <FormScreenLayout
      header="Bayi Saat Lahir"
      handlePage={handlePage}
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalVisible={modal}
      created_at={checkIsDataNull(bayiSaatLahirFormData?.data) ? 'Belum Ada' : formattedDateData(bayiSaatLahirFormData?.data.created_at)}
      updated_at={checkIsDataNull(bayiSaatLahirFormData?.data) ? 'Belum Ada' : formattedDateData(bayiSaatLahirFormData?.data.updated_at)}
    >
      <View style={{marginBottom: 44}}>
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Anak ke berapa?"
          message="Harap diisi"
          name="anak_ke"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          borderColor={BORDER_COLOR}
          control={control}
          errors={errors}
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.anak_ke}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Berat Lahir(gr)"
          message="Harap diisi"
          name="berat_lahir"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          borderColor={BORDER_COLOR}
          control={control}
          errors={errors}
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.berat_lahir}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Panjang Badan (cm)"
          message="Harap diisi"
          name="panjang_badan"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          borderColor={BORDER_COLOR}
          control={control}
          errors={errors}
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.panjang_badan}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Lingkar Kepala (cm)"
          message="Harap diisi"
          name="lingkar_kepala"
          onChange={() => {}}
          placeholder=""
          type="number"
          backgroundColor={'#fff'}
          border={1}
          //labelColor={'#fff'}
          textColor={''}
          borderColor={BORDER_COLOR}
          control={control}
          errors={errors}
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.lingkar_kepala}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={JenisKelaminDropdownDataBayiSaatLahir}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Jenis Kelamin'}
          control={control}
          errors={errors}
          name="jenis_kelamin"
          getValue="name"
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.jenis_kelamin}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KondisiBayiSaatLahirDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Kondisi Bayi Saat Lahir'}
          control={control}
          errors={errors}
          name="kondisi_bayi_saat_lahir"
          getValue="name"
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.kondisi_bayi_saat_lahir}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={AsuhanBayiSaatLahirDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Asuhan Bayi Baru Lahir'}
          control={control}
          errors={errors}
          name="asuhan_bayi_baru_lahir"
          getValue="name"
          initialValue={checkIsDataNull(bayiSaatLahirFormData?.data) ? null : bayiSaatLahirFormData?.data?.asuhan_bayi_baru_lahir}
        />
      </View>
    </FormScreenLayout>
  );
};

export default BayiSaatLahirSection;
