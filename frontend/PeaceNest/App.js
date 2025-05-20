import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import BottomTabs from "./src/navigation/BottomTabs";

export default function App() {
  return (
    <ThemeProvider>
      <BottomTabs />
    </ThemeProvider>
  );
}
