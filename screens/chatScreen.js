import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

export default function ChatScreen(){
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bub.jpg')} style={styles.image}>
                <Text>YOU ARE in CHAT PAGE on your app!</Text>
                <StatusBar style="auto" />
            </ImageBackground>
        </View>
      )
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
  });
  