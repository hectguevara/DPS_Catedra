import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NewEntry from '../components/NewEntry';
import MoodHistory from '../components/MoodHistory';

export default function DiarioScreen() {
  const [refresh, setRefresh] = useState(0);
  const onSaved = () => setRefresh(prev => prev + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Diario Emocional</Text>
      <NewEntry onSaved={onSaved} />
      <MoodHistory refresh={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});