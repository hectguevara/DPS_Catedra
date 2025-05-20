import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getHistory } from '../services/HistorialService';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>Fuente: {item.source}</Text>
      <Text style={styles.timestamp}>
        Fecha: {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Meditaciones</Text>
      {history.length === 0 ? (
        <Text>No hay contenido reproducido aún.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#e1f5fe',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  source: { fontSize: 14, color: '#555' },
  timestamp: { fontSize: 12, color: '#777', marginTop: 4 },
});