import axios from '../axios';

export const getPendaftaranUser = async (url: string) => {
  const response = await axios.get(`${url}`);
  return response.data;
};
