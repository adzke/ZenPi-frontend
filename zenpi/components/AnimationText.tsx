import React, { useState } from 'react';
import { Animated, View, Button, StyleSheet, Text } from 'react-native';

export const AnimationTest = () => {
  const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.fadingContainer,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <Button title="Fade In" onPress={fadeIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,

    backgroundColor: 'pink'
  },
  fadingContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
