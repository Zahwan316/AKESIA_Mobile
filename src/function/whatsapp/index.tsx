import { Alert, Linking } from 'react-native';

export const openWhatsApp = () => {
  const phone = '6287747477975';
  const message = 'Halo, saya ingin bertanya ';
  const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('WhatsApp tidak terinstal','Mohon untuk menginstal whatsapp terlebih dahulu');
      }
    })
    .catch((err) => console.error(err));
};
