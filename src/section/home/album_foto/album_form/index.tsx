import { useForm } from 'react-hook-form';
import FotoScreenLayout from '../layout';
import React, { useEffect, useState } from 'react';
import InputComponent from '../../../../component/input/text';
import { BORDER_COLOR, MAIN_COLOR } from '../../../../constants/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { handlePostApi } from '../../../../api/handlePostApi';
import { modalInfo } from '../../tambah_anak';
import UploadSelfie from '../../../../component/input/upload/InputUpload';
import useAlbumFotoStore from '../../../../state/album_foto';

const FormJanin = ({control, errors}): React.ReactElement => {
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

      />
    </>
  );
};

const FormUploadAlbum = ({control, errors}): React.ReactElement => {
  return(
    <>
      <InputComponent
        control={control}
        errors={errors}
        name="judul"
        width={"auto"}
        label="Judul"
        onChange={() => {}}
        type="text"
        border={1}
        borderColor={BORDER_COLOR}
        message="Wajib Diisi"

      />
      <InputComponent
        control={control}
        errors={errors}
        name="caption"
        width={'auto'}
        label="Caption"
        onChange={() => {}}
        type="textarea"
        border={1}
        borderColor={BORDER_COLOR}
        message="Wajib Diisi"
      />
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
  const usgId = useAlbumFotoStore((state) => state.usgId);
  const usgTitleName = useAlbumFotoStore((state) => state.usgTitleName);
  const navigator = useNavigation<any>();
  const router = useRoute();
  const {screenBeforeName} = router.params as {screenBeforeName: string};
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
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
    handlePostApi(data, 'album_foto_janin', setSuccess, setModal, setModalInfo);
  };

  const handleSubmitUsg = async(data: any) => {
    const mergedData = {...data, janin_id: janinId};
    handlePostApi(mergedData, 'album_foto_usg', setSuccess, setModal, setModalInfo);
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

  useEffect(() => {
    console.log('usg id = ', usgId);
    console.log('Janin Id', janinId);
  }, [usgId,janinId]);

  return(
    <FotoScreenLayout
      title='Tambah Data'
      modalVisible={modal}
      modalIsSuccess={isSuccess}
      modalMessage={modalInfo.message}
      modalText={modalInfo.text}
      modalHandleModal={handleModal}
    >
      <View>
        {
          screenBeforeName === 'AlbumFotoJanin' && <FormJanin control={control} errors={errors} />
        }
        {
          screenBeforeName === 'AlbumFotoUsg' && <FormJanin control={control} errors={errors} />
        }
        {
          screenBeforeName === 'AlbumFoto' && <FormUploadAlbum control={control} errors={errors} />
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

export default AlbumFormSection;
