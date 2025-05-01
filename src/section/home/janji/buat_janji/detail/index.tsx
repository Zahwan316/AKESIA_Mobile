import { JSX } from 'react';
import JanjiKitaScreen from '../../../../../screen/JanjiKita';
import JanjiScreenLayout from '../../layout';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MAIN_COLOR } from '../../../../../constants/color';
import HeaderDropdownComponent from './component/headerDropdown';
import ChildDropdownComponent from './component/childDropdown';
import useDimension from '../../../../../hooks/useDimensions';
import { useRoute } from '@react-navigation/native';
import { formattedDate } from '../../../../../utils/date';

const width = useDimension();

type dataChild = {
  id: number,
  title: string;
  code: string;
  harga: number | string;
  handlePress: () => void;
}

type dataMain = {
  id: number,
  header?: string,
  child: dataChild[]
}

const dataMain: dataMain[] = [
  {
    id: 1,
    header: 'Paket Baby Spa',
    child: [
      {
        id: 1,
        title: 'Ceria Babyspa',
        code: '123456',
        harga: 12000,
        handlePress: () => {},
      },
      {
        id: 2,
        title: 'Premium Babyspa',
        code: '123456',
        harga: 32000,
        handlePress: () => {},
      },
    ],
  },
  {
    id: 2,
    header: 'Paket Baby Message',
    child: [
      {
        id: 1,
        title: 'Healty Message',
        code: '123456',
        harga: 12000,
        handlePress: () => {},
      },
      {
        id: 2,
        title: 'Premium Message',
        code: '123456',
        harga: 32000,
        handlePress: () => {},
      },
    ],
  },
];

const pageBidanBunda: dataMain[] = [
  {
    id: 1,
    child: [
      {
        id: 1,
        title: 'Ceria Babyspa',
        code: '123456',
        harga: 12000,
        handlePress: () => {},
      },
      {
        id: 2,
        title: 'Premium Babyspa',
        code: '123456',
        harga: 32000,
        handlePress: () => {},
      },
    ],
  },
];

const BuatJanjiDetailSection = (): JSX.Element => {
  const route = useRoute();
  const {subItem} = route.params as {subItem: string};

  return(
    <JanjiScreenLayout
      title="Buat Janji"
    >
      <ScrollView>
        <View style={style.mainHeaderContainer}>
          <View style={style.imgContainer}>
            <Image
              source={require('../../../../../assets/icon/bell-gray.png')}
              style={{width: '80%', height: '80%', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
              resizeMode="contain"
            />
          </View>
          <View style={style.textContainer}>
            <Text style={{fontSize: 14}}>{formattedDate}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{subItem}</Text>
          </View>
        </View>
        <View>
          {
            dataMain.map((item, index) => (
              <>
              {
                item.header != null ?
                <HeaderDropdownComponent
                  key={item.id + index}
                  title={item.header}
                />
                :
                null
              }
                {
                  item?.child.map((items, indexs) => (
                    <View style={{marginLeft: item.header != null ? 16 : 0}}>
                      <ChildDropdownComponent
                        key={items.id + indexs}
                        title={items.title}
                        code={items.code}
                        harga={items.harga}
                        handlePress={items.handlePress}
                      />
                    </View>
                  ))
                }
              </>
            ))
          }
        </View>
      </ScrollView>
    </JanjiScreenLayout>
  );
};

const style = StyleSheet.create({
  mainHeaderContainer: {
    width: '100%',
    minHeight: 72,
    borderWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 16,
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    flex: 1,
  },
  imgContainer: {
    width: '15%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    height: '100%',
    borderWidth: 0,
    flex: 1,
  },
});

export default BuatJanjiDetailSection;
