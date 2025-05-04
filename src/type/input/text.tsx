import { ColorValue, DimensionValue, View } from 'react-native';

type textInputProps = {
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  backgroundColor?: ColorValue,
  onChange: (name:string, value: any) => void,
  value?: string,
  name: string,
  placeholder: string,
  message?: string,
  type: string,
  textColor?: ColorValue,
  labelColor?: ColorValue,
  border?: number,
  control: any,
  errors?: any,
}

export default textInputProps;
