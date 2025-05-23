import { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MAIN_COLOR } from "../../../../constants/color";
import { Image } from "react-native";
import { BASE_URL } from "../../../../constants/baseurl";
import { View } from "react-native";

type propsPage = {
  title: string;
  onPress: () => void;
  img: string
}

const AlbumImageItemComponent = ({title, onPress, img}: propsPage):JSX.Element => {
  return(
    <TouchableOpacity style={Style.mainContainer} onPress={onPress}>
      <View style={{filter: 'brightness(80%)'}}>
        <Image
          source={{uri: `${BASE_URL}${img}`}}
          style={{width: '100%', height: '100%', borderRadius: 12}}
          resizeMode="cover"
        />
      </View>
      <View style={{position: 'absolute', bottom: 0, left: 0, padding: 12, backgroundColor: '#10101055', width: '100%', borderBottomLeftRadius: 12, borderBottomRightRadius: 12}}>
        <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR,
    width: '48%',
    height: 200,
    borderRadius: 12,
    display: 'flex',
    marginBottom: 12,
    position: 'relative',
    //filter: 'brightness(90%)',
  },
});

export default AlbumImageItemComponent;
