import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const sessions = [
  {
    id: '1',
    title: 'Meditación Profunda',
    url: 'https://mixkit.co/free-stock-video/happy-young-woman-in-the-nature-46692/',
  },
  {
    id: '2',
    title: 'Relajación Guiada',
    url: 'https://mixkit.co/free-stock-video/woman-out-in-nature-practicing-mindfulness-45852/',
  },
  {
    id: '3',
    title: 'Respiración Consciente',
    url: 'https://mixkit.co/free-stock-video/woman-meditating-at-the-beach-at-sunset-46620/',
  },
];

export default function MindfulnessScreen() {
  const [sound, setSound] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const playSession = async (session) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: session.url },
      { shouldPlay: true }
    );

    setSound(newSound);
    setCurrentSession(session);
  };

  const pauseSession = async () => {
    if (sound) await sound.pauseAsync();
  };

  const stopSession = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setCurrentSession(null);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧘‍♀️ Sesiones Guiadas de Mindfulness</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => playSession(item)}>
            <Text style={styles.sessionTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {currentSession && (
        <View style={styles.controls}>
          <Text style={styles.nowPlaying}>Reproduciendo: {currentSession.title}</Text>
          <Button title="⏸️ Pausar" onPress={pauseSession} />
          <Button title="⏹️ Detener" onPress={stopSession} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  sessionTitle: { fontSize: 18, fontWeight: '500' },
  controls: { marginTop: 20 },
  nowPlaying: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
});
