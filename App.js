import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from './screens/loginScreen';
import MapScreen from './screens/mapScreen';
import ChatScreen from './screens/chatScreen';

const StackNavigator = createStackNavigator()
const BottomNavigator  = createBottomTabNavigator()

function TabBottomMap(){
  return(
      <BottomNavigator.Navigator headerMode={'none'}>
            <BottomNavigator.Screen name='map' component={MapScreen} />
            <BottomNavigator.Screen name='chat' component={ChatScreen} />
      </BottomNavigator.Navigator>  
)
}

export default function App() {
  return (
    <NavigationContainer>
       <StackNavigator.Navigator>
          <StackNavigator.Screen name='login' component={LoginScreen} />
          <StackNavigator.Screen name='map' component={TabBottomMap} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}