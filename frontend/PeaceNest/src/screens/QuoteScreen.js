
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { saveFavoriteQuote } from '../utils/storage';

export default function QuoteScreen() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://zenquotes.io/api/today')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote(data[0]);
        } else {
          setQuote({ q: "Sigue adelante, incluso cuando sea difícil.", a: "PeaceNest" });
        }
      })
      .catch(() => {
        setQuote({ q: "Cada día es una oportunidad para mejorar.", a: "PeaceNest" });
      })
      .finally(() => setLoading(false));
  }, []);

  const guardar = async () => {
    if (!quote) return;
    await saveFavoriteQuote(quote);
    Alert.alert('Guardado en favoritos');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Cargando consejo...</Text>
      ) : (
        <>
          <Text style={styles.text}>{quote.q}</Text>
          <Text style={styles.author}>– {quote.a}</Text>
          <Button title="Guardar como favorito" onPress={guardar} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  author: { fontStyle: 'italic', marginBottom: 15 }
});
