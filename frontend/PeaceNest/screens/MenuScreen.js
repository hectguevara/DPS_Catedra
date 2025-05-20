/*import React from 'react';
import { View, Text } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>📋 Menú Principal</Text>
    </View>
  );
} */

  import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a PeaceNest 🕊️</Text>
      <Text style={styles.subtitle}>Tu espacio para combatir la ansiedad</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Tecnicas de Respiracion')}
      >
        <Image
          //source={require('../../assets/icons/breathing-icon.png')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Ejercicios de Respiración</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Meditaciones')}
      >
        <Image
          //source={require('../../assets/icons/meditation-icon.png')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Meditaciones Guiadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Historial')}
      >
        <Image
          //source={require('../../assets/icons/history-icon.png')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Historial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, paddingTop: 60 },
  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 24, color: '#555' },
  card: {
    backgroundColor: '#e0f2f1',
    padding: 16,
    marginTop: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  image: { width: 40, height: 40, marginRight: 16 },
  cardText: { fontSize: 18, fontWeight: '600' },
});