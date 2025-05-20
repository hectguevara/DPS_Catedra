// rewardSystem.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const POINTS_KEY = 'user_points';

const pointsByActivity = {
  diario: 10,
  respiracion: 5,
  meditacion: 7,
};

export const addPoints = async (activity) => {
  try {
    const current = await getPoints();
    const toAdd = pointsByActivity[activity] || 0;
    const total = current + toAdd;
    await AsyncStorage.setItem(POINTS_KEY, total.toString());
    return total;
  } catch (error) {
    console.error("Error adding points:", error);
    return null;
  }
};

export const getPoints = async () => {
  try {
    const stored = await AsyncStorage.getItem(POINTS_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error("Error getting points:", error);
    return 0;
  }
};

export const resetPoints = async () => {
  try {
    await AsyncStorage.setItem(POINTS_KEY, '0');
  } catch (error) {
    console.error("Error resetting points:", error);
  }
};
