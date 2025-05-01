import { ScrollView, View } from 'react-native';
import JanjiKitaScreen from '../../../../screen/JanjiKita';
import JanjiScreenLayout from '../layout';
import ImageCardItemComponent from '../component/card-img-item';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

type dataItem = {
  title: string,
  img: ImageSourcePropType,
  handlePress?: () => void,
}

const dataItem: dataItem[] = [
  {
    title: 'Baby Spa dan Message',
    img: require('../../../../assets/img/testimg.jpg'),
  },
  {
    title: 'Bidan Bunda',
    img: require('../../../../assets/img/testimg.jpg'),
  },
  {
    title: 'Periksa Hamil Nyaman',
    img: require('../../../../assets/img/testimg.jpg'),
  },
];

const BuatJanjiSection = () => {
  const navigation = useNavigation();

  const handleScreen = (screen: string, subItem: string) => {
    navigation.navigate(screen, {subItem: subItem});
  };

  return(
    <JanjiScreenLayout
      title="Buat Janji"
    >
      <ScrollView>
        {
          dataItem.map((item, index) => (
            <ImageCardItemComponent
              title={item.title}
              img={item.img}
              key={index}
              handlePress={() => handleScreen('BuatJanjiDetail', item.title)}
            />
          ))
        }
      </ScrollView>
    </JanjiScreenLayout>
  );
};

export default BuatJanjiSection;
