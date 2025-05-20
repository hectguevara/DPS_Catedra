import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const EMOTIONS = [
  { label: '😄', value: 'feliz' },
  { label: '😢', value: 'triste' },
  { label: '😠', value: 'enojado' },
  { label: '😌', value: 'relajado' },
  { label: '😐', value: 'neutral' },
];

export default function MoodSelector({ selected, onSelect }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {EMOTIONS.map(e => (
        <TouchableOpacity
          key={e.value}
          style={[
            styles.emoji,
            { borderColor: theme.accentColor },
            selected === e.value && { backgroundColor: theme.accentColor }
          ]}
          onPress={() => onSelect(e.value)}
        >
          <Text style={[styles.text, { color: theme.textColor }]}>{e.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  emoji: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    fontSize: 28
  }
});
