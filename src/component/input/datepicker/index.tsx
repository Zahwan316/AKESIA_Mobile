import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { Button, StyleSheet, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import { formattedDateData } from "../../../utils/date";

type props = {
  label: string,
  onChange: () => void,
  customStyle?: StyleSheet.NamedStyles<any>,
  labelColor?: string,
  control: any,
  name: string,
  message: string,
}

const InputDatePickerComponent = (props: props): React.JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return(
    <View style={props.customStyle}>
      <Text style={[style.label, {color: props.labelColor != null ? props.labelColor : '#fff'}]}>{props.label}</Text>
      <View style={style.inputContainer}>
        <Controller
          name={props.name}
          rules={{required: props.message}}
          control={props.control}
          render={({field: {onChange, value}}) => (
            <>
              <TouchableOpacity onPress={() => setOpen(true)} style={style.formInput}>
                <Text>{value ? new Date(value).toLocaleDateString('id-ID') : 'Pilih tanggal'}</Text>
              </TouchableOpacity>
              {/* <TextInput
                onPress={() => setOpen(true)}
                value={date.toLocaleDateString('id-ID')}
                onChangeText={onChange}
                style={style.formInput}
                placeholder="Pilih tanggal"
              /> */}
              <DatePicker
                modal
                open={open}
                mode={'date'}
                date={value ? new Date(value) : new Date()}
                onConfirm={(dates) => {
                  setOpen(false);
                  setDate(dates);
                  const formattedDates = formattedDateData(dates);
                  onChange(formattedDates);
                  props.onChange();
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
        />
        <Icon name="calendar" size={20} style={{position: 'absolute', right: 12, top: 10}} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formInput: {
    width: '100%',
    height: 'auto',
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    display: 'flex',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
});

export default InputDatePickerComponent;