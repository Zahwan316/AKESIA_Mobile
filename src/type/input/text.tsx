import { ColorValue, DimensionValue, View } from 'react-native';

interface textInputProps  {
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  backgroundColor?: ColorValue,
  onChange: (name:string, value: any) => void,
  initialValue?: string,
  name: string,
  placeholder: string,
  message?: string,
  type: string,
  textColor?: ColorValue,
  labelColor?: ColorValue,
  border?: number,
  control: any,
  errors?: any,
  disabled?: boolean
}

export default textInputProps;
