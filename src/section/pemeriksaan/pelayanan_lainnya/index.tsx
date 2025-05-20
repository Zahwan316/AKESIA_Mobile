import { JSX, useEffect, useState } from 'react';
import FormScreenLayout from '../screen_layout';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../type/modalInfo';
import { apiResponse } from '../../../type/pendaftaran/pendaftaran';
import { BORDER_COLOR } from '../../../constants/color';
import InputDatePickerComponent from '../../../component/input/datepicker';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../api/data/form';
import { handlePostFormApi } from '../../../api/handleSendFormApi';
import { checkIsDataNull } from '../../../utils/checkDataIsNull';
import InputComponent from '../../../component/input/text';
import { formattedDate, formattedDateData } from '../../../utils/date';
import { ScrollView } from 'react-native';
import calculateAge from '../../../utils/calculateAge';


const PelayananLainnyaSection = (): JSX.Element => {
  const navigate = useNavigation<any>();
  const router = useRoute();
  const { pemeriksaanData, pemeriksaanId} = router.params as {pemeriksaanData: PemeriksaanApiResponse, pemeriksaanId: number};
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
  const { data: layananIbuLainnyaFormData } = useQuery({
    queryKey: ['layananIbuLainnya', pemeriksaanId],
    queryFn: () => getForm(`form/layanan_ibu_lainnya/show_by_pendaftaran/${pemeriksaanId}`),
    enabled: !!pemeriksaanId,
  });

  const handleSendData = () => {
    handleSubmit((data) => handlePostFormApi(data, 'form/layanan_ibu_lainnya', pemeriksaanId, layananIbuLainnyaFormData, setSuccess, setModal, setModalInfo))();
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }

    setModal(!modal);
  };

  useEffect(() => {
    console.log(layananIbuLainnyaFormData);
    if(layananIbuLainnyaFormData && layananIbuLainnyaFormData?.data){
      reset({
        nama_ibu: layananIbuLainnyaFormData?.data.nama_ibu,
        umur_ibu: layananIbuLainnyaFormData?.data.umur_ibu,
        booking_layanan: layananIbuLainnyaFormData?.data.booking_layanan,
        catatan_soap: layananIbuLainnyaFormData?.data.catatan_soap,
        keterangan: layananIbuLainnyaFormData?.data.keterangan,
      });
    }
  }, [layananIbuLainnyaFormData]);

  return(
    <FormScreenLayout
      header="Pelayanan Lainnya"
      handlePage={handleSendData}
      modalVisible={modal}
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      created_at={checkIsDataNull(layananIbuLainnyaFormData?.data) ? 'Belum ada' : formattedDateData(layananIbuLainnyaFormData?.data.created_at)}
      updated_at={checkIsDataNull(layananIbuLainnyaFormData?.data) ? 'Belum ada' : formattedDateData(layananIbuLainnyaFormData?.data.updated_at)}
    >
      <View>
      <ScrollView >
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Nama Ibu"
          message="Harap diisi"
          name="nama_ibu"
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
          initialValue={checkIsDataNull(layananIbuLainnyaFormData?.data) ? pemeriksaanData?.ibu?.user?.nama_lengkap : layananIbuLainnyaFormData?.data.nama_ibu}
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Umur Ibu"
          message="Harap diisi"
          name="umur_ibu"
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
          initialValue={checkIsDataNull(layananIbuLainnyaFormData?.data) ? calculateAge(pemeriksaanData?.ibu?.tanggal_lahir).toString() : layananIbuLainnyaFormData?.data?.umur_ibu}
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
          initialValue={checkIsDataNull(layananIbuLainnyaFormData?.data) ? pemeriksaanData?.pelayanan?.nama : layananIbuLainnyaFormData?.data.booking_layanan }
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Catatan Soap"
          message="Harap diisi"
          name="catatan_soap"
          onChange={() => {}}
          placeholder=""
          type="textarea"
          backgroundColor={''}
          border={1}
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={checkIsDataNull(layananIbuLainnyaFormData?.data) ? null : layananIbuLainnyaFormData?.data.catatan_soap }
        />
        <InputComponent
          height={'auto'}
          width={'100%'}
          label="Keterangan"
          message="Harap diisi"
          name="keterangan"
          onChange={() => {}}
          placeholder=""
          type="textarea"
          backgroundColor={''}
          border={1}
          labelColor={''}
          textColor={''}
          control={control}
          errors={errors}
          borderColor={BORDER_COLOR}
          initialValue={checkIsDataNull(layananIbuLainnyaFormData?.data) ? null : layananIbuLainnyaFormData?.data.keterangan }
        />
      </ScrollView>
      </View>
    </FormScreenLayout>
  );
};

export default PelayananLainnyaSection;
