import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, interpolate } from 'react-native-reanimated';

const InputField = ({label,mode,style}) => {
  const [text, setText] = useState('');
  const inputAnimation = useSharedValue(0);

 

  useEffect(() => {
    if (text === '') {
        inputAnimation.value = withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(0, { duration: 50 })
        );
      }
  },[text])

  const inputStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      inputAnimation.value,
      [-10, 0, 10],
      [-10, 0, 10]
    );
    return {
      transform: [{ translateX: translateX }]
    };
  });

  

  return (
    <View style={styles.container}>
      <Animated.View style={[inputStyle]}>
        <TextInput
          mode={mode}
          style={[styles.input,style]}
          label={label}
          onChangeText={text => setText(text)}
          value={text}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default InputField;
