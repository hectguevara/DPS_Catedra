
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveFavoriteQuote(quote) {
  const stored = await AsyncStorage.getItem('favorites');
  const list = stored ? JSON.parse(stored) : [];
  list.push(quote);
  await AsyncStorage.setItem('favorites', JSON.stringify(list));
}

export async function getFavorites() {
  const stored = await AsyncStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}
