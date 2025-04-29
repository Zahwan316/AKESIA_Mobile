import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import dropdownItem from '../../data/pemeriksaan';
import { BUTTON_COLOR, BUTTON_COLOR_2 } from '../../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { act, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PemeriksaanSection = (): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigation = useNavigation();

  const handleActiveIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleChangeScreen = (screen: string) => {
    navigation.navigate(screen);
  }

  return(
    <SafeAreaView style={{}}>
      <View style={[style.mainContainer, {backgroundColor: '#D9D9D9'}]}>
        <View style={style.headerContainer}>
          <View>
            <Image
              source={require('../../assets/img/LogoBidanBunda.png')}
              style={{width: 70, height: 70, marginRight: 12}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <Text style={{fontSize: 20}}>Pemeriksaan</Text>
        </View>
        <View style={style.mainDropdownContainer}>
          {
            dropdownItem.map((item, index) => (
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
                      <TouchableOpacity key={indexChild} style={{padding: 8, height: 48, justifyContent: 'center'}} onPress={() => handleChangeScreen(child.screen)}>
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
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    padding: 12,
  },
  headerContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 18
  },
  mainDropdownContainer: {
    width: '100%',
    height: '90%',
  },
  mainDropdown: {
    width: '60%',
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
    width: '60%',
    height: 'auto',
    backgroundColor: '#fff',
    marginBottom: 18,
    padding: 12,
    borderRadius: 12,
  },
});

export default PemeriksaanSection;
