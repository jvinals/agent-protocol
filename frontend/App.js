import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import axios from 'axios';

export default function App() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    startListening();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0];
    setTranscript(text);
    axios.post('http://localhost:8000/chat', { text })
      .then(res => {
        const response = res.data.response;
        Speech.speak(response, { onDone: startListening });
      })
      .catch(err => console.error(err));
  };

  const startListening = () => {
    Voice.start('en-US');
  };

  return (
    <View style={styles.container}>
      <Text>{transcript}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
