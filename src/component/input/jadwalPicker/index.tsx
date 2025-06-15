import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { BORDER_COLOR } from '../../../constants/color';

type JamPickerProps = {
  control: any;
  name: string;
  label: string;
  message?: string;
  errors?: any;
  jenisLayanan: string;
  initialValue?: string;
  disabled?: boolean;
  tanggal_pertemuan: Date;
};

const jadwalLayanan: Record<string, { days: number[]; jam: [string, string][] }> = {
  BabySpa: {
    days: [0, 1, 2, 3, 4, 5, 6],
    jam: [
      ['10:00', '11:30'],
      ['13:00', '15:00'],
    ],
  },
  BidanBunda: {
    days: [1, 2, 3, 4, 5],
    jam: [['13:00', '19:00']],
  },
  BidanBundaSabtu: {
    days: [6],
    jam: [['10:00', '19:00']],
  },
  PemeriksaanHamilNyaman: {
    days: [1, 2, 3, 4, 5],
    jam: [['13:00', '19:00']],
  },
  PemeriksaanHamilNyamanSabtu: {
    days: [6],
    jam: [['10:00', '19:00']],
  },
  Persalinan: {
    days: [1, 2, 3, 4, 5],
    jam: [['13:00', '19:00']],
  },
  PersalinanSabtu: {
    days: [6],
    jam: [['10:00', '19:00']],
  },
};

const generateJamList = (jamRange: [string, string][]): string[] => {
  const list: string[] = [];

  for (const [start, end] of jamRange) {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    let current = new Date();
    current.setHours(startHour, startMin, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMin, 0, 0);

    while (current <= endTime) {
      list.push(
        `${current.getHours().toString().padStart(2, '0')}:${current
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
      current.setMinutes(current.getMinutes() + 30); // interval 30 menit
    }
  }

  return list;
};

const babySpaRegex = /Baby Spa dan Massage/i;
const BidanBundaRegex = /Bidan Bunda/i;
const PeriksaHamilNyamanRegex = /Periksa Hamil Nyaman/i;
const PersalinanRegex = /Persalinan/i;

const JamPicker = ({ control, name, label, message, errors, jenisLayanan, initialValue, disabled, tanggal_pertemuan }: JamPickerProps) => {
  const [jamList, setJamList] = useState<string[]>([]);
  const [changedJenisLayanan, setChangedJenisLayanan] = useState<string>('');


  useEffect(() => {
    const dayFromDate = tanggal_pertemuan?.getDay();

    let layananKey = '';
    if(babySpaRegex.test(jenisLayanan)){
      layananKey = 'BabySpa';
    }
    else if (BidanBundaRegex.test(jenisLayanan) && dayFromDate === 6) {
      layananKey = 'BidanBundaSabtu';
    }
    else if (BidanBundaRegex.test(jenisLayanan)) {
      layananKey = 'BidanBunda';
    }
    else if (PeriksaHamilNyamanRegex.test(jenisLayanan) && dayFromDate === 6) {
      layananKey = 'PemeriksaanHamilNyamanSabtu';
    }
    else if (PeriksaHamilNyamanRegex.test(jenisLayanan)) {
      layananKey = 'PemeriksaanHamilNyaman';
    }
    else if (PersalinanRegex.test(jenisLayanan) && dayFromDate === 6) {
      layananKey = 'PersalinanSabtu';
    }
    else if (PersalinanRegex.test(jenisLayanan)) {
      layananKey = 'Persalinan';
    }


    const jadwal = jadwalLayanan[layananKey];
    if (jadwal && jadwal.days.includes(dayFromDate)) {
      const list = generateJamList(jadwal.jam);
      setJamList(list);
    } else {
      setJamList([]);
    }
  }, [jenisLayanan, tanggal_pertemuan]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={message ? { required: message } : {}}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={value || initialValue}
              onValueChange={onChange}
              style={Platform.select({
                android: { color: '#000' },
                ios: {},
              })}
              enabled={!disabled && jamList.length > 0}>
              <Picker.Item label="Pilih jam" value="" />
              {jamList.map((jam) => (
                <Picker.Item key={jam} label={jam} value={jam} />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors?.[name] && <Text style={styles.error}>{errors[name]?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
    height: 'auto',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export default JamPicker;
