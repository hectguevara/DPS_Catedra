
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { getFavorites } from '../utils/storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      {favorites.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>{item.q}</Text>
          <Text style={styles.author}>– {item.a}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 15, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 10 },
  text: { fontSize: 16 },
  author: { fontStyle: 'italic' }
});
