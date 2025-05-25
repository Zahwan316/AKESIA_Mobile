import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { Button, StyleSheet, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import { formattedDateData, formattedDateDataWithoutHour } from "../../../utils/date";
import { BORDER_COLOR } from "../../../constants/color";

type props = {
  label: string,
  onChange: (value: any) => void,
  customStyle?: StyleSheet.NamedStyles<any>,
  labelColor?: string,
  control: any,
  name: string,
  message: string,
  errors?: any,
  initialValue?: string,
  disabled: boolean,
  maximum?: boolean,
  minimum?: number,
}

const InputDatePickerComponent = (props: props): React.JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - (props.minimum * 7));


  return(
    <View style={[props.customStyle, { marginBottom: 12, }]}>
      <Text style={[style.label, {color: props.labelColor != null ? props.labelColor : '#fff'}]}>{props.label}</Text>
      <View style={style.inputContainer, {opacity: props.disabled ? 0.5 : 1}}>
        <Controller
          name={props.name}
          rules={props.message ? { required: props.message } : {}}
          control={props.control}
          render={({field: {onChange, value}}) => (
            <>
              <TouchableOpacity onPress={() => setOpen(true)} style={style.formInput}>
                <Text>
                  {
                    value ?
                    formattedDateDataWithoutHour(value)
                      :
                    props.initialValue || 'Pilih tanggal'
                  }
                </Text>
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
                open={!props.disabled && open}
                mode={'date'}
                date={value ? new Date(value) : new Date()}
                minimumDate={props.minimum ? minDate : undefined}
                maximumDate={props.maximum ? new Date() : undefined}
                onConfirm={(dates) => {
                  setOpen(false);
                  setDate(dates);
                  const formattedDates = formattedDateDataWithoutHour(dates);
                  onChange(formattedDates);
                  props.onChange(formattedDates);
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
      {props.errors && props.errors[props.name] && (
        <Text style={{ color: 'red' }}>{props.errors[props.name]?.message}</Text>
      )}
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
    //marginBottom: 12,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    borderColor: BORDER_COLOR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
});

export default InputDatePickerComponent;
