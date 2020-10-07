import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import LoginScreen from './screens/loginScreen';
import listPOI from './reducers/POI'
import user from './reducers/user'
import messagerie from './reducers/mess'
import notif from './reducers/notif'

import TabBottomMap from './components/layout'

const Stack  = createStackNavigator()
    
const store = createStore(combineReducers({user, listPOI, messagerie, notif}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default function App() {

  return (
    <Provider store={store}>

    <NavigationContainer>
       <Stack.Navigator>
          <Stack.Screen options={{ title: 'Welcome to LocaTalk World'}} name='login' component={LoginScreen} />
          <Stack.Screen name='map' component={TabBottomMap} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}