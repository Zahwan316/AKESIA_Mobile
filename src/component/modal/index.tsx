import { JSX, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, View, Text, Button } from 'react-native';
import ButtonComponent from "../button";
import { BUTTON_COLOR, MAIN_COLOR } from "../../constants/color";

type props = {
  handleModal: () => void,
  modalVisible: boolean,
  isSuccess: 'true' | 'false' | boolean,
  title?: string,
  message: string,
  text: string,
}

const failedIcon = require('../../assets/icon/failed.png');
const successIcon = require('../../assets/icon/success.png');

const ModalComponent = ({ handleModal, title, message, isSuccess, text, modalVisible }: props): JSX.Element => {
  return(
    <Modal visible={modalVisible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000030' }}>
        <View style={style.mainContent}>
          <View style={style.imageContainer}>
            <Image
              source={isSuccess ? successIcon : failedIcon}
              style={{width: 100, height: 100}}
              resizeMode='contain'
            />
          </View>
          <View style={style.textContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>{isSuccess ? 'Berhasil' : 'Gagal'}</Text>
            <Text style={{fontSize: 14, textAlign: 'center'}}>{message}</Text>
          </View>
          <View style={style.buttonContainer}>
            <ButtonComponent
              onPress={() => handleModal()}
              title={text}
              customstyle={{width: '100%'}}
              color={MAIN_COLOR}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  mainContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    height: 'auto',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalComponent;
