import { Alert, Linking } from 'react-native';

export const openWhatsApp = async() => {
  const phone = '6281393333367';
  const message = 'Halo, saya ingin bertanya ';
  const text = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const whatsappBusinessUrl = `https://wa.me/${phone}?text=${text}`;

  Linking.canOpenURL(whatsappUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(whatsappUrl);
      } else {
        // fallback ke wa.me
        Linking.canOpenURL(whatsappBusinessUrl)
          .then((supportedWeb) => {
            if (supportedWeb) {
              Linking.openURL(whatsappBusinessUrl);
            } else {
              Alert.alert(
                'WhatsApp tidak terdeteksi',
                'Pastikan WhatsApp atau WhatsApp Business telah diinstal'
              );
            }
          });
      }
    })
    .catch((err) => console.error(err)); 

};
