import messaging from '@react-native-firebase/messaging';
import requestNotificationPermission from '../request_notification';
import { getToken } from '../../firebase/index';
import axios from '../../api/axios';

export async function requestFCMToken() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  const permissionGranted = await requestNotificationPermission();

  if (!permissionGranted) {
    console.log('Permission denied for notifications');
    return;
  }

  if (enabled) {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    try{
      await axios.post('/fcm-token', {
        fcm_token: token,
      });
    }
    catch(e){
      console.log(e.response);
    }
    // Kirim token ke backend Laravel
  }
}

export async function getFcmToken() {
  try{

    const token = await messaging().getToken();
    console.log(token);
  }
  catch(e){
    console.log(e);
  }
}
