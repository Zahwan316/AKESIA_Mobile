import {Image, StyleSheet, Text, View} from 'react-native';
import {MAIN_COLOR} from '../../../../../../../constants/color';
import {TouchableOpacity} from 'react-native';
import useDimension from '../../../../../../../hooks/useDimensions';
import { CurrencyFormat } from '../../../../../../../utils/currency';

type props = {
  title: string;
  code: string,
  handlePress: () => void,
  harga: number | string
};

const width = useDimension();

const ChildDropdownComponent = (props: props) => {
  return (
    <TouchableOpacity style={style.mainHeaderContainer} onPress={props.handlePress}>
      <View style={style.imgContainer}>
        <Image
          source={require('../../../../../../../assets/icon/note.png')}
          style={{
            width: '80%',
            height: '80%',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={style.textContainer}>
        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 2}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>
          {props.code}
        </Text>
      </View>
      <View style={style.priceContainer}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{CurrencyFormat(props.harga)} </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainHeaderContainer: {
    width: width * 0.8,
    minHeight: 50,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#d1d1d1',
    alignItems: 'center',
    marginBottom: 14,
    borderRadius: 12,
    padding: 8,
    gap: 4,
    flex: 1,
  },
  imgContainer: {
    width: width * 0.1,
    height: '100%',
    borderWidth: 0,
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '45%',
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  priceContainer: {
    width: '35%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
});

export default ChildDropdownComponent;
