import { PermissionsAndroid, Platform } from 'react-native';

async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export default requestNotificationPermission;
