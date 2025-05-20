import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NewEntry from '../components/NewEntry';
import MoodHistory from '../components/MoodHistory';
import { ThemeContext } from '../context/ThemeContext';

export default function DiarioScreen() {
  const [refresh, setRefresh] = useState(0);
  const onSaved = () => setRefresh(prev => prev + 1);

  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>📘 Diario Emocional</Text>
      <NewEntry onSaved={onSaved} />
      <MoodHistory refresh={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
});
