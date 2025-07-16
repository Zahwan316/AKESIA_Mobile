import { useNavigation } from '@react-navigation/native';
import { JSX } from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

type props = {
  children: React.ReactNode,
  style?: any,
  title: string
}

const JanjiScreenLayout = (props: props): JSX.Element => {
  const navigation = useNavigation();
  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={style.mainContainer}>
          <View style={style.headerContainer}>
            <Icon name="angle-left" size={42} onPress={() => {navigation.dispatch(CommonActions.goBack());}}/>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>{props.title}</Text>
            <View />
          </View>
          <View style={style.mainContent}>
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    paddingHorizontal: 12,
  },
  headerContainer: {
    width: '100%',
    height: '8%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainContent: {
    width: '100%',
    height: verticalScale(590),
    borderWidth: 0,
  },
});

export default JanjiScreenLayout;
