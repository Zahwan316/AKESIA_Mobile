import axios from '../../axios';

export const getPendidikan = async () => {
  const response = await axios.get('referensi/pendidikan');
  return response.data;
};
