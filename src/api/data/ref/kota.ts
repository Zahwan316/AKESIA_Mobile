import axios from '../../axios';

export const getKota = async () => {
  const response = await axios.get('referensi/kota');
  return response.data;
};
