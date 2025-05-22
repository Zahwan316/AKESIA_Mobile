import handleContentModal from '../component/modal/function';
import { checkIsDataNull } from '../utils/checkDataIsNull';
import axios from './axios';

export const handlePostFormApi = async(
  data: any,
  url: string,
  pemeriksaanId: number,
  apiFormData: any,
  setSuccess: any,
  setModal: any,
  setModalInfo: any,
  user_id?: number,
) => {
  const mergedData = {...data, pemeriksaan_id: pemeriksaanId, user_id: user_id};
  try{
    console.log(mergedData);
    if(checkIsDataNull(apiFormData?.data)){
      await axios.post(`${url}`, mergedData).then(response => {
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
      await axios.put(`${url}/${apiFormData?.data.id}`, mergedData).then(response => {
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
  catch(error: any){
    setSuccess(false);
    handleContentModal({
      setModal,
      setModalInfo,
      message: error.response.data.message,
      text: 'Tutup',
    });
  }
};

