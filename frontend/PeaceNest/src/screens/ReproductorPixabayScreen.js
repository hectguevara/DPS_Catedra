import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { saveToHistory } from "../services/HistorialService";

const tracks = [
  {
    id: "1",
    title: "Relaxing Meditation",
    file: require("../../assets/music/relaxing-meditation-231762.mp3"),
  },
  {
    id: "2",
    title: "Limitless Classical Piano",
    file: require("../../assets/music/limitless-classical-piano-342182.mp3"),
  },
  {
    id: "3",
    title: "Calm my mind",
    file: require("../../assets/music/please-calm-my-mind-125566.mp3"),
  },
  {
    id: "4",
    title: "Relaxing ambient music",
    file: require("../../assets/music/relaxing-ambient-music-342190.mp3"),
  },
  {
    id: "5",
    title: "Soft piano music",
    file: require("../../assets/music/soft-piano-music-312509.mp3"),
  },
];

export default function MusicScreen() {
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    saveToHistory({ ...Audio, type: "pixabay" });
  }, []);

  const playTrack = async (track) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(track.file);
    setSound(newSound);
    setCurrentTrack(track);
    await newSound.playAsync();
  };

  const pauseTrack = async () => {
    if (sound) await sound.pauseAsync();
  };

  const stopTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setCurrentTrack(null);
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
      <Text style={styles.title}>🎵 Música Relajante</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.track}
            onPress={() => playTrack(item)}
          >
            <Text style={styles.trackTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {currentTrack && (
        <View style={styles.controls}>
          <Text style={styles.nowPlaying}>
            Reproduciendo: {currentTrack.title}
          </Text>
          <Button title="⏸️ Pausar" onPress={pauseTrack} />
          <Button title="⏹️ Detener" onPress={stopTrack} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e0f7fa" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  track: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  trackTitle: { fontSize: 18 },
  controls: { marginTop: 20 },
  nowPlaying: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});
