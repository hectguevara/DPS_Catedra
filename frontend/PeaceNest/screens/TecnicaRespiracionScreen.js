import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TecnicasRespiratorias from '../data/TecnicasRespiratorias';

export default function TecnicasRespiratoriasScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalle Técnica', { technique: item })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.shortDescription}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={TecnicasRespiratorias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#e0f7fa',
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { marginTop: 4, fontSize: 14, color: '#555' },
});