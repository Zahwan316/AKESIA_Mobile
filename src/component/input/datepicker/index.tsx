import { useState } from "react";
import { Text } from "react-native";
import { Button, StyleSheet, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

type props = {
  label: string,
  onChange: () => void,
}

const InputDatePickerComponent = (props: props): React.JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return(
    <View>
      <Text style={[style.label, {color: '#fff'}]}>{props.label}</Text>
      <View style={style.inputContainer}>
        <TextInput
          onPress={() => setOpen(true)}
          value={date.toLocaleDateString('id-ID')}
          style={style.formInput}
          placeholder="Pilih tanggal"
        />
        <Icon name="calendar" size={20} style={{position: 'absolute', right: 12, top: 8}} />
      </View>
      <DatePicker
        modal
        open={open}
        mode={'date'}
        date={date}
        onConfirm={(dates) => {
          setOpen(false);
          setDate(dates);
          props.onChange();
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
});

export default InputDatePickerComponent;