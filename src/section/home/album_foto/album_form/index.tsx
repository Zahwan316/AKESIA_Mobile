import { useForm } from 'react-hook-form';
import FotoScreenLayout from '../layout';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import InputComponent from '../../../../component/input/text';
import { BORDER_COLOR, MAIN_COLOR } from '../../../../constants/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { handlePostApi } from '../../../../api/handlePostApi';
import { modalInfo } from '../../tambah_anak';
import UploadSelfie from '../../../../component/input/upload/InputUpload';
import useAlbumFotoStore from '../../../../state/album_foto';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../../../api/data/getData';
import { handleEditApi } from '../../../../api/handleEditApi';

const FormJanin = ({control, errors, screenBeforeName, currJanin, currUsg, janinEditData, usgEditData}): React.ReactElement => {
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
          screenBeforeName === 'AlbumFotoJanin' && (janinEditData?.data === null || janinEditData?.data === undefined) ? `Janin ke ${currJanin}` : 
          (screenBeforeName === 'AlbumFotoUsg' && (usgEditData?.data === null || usgEditData?.data === undefined) ? `USG ke ${currUsg}` : 
          (screenBeforeName === 'AlbumFotoJanin' && janinEditData?.data != null ? janinEditData?.data?.nama : 
            (screenBeforeName === 'AlbumFotoUsg' && (usgEditData?.data != null || usgEditData !== undefined) ? usgEditData?.data?.nama : '')
          )
        )
        }
      />
    </>
  );
};

const FormUploadAlbum = ({control, errors}): React.ReactElement => {
  return(
    <>
      <UploadSelfie
        control={control}
        name="img"
        errors={errors}
        message="Wajib Diisi"
        label="Pilih foto"
      />
    </>
  );
};

const AlbumFormSection = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const janinId = useAlbumFotoStore((state) => state.janinId);
  const setJaninId = useAlbumFotoStore((state) => state.setJaninId);
  const usgId = useAlbumFotoStore((state) => state.usgId);
  const setUsgId = useAlbumFotoStore((state) => state.setUsgId);
  const usgTitleName = useAlbumFotoStore((state) => state.usgTitleName);
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
  console.log('usg id main = ', usgId)
  const {data: usgEditData, refetchUsg} = useQuery({
    queryKey: ['usgEditData', usgId],
    queryFn: () => getData(`album_foto_usg/${usgId}`),
    enabled: !!usgId && screenBeforeName === 'AlbumFotoUsg',
  });

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
      setUsgId(0);
    }
  };

  const handleSubmitAlbumFoto = async(data: any) => {
    const mergedData = {...data, usg_id: usgId};
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
    handlePostApi(formData, 'album_foto', setSuccess, setModal, setModalInfo);
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
      }
      else if(screenBeforeName === 'AlbumFoto'){
        //navigator.navigate('AlbumFoto', {screenBeforeName: 'AlbumFotoUsg'});
        navigator.pop(1);
      }
    }

    setModal(!modal);
  };

  /* useFocusEffect(
    useCallback(() => {refetchJanin;},[])
  );
  */
  useEffect(() => {
    if(janinEditData && janinEditData?.data){
      reset({
        ...janinEditData?.data,
      });
    }
  }, [janinEditData]);

  useEffect(() => {
    if(usgEditData && usgEditData?.data){
      reset({
        ...usgEditData?.data,
      });
    }
  }, [usgEditData]);

  useEffect(() => {
    console.log('screen before = ', screenBeforeName);
    console.log('usgid = ', usgId);
    console.log('janin edit data = ', janinEditData);
    console.log('usg edit data = ', usgEditData);
  }, [screenBeforeName, usgId, janinEditData]);


  return(
    <FotoScreenLayout
      title={`${(janinId === 0 || janinId === undefined) || (usgId === 0 || usgId === undefined) ? 'Tambah' : 'Edit'} Data`}
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
          />
        }
        {
          screenBeforeName === 'AlbumFoto' && <FormUploadAlbum control={control} errors={errors} />
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
