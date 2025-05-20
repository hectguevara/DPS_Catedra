import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { getFavorites } from '../utils/storage';
import { ThemeContext } from '../context/ThemeContext';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {favorites.map((item, index) => (
        <View
          key={index}
          style={[
            styles.card,
            // Puedes ajustar este color si deseas un fondo más claro u oscuro según el tema
            { backgroundColor: theme.primaryColor || '#444' }
          ]}
        >
          <Text style={[styles.text, { color: theme.textColor || '#fff' }]}>
            {item.q}
          </Text>
          <Text style={[styles.author, { color: theme.textColor || '#fff' }]}>
            – {item.a}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 16
  },
  author: {
    fontStyle: 'italic',
    marginTop: 4
  }
});
