import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, StyleSheet } from 'react-native';

export default function MapScreen(){
    return (
    <View style={styles.container}>
      <Text>YOU ARE in Map PAGE on your app!</Text>
      <StatusBar style="auto" />
  </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  