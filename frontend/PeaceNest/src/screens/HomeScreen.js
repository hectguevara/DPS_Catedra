import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/PeaceNestLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>
        PeaceNest es tu espacio para calmar la ansiedad, reducir el estrés y
        encontrar apoyo cuando más lo necesitas.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f2f4f8",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e5eaa",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    lineHeight: 22,
  },
});

export default HomeScreen;
