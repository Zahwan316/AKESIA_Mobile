import { JSX, useEffect, useState } from 'react';
import FormScreenLayout from '../../screen_layout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputComponent from '../../../../component/input/text';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { modalInfoType } from '../../../../type/modalInfo';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import { BORDER_COLOR } from '../../../../constants/color';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../../api/data/form';
import { checkIsDataNull } from '../../../../utils/checkDataIsNull';
import { handlePostFormApi } from '../../../../api/handleSendFormApi';
import { formattedDateData } from '../../../../utils/date';

const PelayananIbuNifasSection = (): JSX.Element => {
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
  const {data: pelayananNifasFormData} = useQuery({
    queryKey: ['pelayananNifas', pendaftaranId],
    queryFn: () => getForm(`form/pelayanan_ibu_nifas/show_by_pendaftaran/${pendaftaranId}`),
    enabled: !!pendaftaranId,
  });

  const handlePage = () => {
    handleSubmit((data) => handlePostFormApi(data, `form/pelayanan_ibu_nifas`, pendaftaranId, pelayananNifasFormData, setSuccess, setModal, setModalInfo))();
  };

  const handleModal = () => {
    if(isSuccess){
      navigate.goBack();
    }
    setModal(!modal);
  };

  useEffect(() => {
    console.log(pelayananNifasFormData);
    if(pelayananNifasFormData && pelayananNifasFormData?.data){
      reset({
        klasifikasi_nifas_1: pelayananNifasFormData?.data.klasifikasi_nifas_1,
        tindakan_nifas_1: pelayananNifasFormData?.data.tindakan_nifas_1,
        tanggal_nifas_1: pelayananNifasFormData?.data.tanggal_nifas_1,
        klasifikasi_nifas_2: pelayananNifasFormData?.data.klasifikasi_nifas_2,
        tindakan_nifas_2: pelayananNifasFormData?.data.tindakan_nifas_2,
        tanggal_nifas_2: pelayananNifasFormData?.data.tanggal_nifas_2,
        klasifikasi_nifas_3: pelayananNifasFormData?.data.klasifikasi_nifas_3,
        tindakan_nifas_3: pelayananNifasFormData?.data.tindakan_nifas_3,
        tanggal_nifas_3: pelayananNifasFormData?.data.tanggal_nifas_3,
        klasifikasi_nifas_4: pelayananNifasFormData?.data.klasifikasi_nifas_4,
        tindakan_nifas_4: pelayananNifasFormData?.data.tindakan_nifas_4,
        tanggal_nifas_4: pelayananNifasFormData?.data.tanggal_nifas_4,
      });
    }
  }, [pelayananNifasFormData]);

  return(
    <FormScreenLayout
      header={'Pelayanan Ibu Nifas'}
      handlePage={handlePage}
      modalHandleModal={handleModal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalVisible={modal}
      created_at={checkIsDataNull(pelayananNifasFormData?.data ) ? 'Belum ada' : formattedDateData(pelayananNifasFormData?.data.created_at)}
      updated_at={checkIsDataNull(pelayananNifasFormData?.data ) ? 'Belum ada' : formattedDateData(pelayananNifasFormData?.data.updated_at)}
    >
      <ScrollView>
        {/*  */}
        <View style={style.formContainer}>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 1 (KF1)(6-48 Jam)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              message="Harap diisi"
              name="klasifikasi_nifas_1"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.klasifikasi_nifas_1}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              message="Harap diisi"
              name="tindakan_nifas_1"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tindakan_nifas_1}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
              name='tanggal_nifas_1'
              control={control}
              errors={errors}
              labelColor={''}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tanggal_nifas_1}
            />
          </View>
        </View>
        {/*  */}
        <View style={style.formContainer}>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 2 (KF2)(3-7 Hari)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              //message="Harap diisi"
              name="klasifikasi_nifas_2"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.klasifikasi_nifas_2}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              //message="Harap diisi"
              name="tindakan_nifas_2"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tindakan_nifas_2}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
              control={control}
              errors={errors}
              name='tanggal_nifas_2'
              labelColor={''}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tanggal_nifas_2}
            />
          </View>
        </View>
        {/*  */}
        <View style={style.formContainer}>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 3 (KF3)(8-28 Hari)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              //message="Harap diisi"
              name="klasifikasi_nifas_3"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.klasifikasi_nifas_3}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              //message="Harap diisi"
              name="tindakan_nifas_3"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tindakan_nifas_3}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
              control={control}
              errors={errors}
              name='tanggal_nifas_3'
              labelColor={''}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tanggal_nifas_3}
            />
          </View>
        </View>
        {/*  */}
        <View style={style.formContainer}>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Kunjungan Nifas 4 (KF4)(29-42 hari)</Text>
          </View>
          <View>
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Klasifikasi"
              //message="Harap diisi"
              name="klasifikasi_nifas_4"
              onChange={() => {}}
              placeholder=""
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.klasifikasi_nifas_4}
            />
            <InputComponent
              height={'auto'}
              width={'100%'}
              label="Tindakan"
              //message="Harap diisi"
              name="tindakan_nifas_4"
              onChange={() => {}}
              placeholder="C"
              type="text"
              backgroundColor={'#fff'}
              border={1}
              //labelColor={'#fff'}
              textColor={''}
              control={control}
              errors={errors}
              borderColor={BORDER_COLOR}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tindakan_nifas_4}
            />
            <InputDatePickerComponent
              label="Tanggal"
              onChange={() => {}}
              control={control}
              errors={errors}
              name='tanggal_nifas_4'
              labelColor={''}
              initialValue={checkIsDataNull(pelayananNifasFormData?.data ) ? '' : pelayananNifasFormData?.data.tanggal_nifas_4}
            />
          </View>
        </View>
      </ScrollView>
    </FormScreenLayout>
  );
};

const style = StyleSheet.create({
  formContainer: {
    marginBottom: 12
  },
  headerContainer: {
    width: '100%',
    height: 'auto',
    borderWidth: 0,
    marginBottom: 12,
  },
  textHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#101010',
  },
});

export default PelayananIbuNifasSection;
