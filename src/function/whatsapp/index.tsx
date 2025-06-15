import { Alert, Linking } from 'react-native';

export const openWhatsApp = async() => {
  const phone = '6281393333367';
  const message = 'Halo, saya ingin bertanya ';
  const text = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${text}`;

  try {
    // Mencoba membuka URL WhatsApp
    await Linking.openURL(whatsappUrl);
  } catch (error) {
    // Menangani kesalahan jika aplikasi tidak terinstal
    Alert.alert(
      'WhatsApp tidak terdeteksi',
      'Pastikan WhatsApp atau WhatsApp Business telah diinstal'
    );
  }

};
