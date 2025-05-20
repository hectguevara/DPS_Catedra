import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { storeItems } from '../data/storeItems';
import { getPoints, spendPoints, addOwnedItem, ownsItem } from '../utils/rewardSystem';

const ShopScreen = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const pts = await getPoints();
      setPoints(pts);
    };
    fetchPoints();
  }, []);

  const handleBuy = async (item) => {
    const alreadyOwned = await ownsItem(item.id);
    if (alreadyOwned) return Alert.alert('Ya tienes este artículo');

    const success = await spendPoints(item.price);
    if (success) {
      await addOwnedItem(item.id);
      const updatedPoints = await getPoints();
      setPoints(updatedPoints);
      Alert.alert('Compra exitosa', `Has comprado ${item.name}`);
    } else {
      Alert.alert('No tienes suficientes puntos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda de Recompensas</Text>
      <Text style={styles.points}>Puntos: {points}</Text>
      <FlatList
        data={storeItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.price} pts</Text>
            <Button title="Comprar" onPress={() => handleBuy(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 10 },
  points: { fontSize: 18, marginBottom: 20 },
  item: { marginBottom: 15 }
});

export default ShopScreen;
