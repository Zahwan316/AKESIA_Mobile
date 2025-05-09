import axios from '../axios';

export const getAllAnak = async () => {
  const response = await axios.get('/getUserAnak');
  return response.data;
};
