import axios from '../../axios';

export const getJenisPraktik = async () => {
  const response = await axios.get('referensi/jenis_praktik');
  return response.data;
};
