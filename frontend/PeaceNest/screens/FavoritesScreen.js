import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { getFavorites, removeFavorite } from "../utils/storage";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const eliminarFavorito = async (index) => {
    const actualizados = await removeFavorite(index);
    setFavorites(actualizados);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo-favorito.png")}
      style={styles.background}
      resizeMode="stretch" 
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {favorites.length === 0 ? (
            <Text style={styles.noData}>No tienes frases guardadas aún.</Text>
          ) : (
            favorites.map((item, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => eliminarFavorito(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#c00" />
                </TouchableOpacity>
                <Text style={styles.text}>"{item.q}"</Text>
                <Text style={styles.author}>– {item.a}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  container: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#ffffffdd",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  text: {
    fontSize: 18,
    color: "#333",
    fontStyle: "italic",
    marginBottom: 8,
    textAlign: "center",
  },
  author: {
    fontSize: 15,
    textAlign: "right",
    color: "#666",
  },
  noData: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginTop: 40,
  },
});