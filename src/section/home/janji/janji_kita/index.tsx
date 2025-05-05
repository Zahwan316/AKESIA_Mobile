import { JSX, useState } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import JanjiScreenLayout from "../layout";
import ButtonComponent from "../../../../component/button";
import QueueItemComponent from "../component/queue-item";
import { ScrollView } from "react-native";
import FloatingIcon from "../../../../component/floatingIcon";
import { useNavigation } from "@react-navigation/native";

type queueItem = {
  img: ImageSourcePropType,
  title: string,
  description: string,
  time: string,
  handleClick: () => void,
  handleDelete: () => void,
  status: 'Menunggu' | 'Selesai' | 'Dibatalkan'
};

const itemQueue: queueItem[] = [
  {
    description: 'Pijat Bayi untuk 1 jam',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Pijat Bayi Ceria',
    handleClick: () => {},
    handleDelete: () => {},
    time: '09.30 AM',
    status: 'Menunggu',
  },
  {
    description: 'Spa Bayi untuk 2 jam',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Spa Bayi Sehat',
    handleClick: () => {},
    handleDelete: () => {},
    time: '11.00 AM',
    status: 'Selesai',
  },
  {
    description: 'Konsultasi Dokter Anak',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Konsultasi Dokter Anak',
    handleClick: () => {},
    handleDelete: () => {},
    time: '12.00 PM',
    status: 'Menunggu',
  },
  {
    description: 'Pemeriksaan Kesehatan Bayi',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Pemeriksaan Kesehatan Bayi',
    handleClick: () => {},
    handleDelete: () => {},
    time: '02.00 PM',
    status: 'Dibatalkan',
  },
  {
    description: 'Pemeriksaan Kesehatan Bayi',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Pemeriksaan Kesehatan Bayi',
    handleClick: () => {},
    handleDelete: () => {},
    time: '02.00 PM',
    status: 'Dibatalkan',
  },
  {
    description: 'Terapi Okupasi untuk Bayi',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Terapi Okupasi untuk Bayi',
    handleClick: () => {},
    handleDelete: () => {},
    time: '03.30 PM',
    status: 'Menunggu',
  },
];

type button = {
  title: string,
  onPress: () => void,
  color: string
}

const ButtonMenu: button[] = [
  {
    title: 'Menunggu',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Selesai',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Dibatalkan',
    onPress: () => {},
    color: '#000',
  },
];

const JanjiKitaSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Menunggu');
  const navigation = useNavigation();

  const handleCurrMenu = (title: string) => {
    setCurrMenu(title);
  };

  const handleScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <JanjiScreenLayout
      title="Janji Kita"
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32}}>
        {
          ButtonMenu.map((item, index) => (
            <ButtonComponent
              title={item.title}
              onPress={() => handleCurrMenu(item.title)}
              color={currMenu === item.title ? '#000' : '#D9D9D9'}
              key={index}
            />
          ))
        }
      </View>
      <ScrollView style={{position: 'relative', height: '50%'}}>
        {
          itemQueue.map((item, index) => (
            currMenu === item.status &&
            <QueueItemComponent
              description={item.description}
              handleClick={() => handleScreen('PemesananJanji')}
              handleDelete={item.handleDelete}
              img={item.img}
              time={item.time}
              title={item.title}
              key={index}
              status={item.status}
            />

          ))
        }
      </ScrollView>
      <FloatingIcon
        handlePress={() => handleScreen('BuatJanji')}
      />
    </JanjiScreenLayout>
  );
};



export default JanjiKitaSection;
