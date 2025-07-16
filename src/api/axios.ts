import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const instance = axios.create({
  baseURL: /* __DEV__ ?  */ 'http://10.0.2.2:8000/api/' /* 'https://akesia.my.id/api/' */,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + EncryptedStorage.getItem('token'),
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await EncryptedStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
