import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import DiarioScreen from "../screens/DiarioScreen";
import MenuScreen from "../screens/MenuScreen";
import PerfilScreen from "../screens/PerfilScreen";
import EducationalScreen from "../screens/EducationalScreen";
import QuoteScreen from "../screens/QuoteScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import TecnicaRespiracionScreen from "../screens/TecnicaRespiracionScreen";
import DetalleTecnicaScreen from "../screens/DetalleTecnicaScreen";
import MeditacionScreen from "../screens/MeditacionScreen";
import ReproductorPixabayScreen from "../screens/ReproductorPixabayScreen";
import ReproductorYouTubeScreen from '../screens/ReproductorYoutubeScreen';
import HistorialScreen from "../screens/HistorialScreen";
import MindfulnessScreen from '../screens/MindfulnessScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Inicio") iconName = "home-outline";
          else if (route.name === "Diario") iconName = "book-outline";
          else if (route.name === "Menú") iconName = "menu-outline";
          else if (route.name === "Perfil") iconName = "person-outline";
          else if (route.name === "Educativo") iconName = "school-outline";
          else if (route.name === "Consejo") iconName = "bulb-outline";
          else if (route.name === "Favoritos") iconName = "heart-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Diario" component={DiarioScreen} />
      <Tab.Screen name="Menú" component={MenuScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Educativo" component={EducationalScreen} />
      <Tab.Screen name="Consejo" component={QuoteScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tecnicas de Respiracion"
          component={TecnicaRespiracionScreen}
        />
        <Stack.Screen
          name="Detalle Técnica"
          component={DetalleTecnicaScreen}
        />
        <Stack.Screen name="Meditaciones" component={MeditacionScreen} />
        <Stack.Screen name="ReproductorPixabay" component={ReproductorPixabayScreen} />
        <Stack.Screen name="ReproductorYouTube" component={ReproductorYouTubeScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Mindfulness" component={MindfulnessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
