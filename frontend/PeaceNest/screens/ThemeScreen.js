import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const temasDisponibles = [
  'Cyberpunk2077', 'SadBlue', 'Hope', 'Dark',
  'Forest', 'MidnightBlue', 'Sandstone', 'SoftViolet'
];


const ThemeScreen = () => {
  const { theme, themeName, updateTheme } = useContext(ThemeContext);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>Seleccionar Tema</Text>

      {temasDisponibles.map((tema, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.boton,
            {
              backgroundColor: themeName === tema ? theme.accentColor : '#ccc'
            }
          ]}
          onPress={() => updateTheme(tema)}
        >
          <Text style={{
            color: themeName === tema ? '#000' : '#333',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {tema}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  boton: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8
  }
});

export default ThemeScreen;
