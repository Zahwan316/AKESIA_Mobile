import { JSX } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import {  Dimensions } from 'react-native';
import { BUTTON_COLOR, MAIN_COLOR } from '../../../../../constants/color';

const { width, height } = Dimensions.get('window');

type props = {
  img: ImageSourcePropType,
  title: string,
  description: string,
  time: string,
  status: string,
  role?: 'user' | 'bidan',
  handleClick: () => void,
  handleDelete: () => void,
  handlePeriksa?: () => void
}

const QueueItemComponent = (props: props): JSX.Element => {
  return(
    <View style={style.mainContentContainer}>
      <View style={style.infoContainer}>
        <View style={style.infoItemContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>{props.status}</Text>
        </View>
        <View>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{props.time}</Text>
        </View>
      </View>
      <View style={style.descContainer}>
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
          <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={style.buttonMainContent} onPress={props.handleClick}>
              <Text style={style.textButtonContent}>Lihat</Text>
            </TouchableOpacity>
            {
              props.role === 'bidan' ?
              <TouchableOpacity style={[style.buttonMainContent, {backgroundColor: BUTTON_COLOR}]} onPress={props.handlePeriksa}>
                <Text style={style.textButtonContent}>Periksa</Text>
              </TouchableOpacity>
              :
              null
            }
          </View>
        </View>
        <View style={style.actionContainer}>
          
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
    </View>
  );
};

const style = StyleSheet.create({
  mainContentContainer: {
    width: '100%',
    minHeight: height * 0.26,
    maxHeight: height * 0.3,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    flex: 1,
  },
  infoContainer: {
    width: '100%',
    height: '20%',
    borderWidth: 0,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItemContainer: {
    width: 'auto',
    backgroundColor: MAIN_COLOR,
    padding: 8,
    borderRadius: 8,
  },
  descContainer: {
    width: '100%',
    height: '75%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  buttonMainContent: {
    width: width * 0.20,
    height: 'auto',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: width * 0.20,
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
    width: width * 0.20,
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
