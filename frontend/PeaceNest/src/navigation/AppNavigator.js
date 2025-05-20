import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TecnicaRespiracionScreen from '../screens/TecnicaRespiracionScreen';
import DetalleTecnicaScreen from '../screens/DetalleTecnicaScreen';
import MeditacionScreen from '../screens/MeditacionScreen';
import ReproductorPixabayScreen from '../screens/ReproductorPixabayScreen';
import ReproductorYouTubeScreen from '../screens/ReproductorYoutubeScreen';
import MindfulnessScreen from '../screens/MindfulnessScreen';
import HistorialScreen from '../screens/HistorialScreen';
import MenuScreen from '../screens/MenuScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Tecnicas de Respiracion" component={TecnicaRespiracionScreen} />
        <Stack.Screen name="Detalle Técnica" component={DetalleTecnicaScreen} />
        <Stack.Screen name="Meditaciones" component={MeditacionScreen} />
        <Stack.Screen name="ReproductorPixabay" component={ReproductorPixabayScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="ReproductorYouTube" component={ReproductorYouTubeScreen} />
        <Stack.Screen name="Mindfulness" component={MindfulnessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}