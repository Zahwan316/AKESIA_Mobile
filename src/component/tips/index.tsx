import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native';

type props = {
  customDescription?: string
}

const TipsComponent = (props: props) => {
  const [visible, setVisible] = useState<boolean>(true);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return(
    visible &&
    <TouchableOpacity style={Style.mainContainer} onPress={handleVisible}>
      <Text>Tekan untuk menutup</Text>
      <Image
        source={require('../../assets/img/question.png')}
        style={{width: 200, height: 200, marginBottom: 12}}
      />
      <Text style={Style.title}>Tips</Text>
      <Text style={Style.text}>{props.customDescription}</Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#d1d1d165',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
  },
});

export default TipsComponent;
