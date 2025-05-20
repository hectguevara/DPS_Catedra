import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import frases from '../data/frases.json';
import { saveFavoriteQuote } from '../utils/storage';

export default function QuoteScreen() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    setQuote(frases[randomIndex]);
  }, []);

  const guardar = async () => {
    if (!quote) return;
    await saveFavoriteQuote(quote);
    Alert.alert('Guardado en favoritos');
  };

  return (
    <ImageBackground
      source={require('../assets/fondo-quote.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {quote && (
          <View style={styles.card}>
            <Text style={styles.text}>"{quote.texto}"</Text>
            <Text style={styles.author}>– {quote.autor}</Text>
            <View style={styles.button}>
              <Button title="Guardar como favorito" onPress={guardar} color="#4CAF50" />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333'
  },
  author: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#666'
  },
  button: {
    marginTop: 10
  }
});
