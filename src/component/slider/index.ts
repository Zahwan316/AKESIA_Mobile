import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';

const Slider = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];

  useEffect(() => {
    if (!scrollRef.current) return;
  
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      scrollRef.current.scrollTo({ x: screenWidth * nextIndex, animated: true });
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentIndex, scrollRef.current]);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
    />
      {slides.map((text, index) => (
        <View key={index} style={[styles.slide, { width: screenWidth }]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    height: 200,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Slider;
