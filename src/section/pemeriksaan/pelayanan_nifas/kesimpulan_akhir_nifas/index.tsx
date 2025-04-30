import { JSX } from 'react';
import FormScreenLayout from '../../screen_layout';
import { View } from 'react-native';
import DropdownInputComponent from '../../../../component/input/dropdown';

const KesimpulanAkhirNifasSection = (): JSX.Element => {
  return(
    <FormScreenLayout>
      <View>
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Keadaan Ibu'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Komplikasi Nifas'}
        />
        <DropdownInputComponent
          width={'100%'}
          backgroundColor={''}
          data={[]}
          height={'auto'}
          textColor={'#fff'}
          onSelect={() => {}}
          label={'Keadaan Bayi'}
        />
      </View>
    </FormScreenLayout>
  );
};

export default KesimpulanAkhirNifasSection;
