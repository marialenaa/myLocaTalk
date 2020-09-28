import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import LoginScreen from './screens/loginScreen';
import MapScreen from './screens/mapScreen';
import ChatScreen from './screens/chatScreen';

const StackNavigator = createStackNavigator()
const BottomNavigator  = createBottomTabNavigator()
    
 

function TabBottomMap(){
  return(
      <BottomNavigator.Navigator screenOptions={({route}) =>({
        tabBarIcon: ({color, size, focused}) => {
        let iconName;
        if(route.name === 'map'){
          iconName = focused
          ? 'md-map'
          : 'ios-pin'
        }else if(route.name === 'chat'){
          iconName = focused
          ? 'md-text'
          : 'ios-chatboxes'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      },
    })}
    tabBarOptions={{
        activeTintColor: '#c4133c',
      inactiveTintColor: '#ff938a'
    }} >
        <BottomNavigator.Screen name='map' component={MapScreen} />
        <BottomNavigator.Screen name='chat' component={ChatScreen} />
        </BottomNavigator.Navigator>  
)
}

export default function App() {
  return (
    <NavigationContainer>
       <StackNavigator.Navigator>
          <StackNavigator.Screen 
          options={{
              title: 'Welcome to LocaTalk World'
            }}
          name='login' component={LoginScreen} />
          <StackNavigator.Screen
          options={{
            title: 'My Map'
          }} 
          name='map' component={TabBottomMap} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}