import { useForm } from 'react-hook-form';
import FotoScreenLayout from '../layout';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import InputComponent from '../../../../component/input/text';
import { BORDER_COLOR, MAIN_COLOR } from '../../../../constants/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { handlePostApi } from '../../../../api/handlePostApi';
import { modalInfo } from '../../tambah_anak';
import UploadSelfie from '../../../../component/input/upload/InputUpload';
import useAlbumFotoStore from '../../../../state/album_foto';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import { handleEditApi } from '../../../../api/handleEditApi';
import { BASE_URL } from '../../../../constants/baseurl';

const FormJanin = ({control, errors, screenBeforeName, currJanin, currUsg, janinEditData, usgEditData, getInitialNama}): React.ReactElement => {
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
        initialValue={
          getInitialNama()
        }
      />
    </>
  );
};

const FormUploadAlbum = ({control, errors, fotoEditData, fotoForm, fotoId}): React.ReactElement => {
  return(
    <>
      <UploadSelfie
        control={control}
        name="img"
        errors={errors}
        message={(fotoId === 0  && fotoEditData?.data !== null) ? 'Wajib Diisi' : 'Pilih Gambar Baru Jika Ingin Mengganti Gambar'}
        label="Pilih foto"
      />
      {
        (fotoForm === null || fotoForm === undefined) && fotoEditData?.data !== null && fotoId !== 0 ?
        <>
          <Text style={{textAlign: 'center', marginBottom: 12, fontWeight: 'bold', fontSize: 16}}>Gambar Sebelumnya : </Text>
          <Image
            source={{uri: `${BASE_URL}${fotoEditData?.data?.uploads?.path}`}}
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

const AlbumFormSection = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm();
  const janinId = useAlbumFotoStore((state) => state.janinId);
  const setJaninId = useAlbumFotoStore((state) => state.setJaninId);
  const usgId = useAlbumFotoStore((state) => state.usgId);
  const setUsgId = useAlbumFotoStore((state) => state.setUsgId);
  const fotoId = useAlbumFotoStore((state) => state.fotoId);
  const setFotoId = useAlbumFotoStore((state) => state.setFotoId);

  const navigator = useNavigation<any>();
  const router = useRoute();
  const {screenBeforeName} = router.params as {screenBeforeName: string};
  const currJanin = useAlbumFotoStore((state) => state.currJanin);
  const currUSG = useAlbumFotoStore((state) => state.currUSG);
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: janinEditData, refetchJanin} = useQuery({
    queryKey: ['janinEditData', janinId],
    queryFn: () => getData(`album_foto_janin/${janinId}`),
    enabled: !!janinId && screenBeforeName === 'AlbumFotoJanin',
  });
  const {data: usgEditData, refetchUsg} = useQuery({
    queryKey: ['usgEditData', usgId],
    queryFn: () => getData(`album_foto_usg/${usgId}`),
    enabled: !!usgId && screenBeforeName === 'AlbumFotoUsg',
  });
  const {data: fotoEditData, refetchFoto} = useQuery({
    queryKey: ['usgEditData', fotoId],
    queryFn: () => getData(`album_foto/${fotoId}`),
    enabled: !!fotoId && screenBeforeName === 'AlbumFoto',
  });
  const fotoForm = watch('img');

  const handleSubmitForm = async(data: any) => {
    if(screenBeforeName === 'AlbumFotoJanin'){
      handleSubmitJanin(data);
    }
    else if(screenBeforeName === 'AlbumFotoUsg'){
      handleSubmitUsg(data);
    }
    else if(screenBeforeName === 'AlbumFoto'){
      handleSubmitAlbumFoto(data);
    }
  };

  const handleSubmitJanin = async(data: any) => {
    if(janinId === 0 || janinId === undefined){
      handlePostApi(data, 'album_foto_janin', setSuccess, setModal, setModalInfo);
    }
    else {
      handleEditApi(data, 'album_foto_janin', janinId, setSuccess, setModal, setModalInfo);
      setJaninId(0);
    }
  };

  const handleSubmitUsg = async(data: any) => {
    const mergedData = {...data, janin_id: janinId};
    if(usgId === 0 || usgId === undefined){
      handlePostApi(mergedData, 'album_foto_usg', setSuccess, setModal, setModalInfo);
    }
    else{
      handleEditApi(mergedData, 'album_foto_usg', usgId, setSuccess, setModal, setModalInfo);
    }
  };

  const handleSubmitAlbumFoto = async(data: any) => {
    const mergedData = {...data, usg_id: usgId, _method: fotoId === 0 ? 'POST' : 'PUT'};
    const formData = new FormData();
    console.log(mergedData)

    for (const key in mergedData) {
      if (key === 'img') {
        const img = mergedData[key];
        if (img?.uri) {
          const uri = img.uri.startsWith('file://') ? img.uri : `file://${img.uri}`;
          formData.append('img', {
            uri: uri,
            name: img.fileName || 'photo.jpg',
            type: img.type || 'image/jpeg',
          });
        }
      } else {
        formData.append(key, mergedData[key]);
      }
    }

    if(fotoId === 0 || fotoId === undefined){
      handlePostApi(formData, 'album_foto', setSuccess, setModal, setModalInfo);
    }
    else{
      handlePostApi(formData, `album_foto/${fotoId}`, setSuccess, setModal, setModalInfo);
    }
  };

  const handleModal = () => {
    if(isSuccess){
      if(screenBeforeName === 'AlbumFotoJanin'){
        //navigator.navigate('AlbumFotoJanin');
        navigator.pop(1);
      }
      else if(screenBeforeName === 'AlbumFotoUsg'){
        //navigator.navigate('AlbumFotoUsg', {screenBeforeName: 'AlbumFotoJanin'});
        navigator.pop(1);
        setUsgId(0);
      }
      else if(screenBeforeName === 'AlbumFoto'){
        //navigator.navigate('AlbumFoto', {screenBeforeName: 'AlbumFotoUsg'});
        navigator.pop(1);
      }
    }

    setModal(!modal);
  };

  const getInitialNama = () => {
    if (screenBeforeName === 'AlbumFotoJanin') {
      if (!janinEditData?.data) {
        return `Janin ke ${currJanin}`;
      } else {
        return janinEditData.data.nama;
      }
    } else if (screenBeforeName === 'AlbumFotoUsg') {
      if (!usgEditData?.data) {
        return `USG ke ${currUSG}`;
      } else {
        return usgEditData.data.nama;
      }
    }
    return '';
  };

  useEffect(() => {
    if (screenBeforeName === 'AlbumFotoJanin' && janinEditData?.data) {
      reset({...janinEditData.data});
    }
    else if (screenBeforeName === 'AlbumFotoUsg' && usgEditData?.data) {
      reset({...usgEditData.data});
    }
    /* else if (screenBeforeName === 'AlbumFoto' && fotoEditData?.data) {
      reset({
        ...fotoEditData.data,
        img: {
          uri: `${BASE_URL}${fotoEditData.data.uploads?.path}`,
          fileName: fotoEditData.data.uploads?.original_name || 'photo.jpg',
          type: 'image/jpeg',
        },
      });
    } */
  }, [janinEditData, screenBeforeName, usgEditData, fotoEditData]);


  //handle delete fotoId
  useEffect(() => {
    const unsubscribe = navigator.addListener('beforeRemove', () => {
      if(screenBeforeName === 'AlbumFoto'){
        setFotoId(0);
      }
    });

    return unsubscribe;
  }, [navigator, screenBeforeName]);

  return(
    <FotoScreenLayout
      title={`${(janinId === 0 || janinId === undefined) || (usgId === 0 || usgId === undefined) || (fotoId === 0) ? 'Tambah' : 'Edit'} Data`}
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalHandleModal={handleModal}
    >
      <View>
        {
          screenBeforeName === 'AlbumFotoJanin' &&
          <FormJanin
            control={control}
            errors={errors}
            screenBeforeName={screenBeforeName}
            currJanin={currJanin}
            janinEditData={janinEditData}
            getInitialNama={getInitialNama}
          />
        }
        {
          screenBeforeName === 'AlbumFotoUsg' && 
          <FormJanin
            control={control}
            errors={errors}
            currUsg={currUSG}
            usgEditData={usgEditData}
            screenBeforeName={screenBeforeName}
            getInitialNama={getInitialNama}
          />
        }
        {
          screenBeforeName === 'AlbumFoto' &&
            <FormUploadAlbum
              control={control}
              errors={errors}
              fotoEditData={fotoEditData}
              fotoForm={fotoForm}
              fotoId={fotoId}
              />
        }
      </View>
      <View>
        <ButtonComponent
          title="Simpan"
          color={MAIN_COLOR}
          onPress={handleSubmit(handleSubmitForm)}
        />
      </View>
    </FotoScreenLayout>
  );
};

export default AlbumFormSection;
