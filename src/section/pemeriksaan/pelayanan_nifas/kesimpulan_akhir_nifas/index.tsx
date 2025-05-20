import { JSX, useEffect, useState } from 'react';
import FormScreenLayout from '../../screen_layout';
import { View } from 'react-native';
import DropdownInputComponent from '../../../../component/input/dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../../type/modalInfo';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';
import { KeadaanBayiDropdownData, KeadaanIbuDropdownData, KomplikasiNifasDropdownData } from '../../../../data/pemeriksaan/kesimpulan_akhir_nifas';
import { formattedDateData } from '../../../../utils/date';

const KesimpulanAkhirNifasSection = (): JSX.Element => {
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
  const { data: kesimpulanAkhirNifasFormData } = useQuery({
    queryKey: ['kesimpulanAkhirNifas', pemeriksaanId],
    queryFn: () => getForm(`form/kesimpulan_ibu_nifas/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });

  const handleSendData = () => {
    handleSubmit((data) => handlePostFormApi(data, 'form/kesimpulan_ibu_nifas', pemeriksaanId, kesimpulanAkhirNifasFormData, setSuccess, setModal, setModalInfo))();
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }

    setModal(!modal);
  };

  useEffect(() => {
    console.log(kesimpulanAkhirNifasFormData);
    if(kesimpulanAkhirNifasFormData && kesimpulanAkhirNifasFormData?.data){
      reset({
        keadaan_ibu: kesimpulanAkhirNifasFormData?.data?.keadaan_ibu,
        komplikasi_nifas: kesimpulanAkhirNifasFormData?.data?.komplikasi_nifas,
        keadaan_bayi: kesimpulanAkhirNifasFormData?.data?.keadaan_bayi,
      });
    }
  }, [kesimpulanAkhirNifasFormData]);

  return(
    <FormScreenLayout
      header={'Kesimpulan Akhir Nifas'}
      handlePage={handleSendData}
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalVisible={modal}
      created_at={checkIsDataNull(kesimpulanAkhirNifasFormData?.data) ? 'Belum ada' : formattedDateData(kesimpulanAkhirNifasFormData?.data?.created_at)}
      updated_at={checkIsDataNull(kesimpulanAkhirNifasFormData?.data) ? 'Belum ada' : formattedDateData(kesimpulanAkhirNifasFormData?.data?.updated_at)}

    >
      <View>
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
          name='keadaan_ibu'
          getValue='name'
          initialValue={checkIsDataNull(kesimpulanAkhirNifasFormData?.data) ? null : kesimpulanAkhirNifasFormData?.data?.keadaan_ibu}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KomplikasiNifasDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Komplikasi Nifas'}
          control={control}
          errors={errors}
          name='komplikasi_nifas'
          getValue='name'
          initialValue={checkIsDataNull(kesimpulanAkhirNifasFormData?.data) ? null : kesimpulanAkhirNifasFormData?.data?.komplikasi_nifas}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={KeadaanBayiDropdownData}
          height={'auto'}
          //textColor={'#fff'}
          onSelect={() => {}}
          label={'Keadaan Bayi'}
          control={control}
          errors={errors}
          name='keadaan_bayi'
          getValue='name'
          initialValue={checkIsDataNull(kesimpulanAkhirNifasFormData?.data) ? null : kesimpulanAkhirNifasFormData?.data?.keadaan_bayi}
        />
      </View>
    </FormScreenLayout>
  );
};

export default KesimpulanAkhirNifasSection;
