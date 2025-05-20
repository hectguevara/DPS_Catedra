import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import MoodSelector from './MoodSelector';
import { addMoodEntry } from '../data/moodData';
import { ThemeContext } from '../context/ThemeContext';

export default function NewEntry({ onSaved }) {
  const [emotion, setEmotion] = useState('');
  const [description, setDescription] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSave = () => {
    if (!emotion) return alert("Selecciona una emoción");

    const entry = {
      emotion,
      description,
      date: new Date().toISOString(),
    };

    addMoodEntry(entry);
    setEmotion('');
    setDescription('');
    onSaved && onSaved();
    alert('¡Emoción guardada!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>¿Cómo te sientes hoy?</Text>

      <MoodSelector selected={emotion} onSelect={setEmotion} />

      <TextInput
        placeholder="Describe tu día (opcional)"
        placeholderTextColor={theme.textColor}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: theme.textColor, borderColor: theme.accentColor }]}
      />

      <Button title="Guardar" onPress={handleSave} color={theme.buttonColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
