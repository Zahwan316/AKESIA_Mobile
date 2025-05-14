import axios from '../axios';

export const getNotification = async (url: string) => {
  const response = await axios.get(`${url}`);
  return response.data;
};
