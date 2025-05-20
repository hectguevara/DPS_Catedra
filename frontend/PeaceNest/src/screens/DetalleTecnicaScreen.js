import react from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DetalleTecnicaScreen({ route }) {
  const { technique } = route.params;
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!running && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{technique.name}</Text>
      <Text style={styles.position}>📍 Posición: {technique.position}</Text>

      <Text style={styles.section}>🧾 Pasos:</Text>
      <FlatList
        data={technique.steps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.step}>{index + 1}. {item}</Text>
        )}
      />
      {technique.url && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: technique.url }}
            style={styles.video}
          />
        </View>
      )}

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <View style={styles.buttons}>
          <Button title="Iniciar" onPress={() => setRunning(true)} />
          <Button title="Detener" onPress={() => setRunning(false)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  position: { fontSize: 16, marginBottom: 12 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  videoContainer: { height: 300, marginBottom: 5 },
  video: { flex: 1 },
  step: { fontSize: 16, marginVertical: 2 },
  timerContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: { fontSize: 48, fontWeight: 'bold', marginVertical: 10 },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

