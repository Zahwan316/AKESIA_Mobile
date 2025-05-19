import axios from '../axios';

export const getCurrentIbu = async () => {
  const response = await axios.get('ibu/getCurrIbu');
  return response.data;
};
