import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Homescreen from './screens/HomeScreen';
import Mapscreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { create } from 'tailwind-react-native-classnames';




export default function App() {

  const Stack = createNativeStackNavigator();


  const screenOptions = {
    headerShown: false,
  };

  return (

    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={Homescreen} />
            <Stack.Screen name="MapScreen" component={Mapscreen} />

          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
