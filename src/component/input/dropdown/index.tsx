import { JSX } from "react";
import { useForm } from "react-hook-form";
import { ColorValue, DimensionValue, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from 'react-native-vector-icons/FontAwesome';

type props = {
  data: any[],
  onSelect: () => void,
  backgroundColor: ColorValue,
  textColor: ColorValue,
  width: DimensionValue,
  height: DimensionValue,
  label: string
}

const DropdownInputComponent = (props: props): JSX.Element => {
  const {control, handleSubmit, formState: { errors }} = useForm();

  return (
    <View style={{width: props.width, height: props.height, marginBottom: 12}}>
      <Text style={[style.label, {color: props.textColor }]}>{props.label}</Text>
      <SelectDropdown
        data={props.data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={style.dropdownButtonStyle}>
              <Text style={style.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Silahkan Pilih'}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={style.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <TouchableOpacity style={{...style.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Text style={style.dropdownItemTxtStyle} key={index}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const style = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonTxtStyle: {

  },
  dropdownItemStyle: {
    width: '100%',
    height: 'auto',
  },
  dropdownItemTxtStyle: {
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdownButtonArrowStyle: {
    fontSize: 16,
  }
});

export default DropdownInputComponent;
