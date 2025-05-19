import { JSX } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ALTERNATIVE_PINK_COLOR, MAIN_COLOR } from '../../constants/color';

const LoadingIndicator = (): JSX.Element => {
  return(
    <View style={style.container}>
      <ActivityIndicator size="large" color={ALTERNATIVE_PINK_COLOR} style={{marginBottom: 12}} />
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Mohon Tunggu</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: '#40404055',
  },
});

export default LoadingIndicator;
