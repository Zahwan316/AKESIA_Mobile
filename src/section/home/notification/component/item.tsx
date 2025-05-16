import { JSX } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MAIN_COLOR } from "../../../../constants/color";
import Icon from 'react-native-vector-icons/FontAwesome5';

type props = {
  createdAt: string,
  message: string,
  title: string,
}

const NotificationItem = ({title, message, createdAt}: props): JSX.Element => {  
  return(
    <View style={Style.itemMainContainer}>
      <View style={Style.imgContainer}>
        <Icon name='bell' size={36} color='#000' />
      </View>
      <View style={{flex:1, gap: 4}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
        <Text style={{fontSize: 14}} numberOfLines={3}>{message}</Text>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  itemMainContainer: {
    width: '100%',
    /*  minHeight: 65, */
    borderWidth: 1,
    borderColor: '#10101020',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  imgContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    //backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default NotificationItem;
