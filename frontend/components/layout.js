import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import { connect } from 'react-redux';

import MapScreen from '../screens/mapScreen';
import ChatScreen from '../screens/chatScreen';
import PinsScreen from '../screens/pinsScreen';

const BottomNavigator  = createBottomTabNavigator()
    
function TabBottomMap(props){

    let badge;
    if(props.notif === 0){
        badge = null
     } else {
         badge = props.notif
     }

  return(
      <BottomNavigator.Navigator
        screenOptions={({route}) =>({
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
            } else if(route.name === 'pins'){
            iconName = focused
            ? 'ios-list'
            : 'ios-pin'
            }
            return <Ionicons name={iconName} size={size} color={color} />
        },
        })}
       
    tabBarOptions={{
        activeTintColor: '#c4133c',
      inactiveTintColor: '#ff938a'
    }} >
       <BottomNavigator.Screen name='chat' listeners={{tabPress: e => { props.resetCount(props.notif)} }} options={{ tabBarBadge: badge}} component={ChatScreen} headerMode='none' />
        <BottomNavigator.Screen name='map' component={MapScreen} />
        <BottomNavigator.Screen name='pins' component={PinsScreen} headerMode='none' />
        </BottomNavigator.Navigator>  
)
}


function mapStateToProps(state){
    return {
      notif : state.notif
      }
  } 

  function mapDispatchToProps(dispatch){
    return{
        resetCount : function(notif){
          dispatch( {type: 'resetCount',
          notif:notif
        } )
        }
      }
    }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TabBottomMap)
