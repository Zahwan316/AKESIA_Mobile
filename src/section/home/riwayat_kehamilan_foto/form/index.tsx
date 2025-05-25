import { useForm } from 'react-hook-form';
;
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
import FotoScreenLayout from '../../album_foto/layout';

const FormRiwayatKehamilanGroup = ({control, errors}): React.ReactElement => {
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

const FormRiwayatKehamilanFoto = ({control, errors}): React.ReactElement => {
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

const RiwayatKehamilanFormSection = () => {
  const {
    control,
    handleSubmit,
    reset,
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

  const handleSubmitForm = async(data: any) => {
    if(screenBeforeName === 'RiwayatKehamilanGroup'){
      handleSubmitRiwayatKehamilanGroup(data);
    }
    else if(screenBeforeName === 'RiwayatKehamilanFoto'){
      handleSubmitRiwayatKehamilanFoto(data);
    }
  };

  const handleSubmitRiwayatKehamilanGroup = async(data: any) => {
    handlePostApi(data, 'riwayat_kehamilan_group', setSuccess, setModal, setModalInfo);
  };


  const handleSubmitRiwayatKehamilanFoto = async(data: any) => {
    const mergedData = {...data, riwayat_kehamilan_group_id: riwayatKehamilanGroupId};
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
    handlePostApi(formData, 'riwayat_kehamilan_foto', setSuccess, setModal, setModalInfo);
  };

  const handleModal = () => {
    if(isSuccess){
      if(screenBeforeName === 'RiwayatKehamilanGroup'){
        navigator.goBack();
      }
      else if(screenBeforeName === 'RiwayatKehamilanFoto'){
        navigator.goBack();
      }
    }

    setModal(!modal);
  };

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
          screenBeforeName === 'RiwayatKehamilanGroup' && <FormRiwayatKehamilanGroup control={control} errors={errors} />
        }
        {
          screenBeforeName === 'RiwayatKehamilanFoto' && <FormRiwayatKehamilanFoto control={control} errors={errors} />
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
