import axios from '../../axios';

export const getPekerjaan = async () => {
  const response = await axios.get('referensi/pekerjaan');
  return response.data;
};
