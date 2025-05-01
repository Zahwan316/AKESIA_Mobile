import { JSX } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import {  Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type props = {
  img: ImageSourcePropType,
  title: string,
  description: string,
  time: string,
  handleClick: () => void,
  handleDelete: () => void,
}


const QueueItemComponent = (props: props): JSX.Element => {
  return(
    <View style={style.mainContentContainer}>
      <View style={style.imgContainer}>
        <Image
          source={props.img}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View style={style.textContainer}>
        <View style={{marginBottom: 8}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
          <Text style={{fontSize: 14}}>{props.description}</Text>
        </View>
        <View>
          <TouchableOpacity style={style.buttonMainContent} onPress={props.handleClick}>
            <Text style={style.textButtonContent}>Lihat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.actionContainer}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{props.time}</Text>
        </View>
        <View style={style.buttonGroupContainer}>
          <TouchableOpacity>
            <Icon name='whatsapp' size={30} color='#00ff0090'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='trash' size={30} color='#ff000090' onPress={props.handleDelete}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const style = StyleSheet.create({
  mainContentContainer: {
    width: '100%',
    minHeight: height * 0.14,
    maxHeight: height * 0.20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  buttonMainContent: {
    width: width * 0.40,
    height: 'auto',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: width * 0.15,
    height: '100%',
    borderWidth: 0,
  },
  textContainer: {
    width: width * 0.40,
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actionContainer: {
    width: width * 0.15,
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButtonContent: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});

export default QueueItemComponent;
