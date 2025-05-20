import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { storeItems } from '../data/storeItems';
import { getPoints, spendPoints, addOwnedItem, ownsItem, getOwnedItems } from '../utils/rewardSystem';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const ShopScreen = () => {
  const [points, setPoints] = useState(0);
  const [owned, setOwned] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const pts = await getPoints();
      const items = await getOwnedItems();
      setPoints(pts);
      setOwned(items);
    };
    fetchData();
  }, []);

  const handleBuy = async (item) => {
    const alreadyOwned = owned.includes(item.id);
    if (alreadyOwned) return Alert.alert('Ya tienes esta insignia');

    const success = await spendPoints(item.price);
    if (success) {
      await addOwnedItem(item.id);
      const updatedPoints = await getPoints();
      const updatedItems = await getOwnedItems();
      setPoints(updatedPoints);
      setOwned(updatedItems);
      Alert.alert('Compra exitosa', `Has comprado ${item.name}`);
    } else {
      Alert.alert('No tienes suficientes puntos');
    }
  };

  const renderItem = ({ item }) => {
    const comprado = owned.includes(item.id);

    return (
      <View style={[styles.item, { backgroundColor: theme.primaryColor }]}>
        <Text style={{ color: theme.textColor }}>{item.name} - {item.price} pts</Text>
        <Button
          title={comprado ? "Ya adquirida" : "Comprar"}
          onPress={() => !comprado && handleBuy(item)}
          disabled={comprado}
          color={theme.buttonColor}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Tienda de Insignias</Text>
      <Text style={[styles.points, { color: theme.textColor }]}>Puntos: {points}</Text>
      <FlatList
        data={storeItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
  points: { fontSize: 18, marginBottom: 20 },
  item: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  }
});

export default ShopScreen;
