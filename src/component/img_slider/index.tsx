import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import SliderItem from './slideritem';

type props = {
  images: [];
}

const ImageSlider = (props: props) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if(props.images){
        index = (index + 1) % props.images?.length;
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={props.images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <SliderItem
            item={item}
          />
        )}
      />
    </>
  );
};

export default ImageSlider;
