import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av';
import { Buffer } from 'buffer';
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
      .then(async res => {
        const response = res.data.response;
        await playResponse(response);
      })
      .catch(err => console.error(err));
  };

  const startListening = () => {
    Voice.start('en-US');
  };

  const playResponse = async (text) => {
    try {
      const res = await axios.post('http://localhost:8000/tts', { text }, { responseType: 'arraybuffer' });
      const base64 = Buffer.from(res.data, 'binary').toString('base64');
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: `data:audio/mpeg;base64,${base64}` });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          startListening();
        }
      });
    } catch (err) {
      console.error(err);
    }
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
