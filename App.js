import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import AIGoals from './src/screens/AIGoals';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AIGoals" component={AIGoals} />
      </Stack.Navigator>
    </NavigationContainer>
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

const simpleStyle = StyleSheet.create({
  flex: 1,
  backgroundColor: '#123',
  alignItems: 'center',
  justifyContent: 'center',
});

const nestedStyle = StyleSheet.create({
  container: {
    backgroundColor: '#111366',  
  },
  text: {
    color: 'white', // Applied to the Text component
  },
});
