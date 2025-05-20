import AsyncStorage from '@react-native-async-storage/async-storage';

const POINTS_KEY = 'user_points';
const DECORATION_KEY = 'active_decoration';
const OWNED_ITEMS_KEY = 'owned_items';

export const addPoints = async (amount) => {
  const current = await getPoints();
  const newTotal = current + amount;
  await AsyncStorage.setItem(POINTS_KEY, newTotal.toString());
  return newTotal;
};

export const getPoints = async () => {
  const stored = await AsyncStorage.getItem(POINTS_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

export const spendPoints = async (amount) => {
  const current = await getPoints();
  if (current >= amount) {
    await AsyncStorage.setItem(POINTS_KEY, (current - amount).toString());
    return true;
  }
  return false;
};

export const setDecoration = async (decoration) => {
  await AsyncStorage.setItem(DECORATION_KEY, decoration);
};

export const getDecoration = async () => {
  const decoration = await AsyncStorage.getItem(DECORATION_KEY);
  return decoration || 'default';
};

export const getOwnedItems = async () => {
  const items = await AsyncStorage.getItem(OWNED_ITEMS_KEY);
  return items ? JSON.parse(items) : [];
};

export const addOwnedItem = async (item) => {
  const items = await getOwnedItems();
  if (!items.includes(item)) {
    items.push(item);
    await AsyncStorage.setItem(OWNED_ITEMS_KEY, JSON.stringify(items));
  }
};

export const ownsItem = async (item) => {
  const items = await getOwnedItems();
  return items.includes(item);
};
