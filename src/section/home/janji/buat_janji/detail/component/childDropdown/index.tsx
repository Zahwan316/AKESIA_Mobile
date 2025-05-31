import {Image, StyleSheet, Text, View} from 'react-native';
import {MAIN_COLOR} from '../../../../../../../constants/color';
import {TouchableOpacity} from 'react-native';
import useDimension from '../../../../../../../hooks/useDimensions';
import { CurrencyFormat } from '../../../../../../../utils/currency';

type props = {
  title: string;
  code: string,
  handlePress: () => void,
  harga: number | string,
  jenis_layanan?: number,
  img?: any,
};

const width = useDimension();

enum JenisLayananId {
  'BABY_SPA' = 1,
  'BIDAN_BUNDA' = 2,
  'PERIKSA_HAMIL' = 3,
  'PERSALINAN' = 4,
}

const ChildDropdownComponent = (props: props) => {
  return (
    <TouchableOpacity style={style.mainHeaderContainer} onPress={props.handlePress}>
      <View style={style.imgContainer}>
        <Image
          source={props.img || require('../../../../../../../assets/icon/note.png')}
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
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{
          props.harga === 0 || props.jenis_layanan === JenisLayananId.PERSALINAN ? 'Chat Admin' : CurrencyFormat(props.harga)}
        </Text>
        <Text></Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  mainHeaderContainer: {
    width: width * 0.9,
    //minHeight: 60,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#10101020',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 14,
    borderRadius: 12,
    padding: 8,
    gap: 12,
    shadowColor: '#101010',
    elevation: 4,
    //flex: 1,
  },
  imgContainer: {
    width: width * 0.1,
    height: 60,
    borderWidth: 0,
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '45%',
    /* height: '100%', */
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    flex:1,
  },
  priceContainer: {
    /* width: '35%',
    height: '100%', */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    flex:1,
  },
});

export default ChildDropdownComponent;
