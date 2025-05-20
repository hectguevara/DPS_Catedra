import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import DiarioScreen from '../screens/DiarioScreen';
import MenuScreen from '../screens/MenuScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EducationalScreen from '../screens/EducationalScreen';
import QuoteScreen from '../screens/QuoteScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Inicio') iconName = 'home-outline';
            else if (route.name === 'Diario') iconName = 'book-outline';
            else if (route.name === 'Menú') iconName = 'menu-outline';
            else if (route.name === 'Perfil') iconName = 'person-outline';
            else if (route.name === 'Educativo') iconName = 'school-outline';
            else if (route.name === 'Consejo') iconName = 'bulb-outline';
            else if (route.name === 'Favoritos') iconName = 'heart-outline';

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
    </NavigationContainer>
  );
}