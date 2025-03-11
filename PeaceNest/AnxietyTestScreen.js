// Usamos la dependencia npx expo install
//  @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler 
// Para navegacion dentro PeaceNest
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnxietyTestScreen = ({ navigation }) => {
  const handleResponse = (response) => {
    switch (response) {
      case 'ansioso':
        alert('Gracias por tu respuesta. Recuerda que estamos aquí para ayudarte.');
        break;
      case 'poco_ansioso':
        alert('Entendemos cómo te sientes. Prueba algunas técnicas de relajación.');
        break;
      case 'tranquilo':
        alert('¡Genial! Sigue así.');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test de Ansiedad</Text>
      <Text style={styles.question}>¿Cómo te sientes hoy?</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleResponse('ansioso')}
      >
        <Text style={styles.optionText}>Ansioso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleResponse('poco_ansioso')}
      >
        <Text style={styles.optionText}>Un poco ansioso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleResponse('tranquilo')}
      >
        <Text style={styles.optionText}>Tranquilo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5', // Fondo claro para mejor contraste
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333', // Texto oscuro
  },
  question: {
    fontSize: 18,
    marginBottom: 32,
    color: '#555555', // Texto gris
  },
  optionButton: {
    backgroundColor: '#4CAF50', // Verde calmante
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
    width: '80%', // Ancho del 80% de la pantalla
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF', // Texto blanco
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E0E0E0', // Fondo gris claro
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 24,
    width: '80%', // Ancho del 80% de la pantalla
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#333333', // Texto oscuro
    fontWeight: 'bold',
  },
});

export default AnxietyTestScreen;