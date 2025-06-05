import handleContentModal from '../component/modal/function';
import axios from './axios';

export const handleDeleteApi = async(
  url: string,
  setSuccess: any,
  setModal: any,
  setModalInfo: any,
) => {
  try{
    await axios.delete(`${url}`).then(response => {
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

