import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../context/ThemeContext';

const emocionesDisponibles = [
  'Feliz 😄',
  'Triste 😢',
  'Enojado 😠',
  'Relajado 😌',
  'Ansioso 😰',
  'Motivado 💪'
];

const temasDisponibles = ['Cyberpunk2077', 'SadBlue', 'Hope', 'Dark'];

const PerfilScreen = () => {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [emocionFavorita, setEmocionFavorita] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const { theme, themeName, updateTheme } = useContext(ThemeContext);

  useEffect(() => {
    const cargarDatos = async () => {
      const nombreGuardado = await AsyncStorage.getItem('perfil_nombre');
      const descGuardada = await AsyncStorage.getItem('perfil_descripcion');
      const emocionGuardada = await AsyncStorage.getItem('perfil_emocion');
      const favsGuardados = await AsyncStorage.getItem('perfil_favoritos');
      const fotoGuardada = await AsyncStorage.getItem('perfil_foto');

      setNombre(nombreGuardado || '');
      setDescripcion(descGuardada || '');
      setEmocionFavorita(emocionGuardada || 'Feliz 😄');
      setFotoPerfil(fotoGuardada || null);
      setFavoritos(favsGuardados ? JSON.parse(favsGuardados) : [
        'Respira profundo en momentos de estrés.',
        'Tómate 5 minutos para ti cada mañana.',
        'Escribe una cosa buena de tu día.'
      ]);
    };

    cargarDatos();
  }, []);

  const guardarCampo = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };

  const guardarArray = async (key, arr) => {
    await AsyncStorage.setItem(key, JSON.stringify(arr));
  };

  const elegirFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setFotoPerfil(uri);
      await AsyncStorage.setItem('perfil_foto', uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>Mi Perfil</Text>

      <TouchableOpacity onPress={editando ? elegirFoto : null}>
        {fotoPerfil ? (
          <Image source={{ uri: fotoPerfil }} style={styles.foto} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={{ color: theme.textColor }}>Sin foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={[styles.label, { color: theme.textColor }]}>Nombre:</Text>
      {editando ? (
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      ) : (
        <Text style={[styles.texto, { color: theme.textColor }]}>{nombre || 'No definido'}</Text>
      )}

      <Text style={[styles.label, { color: theme.textColor }]}>Descripción personal:</Text>
      {editando ? (
        <TextInput
          style={[styles.input, styles.multiline]}
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
      ) : (
        <Text style={[styles.texto, { color: theme.textColor }]}>{descripcion || 'Sin descripción'}</Text>
      )}

      <View style={styles.section}>
        <Text style={[styles.subHeader, { color: theme.textColor }]}>Emoción favorita:</Text>
        {editando ? (
          <Picker
            selectedValue={emocionFavorita}
            onValueChange={(value) => {
              setEmocionFavorita(value);
              guardarCampo('perfil_emocion', value);
            }}
            style={{ color: theme.textColor }}
            dropdownIconColor={theme.textColor}
          >
            {emocionesDisponibles.map((emo, i) => (
              <Picker.Item key={i} label={emo} value={emo} />
            ))}
          </Picker>
        ) : (
          <Text style={[styles.texto, { color: theme.textColor }]}>{emocionFavorita}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.subHeader, { color: theme.textColor }]}>Tus 3 consejos favoritos:</Text>
        {editando
          ? favoritos.map((fav, i) => (
              <TextInput
                key={i}
                style={styles.input}
                value={fav}
                onChangeText={(text) => {
                  const nuevos = [...favoritos];
                  nuevos[i] = text;
                  setFavoritos(nuevos);
                  guardarArray('perfil_favoritos', nuevos);
                }}
              />
            ))
          : favoritos.map((fav, i) => (
              <Text key={i} style={[styles.texto, { color: theme.textColor }]}>• {fav}</Text>
            ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.subHeader, { color: theme.textColor }]}>Temas:</Text>
        {temasDisponibles.map((tema, i) => (
          <TouchableOpacity
            key={i}
            style={{
              padding: 10,
              marginVertical: 5,
              borderRadius: 8,
              backgroundColor: themeName === tema ? theme.accentColor : '#ccc'
            }}
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
      </View>

      <View style={styles.editButtonContainer}>
        <Button
          title={editando ? "Guardar y salir" : "Editar"}
          color={theme.buttonColor}
          onPress={async () => {
            if (editando) {
              await guardarCampo('perfil_nombre', nombre);
              await guardarCampo('perfil_descripcion', descripcion);
            }
            setEditando(!editando);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  multiline: {
    height: 80
  },
  section: {
    marginTop: 30
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  texto: {
    fontSize: 16,
    marginBottom: 5
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 15
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15
  },
  editButtonContainer: {
    marginTop: 40
  }
});

export default PerfilScreen;
