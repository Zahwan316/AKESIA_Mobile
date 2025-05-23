import React, {useState} from 'react';
import {Button, Image, View, Text, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import { MAIN_COLOR } from '../../../constants/color';

type Props = {
  control: any;
  name: string;
  label?: string;
  message?: string;
  errors?: any;
};

const UploadSelfie = ({control, name, label, message, errors}: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={message ? { required: message } : {}}
        render={({field: {onChange, value}}) => {
          const handlePick = () => {
            launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
              if (response.didCancel) return;
              if (response.errorCode) {
                console.error('ImagePicker Error:', response.errorMessage);
                return;
              }
              const asset = response.assets?.[0];
              if (asset) {
                onChange(asset); // Set ke react-hook-form
              }
            });
          };

          return (
            <>
              <Button title="Pilih Foto" onPress={handlePick} color={MAIN_COLOR} />
              {value?.uri && (
                <Image source={{uri: value.uri}} style={styles.image} />
              )}
              {errors && errors[name] && (
                <Text style={{ color: 'red' }}>{errors[name]?.message}</Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: 'center',
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    //borderRadius: 100,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default UploadSelfie;
