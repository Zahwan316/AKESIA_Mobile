import React, { useEffect } from 'react';
import RouteNavigation from './src/route/Index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingIndicator from './src/component/loading';
import useComponentStore from './src/state/component';
import firebase from '@react-native-firebase/app';
import requestNotificationPermission from './src/function/request_notification';
import { getFcmToken, requestFCMToken } from './src/function/fcm_token';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { createChannel } from './src/function/notifee/create_channel';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Config from 'react-native-config';
import { GoogleConfigure } from './src/auth/authConfig';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const loading = useComponentStore((state) => state.loading);

  
  useEffect(() => {
    requestNotificationPermission();
    requestFCMToken();
    GoogleConfigure();
  }, []);

  useEffect(() => {
    console.log('api url',Config.API_URL);
    // Minta izin
    messaging().requestPermission();
    // Buat channel notifikasi
    createChannel();
    // Tangkap pesan masuk
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { title, body } = remoteMessage.notification || {};
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
        },
      });
    });
    return unsubscribe;
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        {
          loading &&
          <LoadingIndicator />
        }
        <RouteNavigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
