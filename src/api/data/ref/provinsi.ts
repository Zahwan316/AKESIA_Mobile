import axios from '../../axios';

export const getProvinsi = async () => {
  const response = await axios.get('referensi/provinsi');
  return response.data;
};
