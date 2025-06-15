import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import InputComponent from '../../../../component/input/text';
import { BORDER_COLOR, MAIN_COLOR } from '../../../../constants/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { handlePostApi } from '../../../../api/handlePostApi';
import { modalInfo } from '../../tambah_anak';
import UploadSelfie from '../../../../component/input/upload/InputUpload';
import useAlbumFotoStore from '../../../../state/album_foto';
import FotoScreenLayout from '../../album_foto/layout';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import { handleEditApi } from '../../../../api/handleEditApi';
import { BASE_URL } from '../../../../constants/baseurl';

const FormRiwayatKehamilanGroup = ({control, errors, currKehamilan, filterFormValue}): React.ReactElement => {
  return(
    <>
      <InputComponent
        control={control}
        errors={errors}
        name="nama"
        width={'auto'}
        label="Judul"
        onChange={() => {}}
        type="text"
        border={1}
        borderColor={BORDER_COLOR}
        message="Wajib Diisi"
        initialValue={filterFormValue()}
      />
    </>
  );
};

const FormRiwayatKehamilanFoto = ({control, errors, riwayatKehamilanFotoEditData, fotoId, formImgData}): React.ReactElement => {
  return(
    <>
      <InputComponent
        control={control}
        errors={errors}
        name="nama"
        width={"auto"}
        label="Judul"
        onChange={() => {}}
        type="text"
        border={1}
        borderColor={BORDER_COLOR}
        message="Wajib Diisi"
        initialValue={riwayatKehamilanFotoEditData?.data !== undefined ? riwayatKehamilanFotoEditData?.data?.nama : ''}
      />
      <UploadSelfie
        control={control}
        name="img"
        errors={errors}
        message={(fotoId === 0  && riwayatKehamilanFotoEditData?.data !== null) ? 'Wajib Diisi' : undefined}
        label="Pilih foto"
      />
      {
        formImgData === undefined && fotoId !== 0 && riwayatKehamilanFotoEditData?.data != null ?
        <>
          <Text style={{textAlign: 'center', marginBottom: 12, fontWeight: 'bold', fontSize: 16}}>Gambar Sebelumnya : </Text>
          <Image
            source={{uri: `${BASE_URL}${riwayatKehamilanFotoEditData?.data?.uploads?.path}`}}
            style={{width: '100%', height: '50%'}}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </>
        : null

      }
    </>
  );
};

const RiwayatKehamilanFormSection = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm();
  const riwayatKehamilanGroupId = useAlbumFotoStore((state) => state.riwayatKehamilanGroupId);
  const riwayatKehamilanFotoId = useAlbumFotoStore((state) => state.riwayatKehamilanFotoId);
  const navigator = useNavigation<any>();
  const router = useRoute();
  const {screenBeforeName} = router.params as {screenBeforeName: string};
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const fotoId = useAlbumFotoStore((state) => state.fotoId);
  const setFotoId = useAlbumFotoStore((state) => state.setFotoId);
  const {data: riwayatKehamilanGroupEditData} = useQuery({
    queryKey: ['riwayatKehamilanGroupEditData'],
    queryFn: () => getData(`riwayat_kehamilan_group/${riwayatKehamilanGroupId}`),
    enabled: screenBeforeName === 'RiwayatKehamilanGroup' && riwayatKehamilanGroupId !== undefined,
  });
  const {data: riwayatKehamilanFotoEditData} = useQuery({
    queryKey: ['riwayatKehamilanFotoEditData', fotoId],
    queryFn: () => getData(`riwayat_kehamilan_foto/${fotoId}`),
    enabled: screenBeforeName === 'RiwayatKehamilanFoto' && fotoId !== 0,
  });
  const currKehamilan = useAlbumFotoStore((state) => state.currKehamilan);
  const formImgData = watch('img');

  const handleSubmitForm = async(data: any) => {
    if(screenBeforeName === 'RiwayatKehamilanGroup'){
      handleSubmitRiwayatKehamilanGroup(data);
    }
    else if(screenBeforeName === 'RiwayatKehamilanFoto'){
      handleSubmitRiwayatKehamilanFoto(data);
    }
  };

  const handleSubmitRiwayatKehamilanGroup = async(data: any) => {
    if(riwayatKehamilanGroupEditData?.data === null || riwayatKehamilanGroupEditData === undefined){
      handlePostApi(data, 'riwayat_kehamilan_group', setSuccess, setModal, setModalInfo);
    }
    else{
      handleEditApi(data, 'riwayat_kehamilan_group', riwayatKehamilanGroupId, setSuccess, setModal, setModalInfo);
    }
  };


  const handleSubmitRiwayatKehamilanFoto = async(data: any) => {
    const mergedData = {...data, riwayat_kehamilan_group_id: riwayatKehamilanGroupId, _method: (fotoId === null || fotoId === 0) ? 'POST' : 'PUT'};
    const formData = new FormData();

    for (const key in mergedData) {
      if (key === 'img') {
        const img = mergedData[key];
        if (img?.uri) {
          formData.append('img', {
            uri: img.uri,
            name: img.fileName || 'photo.jpg',
            type: img.type || 'image/jpeg',
          });
        }
      } else {
        formData.append(key, mergedData[key]);
      }
    }
    if(fotoId === null || fotoId === undefined || fotoId === 0){
      handlePostApi(formData, 'riwayat_kehamilan_foto', setSuccess, setModal, setModalInfo);
    }
    else{
      handlePostApi(formData, `riwayat_kehamilan_foto/${fotoId}`, setSuccess, setModal, setModalInfo);
    }
  };

  const handleModal = () => {
    if(isSuccess){
      if(screenBeforeName === 'RiwayatKehamilanGroup'){
        navigator.pop(1);
      }
      else if(screenBeforeName === 'RiwayatKehamilanFoto'){
        navigator.pop(1);
      }
    }

    setModal(!modal);
  };

  const filterFormValue = () => {
    if(screenBeforeName === 'RiwayatKehamilanGroup'){
      if(!riwayatKehamilanGroupEditData?.data){
        return `Kehamilan ke ${currKehamilan}`;
      }
      else{
        return riwayatKehamilanGroupEditData?.data?.nama;
      }
    }

    return '';
  };

  useEffect(() => {
    console.log('Riwayat Kehamilan Foto Edit Data = ', riwayatKehamilanFotoEditData);
    console.log('Foto id = ', fotoId);
  }, [formImgData]);

  useEffect(() => {
    if(screenBeforeName === 'RiwayatKehamilanGroup' && riwayatKehamilanGroupId !== undefined){
      reset({
        ...riwayatKehamilanGroupEditData?.data,
      });
    }
    else if(screenBeforeName === 'RiwayatKehamilanFoto' && riwayatKehamilanFotoEditData?.data){
      reset({
        nama: riwayatKehamilanFotoEditData?.data?.nama,
      });
    }
  }, [riwayatKehamilanGroupEditData, screenBeforeName, riwayatKehamilanFotoEditData])

  useEffect(() => {
    const unsubscribe = navigator.addListener('beforeRemove', () => {
      if(screenBeforeName === 'RiwayatKehamilanFoto'){
        setFotoId(0);
        reset({
          nama: '',
        });
      }
    });
    return unsubscribe;
  }, [navigator, screenBeforeName]);

  return(
    <FotoScreenLayout
      title={`${(riwayatKehamilanGroupEditData?.data === null || riwayatKehamilanGroupEditData === undefined || riwayatKehamilanGroupId === 0 || riwayatKehamilanGroupId === undefined) ? 'Tambah' : 'Edit'} Data`}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalHandleModal={handleModal}
    >
      <View>
        {
          screenBeforeName === 'RiwayatKehamilanGroup' &&
            <FormRiwayatKehamilanGroup
              control={control}
              errors={errors}
              currKehamilan={currKehamilan}
              filterFormValue={filterFormValue}
            />
        }
        {
          screenBeforeName === 'RiwayatKehamilanFoto' &&
            <FormRiwayatKehamilanFoto
              control={control}
              errors={errors}
              riwayatKehamilanFotoEditData={riwayatKehamilanFotoEditData}
              fotoId={fotoId}
              formImgData={formImgData}
            />
        }
      </View>
      <View>
        <ButtonComponent 
          title='Simpan'
          color={MAIN_COLOR}
          onPress={handleSubmit(handleSubmitForm)}
        />
      </View>
    </FotoScreenLayout>
  );
};

export default RiwayatKehamilanFormSection;
