import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import DiarioScreen from '../screens/DiarioScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EducationalScreen from '../screens/EducationalScreen';
import QuoteScreen from '../screens/QuoteScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ShopScreen from '../screens/ShopScreen';
import ThemeScreen from '../screens/ThemeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Diario': iconName = 'book-outline'; break;
              case 'Perfil': iconName = 'person-outline'; break;
              case 'Educativo': iconName = 'school-outline'; break;
              case 'Consejo': iconName = 'bulb-outline'; break;
              case 'Favoritos': iconName = 'heart-outline'; break;
              case 'Tienda': iconName = 'cart-outline'; break;
              case 'Temas': iconName = 'color-palette-outline'; break;
              default: iconName = 'ellipse-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Diario" component={DiarioScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
        <Tab.Screen name="Educativo" component={EducationalScreen} />
        <Tab.Screen name="Consejo" component={QuoteScreen} />
        <Tab.Screen name="Favoritos" component={FavoritesScreen} />
        <Tab.Screen name="Tienda" component={ShopScreen} />
        <Tab.Screen name="Temas" component={ThemeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
