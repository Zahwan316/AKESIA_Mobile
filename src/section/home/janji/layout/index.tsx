import { useNavigation } from '@react-navigation/native';
import { JSX } from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';
import { MAIN_COLOR, WHITE_BACKGROUND_COLOR } from '../../../../constants/color';

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
            <Icon name="chevron-left" style={{marginRight: 14}} color={'#fff'} size={32} onPress={() => {navigation.dispatch(CommonActions.goBack());}}/>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: '#fff'}}>{props.title}</Text>
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
    backgroundColor: MAIN_COLOR,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  mainContent: {
    width: '100%',
    height: verticalScale(620),
    borderWidth: 0,
    padding: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: WHITE_BACKGROUND_COLOR
  },
});

export default JanjiScreenLayout;
