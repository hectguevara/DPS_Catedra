// src/utils/historyService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'meditation_history';

export async function saveToHistory(item) {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.unshift({ ...item, timestamp: new Date().toISOString() });
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(parsed.slice(0, 20)));
  } catch (e) {
    console.error('Error guardando historial:', e);
  }
}

export async function getHistory() {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error leyendo historial:', e);
    return [];
  }
}
