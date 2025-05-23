import handleContentModal from '../component/modal/function';
import axios from './axios';

export const handlePostApi = async(
  data: any,
  url: string,
  setSuccess: any,
  setModal: any,
  setModalInfo: any,
) => {
  console.log(data);
  try{
    await axios.post(`${url}`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
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

