import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <ThemeProvider>
      <BottomTabs />
    </ThemeProvider>
  );
}
