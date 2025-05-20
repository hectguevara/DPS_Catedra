import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Linking,
  StyleSheet,
} from "react-native";
import articles from "../data/articles.json";

// Asocia los identificadores del JSON a imágenes locales
const images = {
  imagen1: require("../../assets/imagen1.jpg"),
  imagen2: require("../../assets/imagen2.png"),
  imagen3: require("../../assets/imagen3.png"),
  imagen4: require("../../assets/imagen4.png"),
};

export default function EducationalScreen() {
  return (
    <ScrollView style={styles.container}>
      {articles.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={images[item.image]} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.intro}>{item.intro}</Text>
          <Button
            title="LEER MÁS"
            onPress={() => Linking.openURL(item.articleUrl)}
          />
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
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  intro: {
    fontSize: 14,
    marginBottom: 10,
  },
});
