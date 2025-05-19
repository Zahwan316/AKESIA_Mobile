import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

type props = {
  title: string,
  children: React.ReactNode,
}

const HomeFeatureLayoutSection = (props: props) => {
  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={Style.mainContainer}>
          <View style={Style.headerContainer}>
            <TouchableOpacity>
              <Icon name='chevron-left' size={26}/>
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{props.title}</Text>
            <View></View>
          </View>
          <View style={Style.contentContainer}>
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '6%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    flexDirection: 'row',
  },
  contentContainer: {
    width: '100%',
    height: '94%',
  },
});

export default HomeFeatureLayoutSection;
