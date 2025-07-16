import { JSX, useState } from 'react';
import { Alert, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import {  Dimensions } from 'react-native';
import { BUTTON_COLOR, MAIN_COLOR } from '../../../../../constants/color';
import { openWhatsApp } from '../../../../../function/whatsapp';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { width, height } = Dimensions.get('window');

type props = {
  img: ImageSourcePropType,
  title: string,
  description: string,
  time: string,
  status: string,
  role?: 'user' | 'bidan',
  pendaftaranId: number,
  date: string,
  jenisLayanan: string,
  handleClick: () => void,
  handleDelete: () => void,
  handlePeriksa?: () => void
}

const imgMap: {[key: string]: ImageSourcePropType} = {
  'Baby Spa dan Massage': require('../../../../../assets/icon/babyspa.png'),
  'Persalinan': require('../../../../../assets/icon/persalinan_icon.png'),
  'Bidan Bunda': require('../../../../../assets/icon/bunda.png'),
  'Periksa Hamil Nyaman': require('../../../../../assets/icon/bunda.png'),
};

const QueueItemComponent = (props: props): JSX.Element => {
  const handleAlert = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menghapus data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: props.handleDelete,
        },
      ]
    );
  };

  const handleStatusBackground = (status) => {
    switch(status){
      case 'Menunggu Konfirmasi':
        return '#FACC15';
      case 'Disetujui':
        return '#86EFAC';
      case 'Dibatalkan':
        return '#F87171';
      case 'Selesai':
        return '#60A5FA';
      default:
        return '#FACC15';
    }
  };

  return(
    <View style={style.mainContentContainer}>
      <View style={style.topContainer}>
        <View style={style.imgContainer}>
            <Image
              source={imgMap[props.jenisLayanan]}
              style={{width: '100%', height: '80%'}}
              resizeMode="contain"
            /> 
        </View>
        <View style={style.actionContainer}>
            <View style={style.buttonGroupContainer}>            
              <TouchableOpacity>
                {
                  (props.role === 'user' && props.status !== "Menunggu Konfirmasi") || (props.role === 'bidan' && props.status === 'Selesai') ?
                  null
                  :
                  <Icon name="trash" size={30} color='#ff000090' onPress={handleAlert}/>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={openWhatsApp}>
                <Icon name='whatsapp' size={30} color='#00ff0090'/>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={style.descContainer}>
        <View style={style.textContainer}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
            <Text style={{fontSize: 14, color: '#7a7a7a'}}>{props.description}</Text>
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
      </View>
      <View style={style.infoContainer}> 
        <View>
          <Text style={{fontWeight: 'normal', fontSize: 14, color: '#7a7a7a'}}>{dayjs(props.date).format('DD MMMM YYYY')}</Text>
          <Text style={{fontWeight: 'normal', fontSize: 14, color: '#7a7a7a'}}>Jam {dayjs(props.time, 'HH:mm:ss').format('HH:mm')}</Text>
        </View>
        <View style={[style.infoItemContainer, {backgroundColor: handleStatusBackground(props.status)}]}>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#f8f8f8'}}>{props.status}</Text>
        </View>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  mainContentContainer: {
    width: '100%',
    minHeight: height * 0.34,
    maxHeight: height * 0.37,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#80808015',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    flex: 1,
    //elevation: 2,
  },
  infoContainer: {
    width: '100%',
    height: '25%',
    borderBottomWidth: 0,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#909090',
  },
  topContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItemContainer: {
    width: 'auto',
    backgroundColor: MAIN_COLOR,
    padding: 8,
    borderRadius: 8,
  },
  descContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    //flex: 1,
    gap: 12,
    borderWidth: 0,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonMainContent: {
    width: width * 0.20,
    height: 'auto',
    backgroundColor: '#101010',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: width * 0.16,
    height: '100%',
    borderWidth: 0,
    marginRight: 8,
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
