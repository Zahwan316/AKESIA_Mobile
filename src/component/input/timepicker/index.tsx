import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formattedDateDataWithoutHour } from '../../../utils/date';
import { BORDER_COLOR } from '../../../constants/color';

type Props = {
  label: string;
  onChange: () => void;
  customStyle?: StyleSheet.NamedStyles<any>;
  labelColor?: string;
  control: any;
  name: string;
  message: string;
  errors?: any;
  initialValue?: string;
  disabled: boolean;
};

const InputTimePickerComponent = (props: Props): React.JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formatTime = (time: Date) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={[props.customStyle, { marginBottom: 12 }]}>
      <Text style={[style.label, { color: props.labelColor ?? "#fff" }]}>
        {props.label}
      </Text>

      <View style={[style.inputContainer, { opacity: props.disabled ? 0.5 : 1 }]}>
        <Controller
          name={props.name}
          rules={props.message ? { required: props.message } : {}}
          control={props.control}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={style.formInput}
                disabled={props.disabled}
              >
                <Text>
                  {value
                    ? value
                    : props.initialValue || 'Pilih Jam'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                open={!props.disabled && open}
                mode="time"
                is24hourSource="locale"
                date={
                  value && /^\d{2}:\d{2}$/.test(value) ?
                  new Date(`1970-01-01T${value}:00`)
                  :
                  new Date()
                }
                onConfirm={(selectedTime) => {
                  setOpen(false);
                  setDate(selectedTime);
                  const formatted = formatTime(selectedTime);
                  onChange(formatted);
                  props.onChange();
                }}
                onCancel={() => setOpen(false)}
              />
            </>
          )}
        />
        <Icon name="clock" size={20} style={style.calendarIcon} />
      </View>

      {props.errors?.[props.name]?.message && (
        <Text style={style.errorText}>
          {props.errors[props.name]?.message}
        </Text>
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
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: BORDER_COLOR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default InputTimePickerComponent;
