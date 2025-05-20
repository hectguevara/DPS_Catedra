import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import meditationList from '../data/ListaMeditacion';

export default function MeditacionScreen({ navigation }) {
  const renderItem = ({ item }) => {
    const handlePress = () => {
      switch (item.type) {
        case 'youtube':
          navigation.navigate('ReproductorYouTube', { video: item });
          break;
        case 'pixabay':
          navigation.navigate('ReproductorPixabay', { audio: item });
          break;
        case 'mindfulness':
          navigation.navigate('MindfulnessScreen', { session: item });
          break;
        default:
          console.warn('Tipo desconocido');
      }
    };

    return (
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.source}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meditaciones Guiadas</Text>
      <FlatList
        data={meditationList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#f3e5f5',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
});