import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import dropdownItem from '../../data/pemeriksaan';
import {
  BUTTON_COLOR,
  BUTTON_COLOR_2,
  BUTTON_COLOR_3,
  BUTTON_COLOR_4,
  MAIN_COLOR,
} from '../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {act, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ButtonComponent from '../../component/button';
import {apiResponse} from '../../type/pendaftaran/pendaftaran';
import axios from '../../api/axios';
import handleContentModal from '../../component/modal/function';
import ModalComponent from '../../component/modal';
import {modalInfo} from '../../type/modalInfo';
import {useQuery} from '@tanstack/react-query';
import {getForm} from '../../api/data/form';
import ChildDropdownComponent from '../home/janji/buat_janji/detail/component/childDropdown';
import usePelayananStore from '../../state/pelayanan';
import useUserStore from '../../state/user';

enum JenisLayananId {
  'BABY_SPA' = 1,
  'BIDAN_BUNDA' = 2,
  'PERIKSA_HAMIL' = 3,
  'PERSALINAN' = 4,
}

const periksaHamilRegex = /Periksa Hamil Nyaman/i;

const PemeriksaanSection = (): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigation = useNavigation<any>();
  const route = useRoute();
  //const [pelayananPeriksaHamilId, setPelayananPeriksaHamilId] = useState<number>(0);
  const pelayananPeriksaHamilId = usePelayananStore(
    state => state.pelayananPeriksaHamilId,
  );
  const setPelayananPeriksaHamilId = usePelayananStore(
    state => state.setPelayananPeriksaHamilId,
  );
  const currUserData = useUserStore((state) => state.user);
  const {formId, pemeriksaanId, pemeriksaanData, pendaftaranId} =
    route.params as {
      formId: number;
      pemeriksaanId: number;
      pemeriksaanData: PemeriksaanApiResponse;
      pendaftaranId: number;
    };
  const [modal, setModal] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalInfo>({
    message: '',
    text: '',
  });
  const {data: formData} = useQuery({
    queryKey: ['formData'],
    queryFn: () =>
      getForm(
        `layanan/pelayanan_form_item?pelayanan_id=${pemeriksaanData?.pelayanan_id}`,
      ),
  });
  const {data: periksaHamilLayananData} = useQuery({
    queryKey: ['periksaHamilLayananData'],
    queryFn: () => getForm(`layanan/pelayanan?jenis_layanan_id=${pemeriksaanData?.pelayanan?.jenis_layanan_id}`),
  });

  const getFormId = formData?.data?.map((item, index) => {
    const data = item.form_id;
    return data;
  });

  const handleActiveIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleChangeScreen = (
    screen: string,
    pemeriksaanId?: number,
    pelayananPemeriksaanIdParams?: number,
    pemeriksaanData: PemeriksaanApiResponse,
  ) => {
    navigation.navigate(screen, {
      pemeriksaanId: pemeriksaanId,
      pemeriksaanData: pemeriksaanData,
      pelayananPemeriksaanId: pelayananPemeriksaanIdParams,
      PemeriksaanData: pemeriksaanData,
    });
  };

  const handleSetPendaftaranComplete = async () => {
    let data;
    if (
      pelayananPeriksaHamilId !== 0 &&
      periksaHamilRegex.test(pemeriksaanData?.pelayanan?.jenis_layanan?.nama)
    ) {
        data = {status: 'Selesai', pelayanan_id: pelayananPeriksaHamilId, pelayanan: pemeriksaanData?.pelayanan};
    } else {
        data = {status: 'Selesai', pelayanan: pemeriksaanData?.pelayanan, tanggal_lahir_bayi_pemeriksaan: pemeriksaanData?.pendaftaran?.bayi?.tanggal_lahir || null};
    }
    try {
      console.log('Data yang dikirim: ', data);
      const response = await axios.put(`pendaftaran/${pendaftaranId}`, data);
      const pemeriksaanResponse = await axios.put(`pemeriksaan/${pemeriksaanId}`, data);
      setSuccess(true);
      handleContentModal({
        setModal,
        setModalInfo,
        message:
          'Formulir berhasil disimpan, Terima kasih sudah mengisi data pemeriksaan',
        text: 'Tutup',
      });
    } catch (e) {
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
    if (isSuccess) {
      //navigation.navigate('ListJanji');
      navigation.pop(1);
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
      ],
    );
  };

  useEffect(() => {
    console.table(pelayananPeriksaHamilId);
  }, [pelayananPeriksaHamilId]);

  //tambahkan pengecekan jika pendaftaraData.pelayanan.harga = 0, maka pelayananPeriksaHamilId(0), jika harga != 0 maka set pelayananPeriksaHamilId dengan data yang sudah terupdate

  useEffect(() => {
    if (
      periksaHamilRegex.test(pemeriksaanData?.pelayanan?.jenis_layanan?.nama) &&
      pemeriksaanData?.pelayanan?.harga !== 0
    ) {
      setPelayananPeriksaHamilId(pemeriksaanData?.pelayanan?.id);
      return;
    }

    console.log(pemeriksaanData);
    setPelayananPeriksaHamilId(0);
  }, []);

  return (
    <SafeAreaView style={{}}>
      <View style={[style.mainContainer, {backgroundColor: '#f4f4f4'}]}>
        <View style={style.headerContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <Image
              source={require('../../assets/img/LogoBidanBunda.png')}
              style={{width: 70, height: 70, marginBottom: 8}}
              resizeMethod="resize"
              resizeMode="contain"
            />
            <Text style={{fontSize: 24, color: '#fff'}}>Pemeriksaan</Text>
          </View>
        </View>
        <View style={style.mainDropdownContainer}>
          {pelayananPeriksaHamilId === 0 && periksaHamilRegex.test(pemeriksaanData?.pelayanan?.jenis_layanan?.nama)
            && (
              <View style={style.titleItemContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  Periksa Hamil Nyaman
                </Text>
              </View>
            )}
            <ScrollView>
              { periksaHamilRegex.test(pemeriksaanData?.pelayanan?.jenis_layanan?.nama) && pelayananPeriksaHamilId === 0
                ? periksaHamilLayananData?.data.map(
                    (item, index) =>
                      item.harga !== 0 && (
                        <React.Fragment key={index}>
                          <ChildDropdownComponent
                            title={item.nama}
                            handlePress={() => setPelayananPeriksaHamilId(item.id)}
                            code={item.keterangan}
                            harga={item.harga}
                            key={index}
                          />
                        </React.Fragment>
                      ),
                  )
                : dropdownItem.map((item, index) =>
                    getFormId?.map(
                      (itemFormId: number) =>
                        item.formId === itemFormId && (
                          <React.Fragment key={index}>
                            <TouchableOpacity
                              style={style.mainDropdown}
                              key={index + item.id}
                              onPress={handleActiveIndex.bind(this, index)}>
                              <Text
                                style={{
                                  color: BUTTON_COLOR,
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                }}>
                                {item.title}
                              </Text>
                              {activeIndex === index ? (
                                <Icon
                                  name="angle-up"
                                  size={20}
                                  color={BUTTON_COLOR}
                                />
                              ) : (
                                <Icon
                                  name="angle-down"
                                  size={20}
                                  color={BUTTON_COLOR}
                                />
                              )}
                            </TouchableOpacity>
                            <View
                              style={[
                                style.childDropdown,
                                {
                                  display:
                                    activeIndex != index ? 'none' : 'contents',
                                },
                              ]}>
                              {activeIndex === index &&
                                Array.isArray(item?.child) &&
                                item?.child.map((child, indexChild) => (
                                  <TouchableOpacity
                                    key={indexChild}
                                    style={[
                                      style.childDropdown,
                                      {
                                        padding: 8,
                                        height: 48,
                                        justifyContent: 'center',
                                      },
                                    ]}
                                    onPress={() =>
                                      handleChangeScreen(
                                        child.screen,
                                        pemeriksaanId,
                                        pelayananPeriksaHamilId,
                                        pemeriksaanData
                                      )
                                    }>
                                    <Text style={{fontSize: 16}}>{child.name}</Text>
                                  </TouchableOpacity>
                                ))}
                            </View>
                          </React.Fragment>
                        ),
                    ),
                  )}
            </ScrollView>
        </View>
        <View style={style.buttonContainer}>
          <ButtonComponent
            title="Simpan"
            color={BUTTON_COLOR_3}
            disabled={pemeriksaanData?.pendaftaran.status === 'Selesai' ? true : false}
            onPress={() => handleSelesai()}
            //customstyle={{display: pelayananPeriksaHamilId === 0 ? 'none' : 'flex'}}
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
    shadowColor: '#101010',
    elevation: 2,
  },
  childDropdown: {
    width: '100%',
    height: '8%',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#101010',
    elevation: 2,
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
  },
  titleItemContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderColor: '#10101010',
    borderWidth: 1,
    shadowColor: '#101010',
    elevation: 3,
  },
});

export default PemeriksaanSection;
