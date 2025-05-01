import { Dimensions } from 'react-native';

const useDimension = () => {
  const { width } = Dimensions.get('window');

  return width;
};

export default useDimension;
