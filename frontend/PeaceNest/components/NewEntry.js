import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import MoodSelector from './MoodSelector';
import { addMoodEntry } from '../data/moodData';

export default function NewEntry({ onSaved }) {
  const [emotion, setEmotion] = useState('');
  const [description, setDescription] = useState('');

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
    <View style={styles.container}>
      <Text style={styles.title}>¿Cómo te sientes hoy?</Text>
      <MoodSelector selected={emotion} onSelect={setEmotion} />
      <TextInput
        placeholder="Describe tu día (opcional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20,
  },
});