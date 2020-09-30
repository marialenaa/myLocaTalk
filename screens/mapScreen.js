import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import {View, StyleSheet, Dimensions} from 'react-native';

export default function MapScreen(){
  const [errorMsg, setErrorMsg] = useState(null);
  const [getLat, setGetLat] = useState(0)
  const [getLon, setGetLon] = useState(0)

  useEffect(() => {
    async function askPermission(){
      const {status} = await Permissions.askAsync(Permissions.LOCATION)
      if(status === 'granted'){
       Location.watchPositionAsync({distanceInterval: 10},
          (location) => {
            setGetLat(location.coords.latitude)
            setGetLon(location.coords.longitude)
            console.log(location, location.coords.latitude, location.coords.longitude, getLat, getLon);})
      } 
      else {
        setErrorMsg(<Text>Location permission not granted</Text>)
      }
    }
    askPermission()
  }, [])

console.log('LOCATION ===>')
    return (
      <View style={styles.container}>
          {errorMsg}
            <MapView style={styles.mapStyle} initialRegion={{
              latitude: 48.866667,
              longitude: 2.333333,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} />
          <StatusBar style="auto" />
    </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  