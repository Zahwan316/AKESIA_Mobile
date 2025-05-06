import axios from '../axios';

export const getPelayanan = async (url: string) => {
  const response = await axios.get(`${url}`);
  console.log(response.data);
  return response.data;
};
