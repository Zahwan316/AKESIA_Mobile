import axios from '../axios';

export const getUserLogin = async () => {
  const response = await axios.get('checktoken');
  return response.data;
};
