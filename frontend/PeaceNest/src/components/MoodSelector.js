import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EMOTIONS = [
  { label: '😄', value: 'feliz' },
  { label: '😢', value: 'triste' },
  { label: '😠', value: 'enojado' },
  { label: '😌', value: 'relajado' },
  { label: '😐', value: 'neutral' },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {EMOTIONS.map(e => (
        <TouchableOpacity
          key={e.value}
          style={[styles.emoji, selected === e.value && styles.selected]}
          onPress={() => onSelect(e.value)}
        >
          <Text style={styles.text}>{e.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-around' },
  emoji: { padding: 10, borderWidth: 1, borderRadius: 10 },
  text: { fontSize: 28 },
  selected: { backgroundColor: '#cce5ff', borderColor: '#3399ff' },
});