import { JSX, useState } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import JanjiScreenLayout from "../layout";
import ButtonComponent from "../../../../component/button";
import QueueItemComponent from "../component/queue-item";
import { ScrollView } from "react-native";
import FloatingIcon from "../../../../component/floatingIcon";

type queueItem = {
  img: ImageSourcePropType,
  title: string,
  description: string,
  time: string,
  handleClick: () => void,
  handleDelete: () => void,
};

const itemQueue: queueItem[] = [
  {
    description: 'Baby spa for 2 hours',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Baby Spa',
    handleClick: () => {},
    handleDelete: () => {},
    time: '10.00 AM',
  },
  {
    description: 'Baby spa for 2 hours',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Baby Spa',
    handleClick: () => {},
    handleDelete: () => {},
    time: '10.00 AM',
  },
  {
    description: 'Baby spa for 2 hours',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Baby Spa',
    handleClick: () => {},
    handleDelete: () => {},
    time: '10.00 AM',
  },
  {
    description: 'Baby spa for 2 hours',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Baby Spa',
    handleClick: () => {},
    handleDelete: () => {},
    time: '10.00 AM',
  },
  {
    description: 'Baby spa for 2 hours',
    img: require('../../../../assets/icon/baby.png'),
    title: 'Baby Spa',
    handleClick: () => {},
    handleDelete: () => {},
    time: '10.00 AM',
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

  const handleCurrMenu = (title: string) => {
    setCurrMenu(title);
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
            <QueueItemComponent
              description={item.description}
              handleClick={item.handleClick}
              handleDelete={item.handleDelete}
              img={item.img}
              time={item.time}
              title={item.title}
              key={index}
            />

          ))
        }
      </ScrollView>
      <FloatingIcon />
    </JanjiScreenLayout>
  );
};



export default JanjiKitaSection;