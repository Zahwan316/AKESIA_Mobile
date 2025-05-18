import { JSX, useEffect, useState } from 'react';
import JanjiScreenLayout from '../layout';
import { ScrollView, Text, View } from 'react-native';
import ButtonComponent from '../../../../component/button';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPendaftaranUser } from '../../../../api/data/pendaftaran';
import QueueItemComponent from '../component/queue-item';
import statusPendaftaran from '../../../../type/statusPendaftaran';
import { apiResponse } from '../../../../type/pendaftaran/pendaftaran';
import InputDatePickerComponent from '../../../../component/input/datepicker';
import { useForm } from 'react-hook-form';
import { formattedDateData, formattedDateDataWithoutHour } from '../../../../utils/date';
import { MAIN_COLOR } from '../../../../constants/color';
import { checkIsDataFormNull } from '../../../../utils/checkDataIsNull';

type button = {
  title: string,
  onPress: () => void,
  color: string
}

const ButtonMenu: button[] = [
  {
    title: 'Menunggu Konfirmasi',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Disetujui',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Selesai',
    onPress: () => {},
    color: '#000',
  },
  {
    title: 'Dibatalkan',
    onPress: () => {},
    color: '#000',
  },
];
const ListJanjiSection = (): JSX.Element => {
  const [currMenu, setCurrMenu] = useState<string>('Menunggu Konfirmasi');
  const navigation = useNavigation<any>();
  const [tanggalFilter, setTanggalFilter] = useState<string | null>(null);
  const { data: pendaftaranData, refetch} = useQuery({
    queryKey: ['pendaftaran', tanggalFilter],
    queryFn: () => getPendaftaranUser(tanggalFilter ? `pendaftaran?tanggal=${tanggalFilter}` : `pendaftaran?tanggal=${formattedDateDataWithoutHour(Date.now())}`),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleScreen = (screen: string, formId?: string | number, pendaftaranId?: string | number, pendaftaranData?: apiResponse) => {
    navigation.navigate(screen, {formId: formId, pendaftaranId: pendaftaranId, pendaftaranData: pendaftaranData});
  };

  const handleSearchPendaftaranByDate = async(data: any) => {
    try{
      //const formattedDate = formattedDateData(data.tanggal);
      console.log('Tanggal = ', data);
      setTanggalFilter(data.tanggal);
      refetch();
    }
    catch(e){
      console.log(e.response);
    }
  };

  useEffect(() => {
    console.log(pendaftaranData);
    if(pendaftaranData?.data || pendaftaranData?.data.length === 0){
      console.log('belum ada data pemeriksaan hari ini');
    }
  }, [pendaftaranData]);

  return(
    <JanjiScreenLayout
      title="List Pemeriksaan"
    >
      <View>
        <View style={{flexDirection: 'column', marginBottom: 32}}>
          <View >
            <InputDatePickerComponent 
              control={control}
              errors={errors}
              name='tanggal'
              label="Tanggal Pemeriksaan"
              labelColor="#000"
              initialValue={formattedDateDataWithoutHour(Date.now())}
              onChange={() => {}}
              //customStyle={{width: '100%'}}
            />
            <ButtonComponent
              color={MAIN_COLOR}
              title="Cari"
              onPress={() => handleSubmit(handleSearchPendaftaranByDate)()}
            />
          </View>
        </View>
        <ScrollView style={{position: 'relative', height: '80%'}}>
        {
          !pendaftaranData?.data || pendaftaranData.data.length === 0 ? (
            <View>
              <Text style={{fontSize: 18, textAlign: 'center'}}>Belum ada data pemeriksaan hari ini</Text>
            </View>
          )
          :
          pendaftaranData?.data.map((item: apiResponse, index: number) => (
            item.status !== statusPendaftaran.NOT_CONFIRM && item.isVerif !== 0 ?
            <QueueItemComponent
              description={item.pelayanan?.nama}
              handleClick={() => handleScreen('PemesananJanji', item.pelayanan_id, item.id)}
              handleDelete={() => {}}
              img={require('../../../../assets/icon/baby.png')}
              time={item.jam_ditentukan === null ? 'Segera Diinformasikan' : item.jam_ditentukan}
              title={item.ibu?.user?.nama_lengkap}
              key={index}
              status={item.status}
              role="bidan"
              handlePeriksa={() => handleScreen('Pemeriksaan', item.pelayanan.form_id, item.id, item)}
            />
            :
            null

          ))
        }
      </ScrollView>
      </View>
    </JanjiScreenLayout>
  );
};

export default ListJanjiSection;
