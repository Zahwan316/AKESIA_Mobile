import { JSX, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MAIN_COLOR } from '../../../constants/color';
import NotificationItem from './component/item';
import { useQuery } from '@tanstack/react-query';
import { getNotification } from '../../../api/data/notification';
import useUserStore from '../../../state/user';

const NotificationSection = (): JSX.Element => {
  const user = useUserStore((state) => state.user);

  const {data: notificationData} = useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotification(`notification?user_id=${user?.id}`),
  });

  const dataNotif: [] = notificationData?.data;

  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={Style.mainContainer}>
          <View style={Style.headerContainer}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>Notifikasi</Text>
          </View>
          <ScrollView style={Style.itemContainer}>
            {
              Array.isArray(dataNotif) && dataNotif.length !== 0 ?
              dataNotif?.map((item: any, index: number) => {
                return(
                  <NotificationItem
                    key={index}
                    title={item.title}
                    message={item.message}
                    createdAt={item.created_at}
                  />
                );
              })
              :
              <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>Belum ada notifikasi</Text>
              </View>
            };

          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: MAIN_COLOR,
  },
  headerContainer: {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    paddingVertical: 24,
  },
});

export default NotificationSection;
