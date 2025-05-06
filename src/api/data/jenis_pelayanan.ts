import axios from '../axios';

export const getJenisPelayanan = async () => {
  const response = await axios.get('layanan/jenis_pelayanan');
  return response.data;
};
