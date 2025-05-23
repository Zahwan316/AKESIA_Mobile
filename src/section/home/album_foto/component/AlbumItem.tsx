import { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MAIN_COLOR } from "../../../../constants/color";

type propsPage = {
  title: string;
  onPress: () => void;
}

const AlbumItemComponent = ({title, onPress}: propsPage):JSX.Element => {
  return(
    <TouchableOpacity style={Style.mainContainer} onPress={onPress}>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR,
    width: '100%',
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default AlbumItemComponent;
