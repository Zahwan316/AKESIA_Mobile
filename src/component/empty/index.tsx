import { Text } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';

const EmptyDataComponent = () => {
  return(
    <View style={{width:'100%', borderWidth:0, display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Image
        source={require('../../assets/img/emptydata.png')}
        style={{width: 200, height: 200, marginBottom: 12}}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
        Oops!! Data masih kosong
      </Text>
      <Text style={{fontSize: 18, fontWeight: 'normal'}}>
        Belum ada data nih tambah yuk!
      </Text>
  </View>
  );
};

export default EmptyDataComponent;
