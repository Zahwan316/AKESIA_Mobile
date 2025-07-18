import handleContentModal from '../component/modal/function';
import axios from './axios';

export const handleEditApi = async(
  data: any,
  url: string,
  id: number,
  setSuccess: any,
  setModal: any,
  setModalInfo: any,
  isFoto?: boolean
) => {
  console.log(data);
  try{
    await axios.put(`${url}/${id}`, data, isFoto ? {headers: {'Content-Type': 'multipart/form-data'}} : undefined).then(response => {
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: response.data.message,
        text: 'Tutup',
      });
      });
    }
  catch(error: any){
    console.log(error.response);
    setSuccess(false);
    handleContentModal({
      setModal,
      setModalInfo,
      message: error.response.data.message,
      text: 'Tutup',
    });
  }
};

