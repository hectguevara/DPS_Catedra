import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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
import ReproductorYouTubeScreen from "../screens/ReproductorYoutubeScreen";
import HistorialScreen from "../screens/HistorialScreen";
import MindfulnessScreen from "../screens/MindfulnessScreen";
import ShopScreen from "../screens/ShopScreen";
import ThemeScreen from "../screens/ThemeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Login/RegisterScreen";
import ForgotPasswordScreen from "../screens/Login/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/Login/ResetPasswordScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Inicio":
              iconName = "home-outline";
              break;
            case "Diario":
              iconName = "book-outline";
              break;
            case "Menú":
              iconName = "menu-outline";
              break;
            case "Perfil":
              iconName = "person-outline";
              break;
            case "Educativo":
              iconName = "school-outline";
              break;
            case "Consejo":
              iconName = "bulb-outline";
              break;
            case "Favoritos":
              iconName = "heart-outline";
              break;
            case "Tienda":
              iconName = "cart-outline";
              break;
            case "Temas":
              iconName = "color-palette-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

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
      <Tab.Screen name="Tienda" component={ShopScreen} />
      <Tab.Screen name="Temas" component={ThemeScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 👇 Pantallas de autenticación */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* 👇 Pantallas principales (tabs) */}
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen
          name="Tecnicas de Respiracion"
          component={TecnicaRespiracionScreen}
        />
        <Stack.Screen name="Detalle Técnica" component={DetalleTecnicaScreen} />
        <Stack.Screen name="Meditaciones" component={MeditacionScreen} />
        <Stack.Screen
          name="ReproductorPixabay"
          component={ReproductorPixabayScreen}
        />
        <Stack.Screen
          name="ReproductorYouTube"
          component={ReproductorYouTubeScreen}
        />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Mindfulness" component={MindfulnessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
