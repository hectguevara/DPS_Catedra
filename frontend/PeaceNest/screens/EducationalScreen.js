import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, Button, Linking, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import articles from '../data/articles.json';

const images = {
  imagen1: require('../assets/imagen1.jpg'),
  imagen2: require('../assets/imagen2.png'),
  imagen3: require('../assets/imagen3.png'),
  imagen4: require('../assets/imagen4.png'),
};

export default function EducationalScreen() {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {articles.map((item) => (
        <View key={item.id} style={[styles.card, { backgroundColor: theme.primaryColor }]}>
          <Image source={images[item.image]} style={styles.image} />
          <Text style={[styles.title, { color: theme.textColor }]}>{item.title}</Text>
          <Text style={[styles.intro, { color: theme.textColor }]}>{item.intro}</Text>
          <View style={{ marginTop: 10 }}>
            <Button
              title="LEER MÁS"
              color={theme.buttonColor}
              onPress={() => Linking.openURL(item.articleUrl)}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },
  intro: {
    fontSize: 14,
    marginBottom: 10
  }
});
