import axios from '../../axios';

export const getForm = async (url: string) => {
  const response = await axios.get(`${url}`);
  return response.data;
};
