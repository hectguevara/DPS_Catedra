import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveFavoriteQuote(quote) {
  const stored = await AsyncStorage.getItem('favorites');
  const list = stored ? JSON.parse(stored) : [];

  // Estandarizamos el formato: { q: "...", a: "..." }
  const nuevo = {
    q: quote.q || quote.texto || '',
    a: quote.a || quote.autor || ''
  };

  list.push(nuevo);
  await AsyncStorage.setItem('favorites', JSON.stringify(list));
}

export async function getFavorites() {
  const stored = await AsyncStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}
export async function removeFavorite(indexToRemove) {
  const stored = await AsyncStorage.getItem('favorites');
  const list = stored ? JSON.parse(stored) : [];

  const newList = list.filter((_, index) => index !== indexToRemove);
  await AsyncStorage.setItem('favorites', JSON.stringify(newList));
  return newList;
}
