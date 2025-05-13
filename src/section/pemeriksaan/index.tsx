import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import dropdownItem from '../../data/pemeriksaan';
import { BUTTON_COLOR, BUTTON_COLOR_2, BUTTON_COLOR_3, BUTTON_COLOR_4, MAIN_COLOR } from '../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { act, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonComponent from '../../component/button';
import { apiResponse } from '../../type/pendaftaran/pendaftaran';
import axios from '../../api/axios';
import handleContentModal from '../../component/modal/function';
import ModalComponent from '../../component/modal';

const PemeriksaanSection = (): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {formId, pendaftaranId, pendaftaranData } = route.params as {formId: number, pendaftaranId: number, pendaftaranData: apiResponse};
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });


  const handleActiveIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleChangeScreen = (screen: string, pendaftaranId?: number) => {
    navigation.navigate(screen, {pendaftaranId: pendaftaranId, pendaftaranData: pendaftaranData});
  };

  const handleSetPendaftaranComplete = async() => {
    const data = {status: 'Selesai'};
    try{
      const response = await axios.put(`pendaftaran/${pendaftaranId}`, data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message: 'Formulir berhasil disimpan, Terima kasih sudah mengisi data pemeriksaan',
        text: 'Tutup',
      });
    }
    catch(e){
      console.log(e.response);
      setSuccess(true);
        handleContentModal({
          setModal,
          setModalInfo,
          message: e.response.data.message,
          text: 'Tutup',
        });
    }
  };

  const handleModal = () => {
    if(isSuccess){
      navigation.navigate('ListJanji');
    }
    setModal(!modal);
  };

  const handleSelesai = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menyelesaikan formulir ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => handleSetPendaftaranComplete(),
        },
      ]
    );
  };

  return(
    <SafeAreaView style={{}}>
      <View style={[style.mainContainer, {backgroundColor: '#D9D9D9'}]}>
        <View style={style.headerContainer}>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24}}>
            <Image
              source={require('../../assets/img/LogoBidanBunda.png')}
              style={{width: 70, height: 70, marginBottom: 8}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          <Text style={{fontSize: 24, color: '#fff'}}>Pemeriksaan</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', gap: 12}}>
           {/*  <View style={style.buttonInfo}>
              <Text>Terakhir dibuat 20:30</Text>
            </View>
            <View style={style.buttonInfo}>
              <Text>Terakhir diupdate 20:20</Text>
            </View> */}
          </View>
        </View>
        <View style={style.mainDropdownContainer}>
          {
            dropdownItem.map((item, index) => (
              item.formId === formId &&
              <React.Fragment key={index}>
                <TouchableOpacity style={style.mainDropdown} key={index + item.id} onPress={handleActiveIndex.bind(this, index)}>
                  <Text style={{color: BUTTON_COLOR, fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
                  {
                    activeIndex === index ?
                    <Icon name="angle-up" size={20} color={BUTTON_COLOR} />
                    :
                    <Icon name="angle-down" size={20} color={BUTTON_COLOR} />
                  }
                </TouchableOpacity>
                <View style={[style.childDropdown, { display: activeIndex != index ? 'none' : 'flex'}]}>
                  {
                    activeIndex === index &&
                    Array.isArray(item?.child) && item?.child.map((child, indexChild) => (
                      <TouchableOpacity key={indexChild} style={{padding: 8, height: 48, justifyContent: 'center'}} onPress={() => handleChangeScreen(child.screen, pendaftaranId)}>
                        <Text style={{fontSize: 16}}>
                          {child.name}
                        </Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </React.Fragment>
            ))
          }
        </View>
        <View style={style.buttonContainer}>
          <ButtonComponent
            title="Selesai"
            color={BUTTON_COLOR_3}
            onPress={() => handleSelesai()}
          />
        </View>
      </View>
      <ModalComponent
        message={modalInfo.message}
        text={modalInfo.text}
        modalVisible={modal}
        isSuccess={isSuccess}
        handleModal={handleModal}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    //padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 18,
    backgroundColor: MAIN_COLOR,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  mainDropdownContainer: {
    width: '100%',
    height: '60%',
    padding: 12,
  },
  mainDropdown: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    gap: 6,
  },
  childDropdown: {
    width: '100%',
    height: '8%',
    backgroundColor: '#fff',
    marginBottom: 18,
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInfo: {
    width: 'auto',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 12,
  }
});

export default PemeriksaanSection;
