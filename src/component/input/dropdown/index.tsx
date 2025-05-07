import { JSX } from 'react';
import { Controller } from 'react-hook-form';
import { ColorValue, DimensionValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

type props = {
  data: any[],
  onSelect: (name: string, value: any) => void,
  backgroundColor?: ColorValue,
  textColor?: ColorValue,
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  control: any,
  placeholder: string,
  name: string,
  message: string,
  isSearchable?: boolean,
  errors: any,
  getValue?: 'id' | 'name' | string,
  disabled: boolean
}

const DropdownInputComponent = (props: props): JSX.Element => {
  return (
    <View style={{width: props.width, height: props.height, marginBottom: 12, opacity: props.disabled ? 0.5 : 1}}>
      <Text style={[style.label, {color: props.textColor }]}>{props.label}</Text>
      <Controller
        control={props.control}
        render={({field : {onChange, value}}) => (
          <SelectDropdown
            data={props.data}
            onSelect={(selectedItem) => {
              onChange(props.getValue ? selectedItem[props.getValue] : selectedItem.id);
              props.onSelect(selectedItem.id); // atau selectedItem.value, tergantung datanya
             // props.onSelect(props.name, selectedItem); // jika diperlukan
            }}
            defaultValueByIndex={value}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={style.dropdownButtonStyle}>
                  <Text style={style.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || 'Silahkan Pilih'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={style.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <TouchableOpacity style={{...style.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={style.dropdownItemTxtStyle} key={index}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            searchPlaceHolder={'Cari disini'}
            showsVerticalScrollIndicator={true}
            search={props.isSearchable}
            disabled={props.disabled}
          />
            )}
        name={props.name}
        rules={props.message ? { required: props.message } : {}}
      />
      {props.errors && props.errors[props.name] && (
        <Text style={{ color: 'red' }}>{props.errors[props.name]?.message}</Text>
      )}
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
    padding: 14,
    borderWidth: 0,
    marginBottom: 8,
    borderRadius: 8
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
