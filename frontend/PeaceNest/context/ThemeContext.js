import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../theme/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('Hope');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme_selected');
      if (storedTheme) setThemeName(storedTheme);
    };
    loadTheme();
  }, []);

  const updateTheme = async (name) => {
    setThemeName(name);
    await AsyncStorage.setItem('theme_selected', name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
