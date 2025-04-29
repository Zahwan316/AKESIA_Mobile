import { ColorValue, DimensionValue } from "react-native";

type textInputProps = {
  width: DimensionValue,
  height: DimensionValue,
  label: string,
  backgroundColor?: ColorValue,
  onChange: () => void,
  value?: string,
  name: string,
  placeholder: string,
  message: string,
  type: string,
  textColor?: ColorValue,
  labelColor?: ColorValue,
  border?: number
}

export default textInputProps;
