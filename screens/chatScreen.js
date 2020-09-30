import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet,Keyboard,TouchableWithoutFeedback  } from 'react-native';
import {Input, Button} from 'react-native-elements';

export default function ChatScreen(props){

  const [messList, setMessList] = useState([])
  const [content, setContent] = useState('')
  console.log(props)
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground style={styles.container} source={require('../assets/bub.jpg')} style={styles.image}>
                <Input 
                placeholderTextColor='#ea3a3a'
                placeholder='Ecrire..'
                value={content}
                onChangeText={(value) => setContent(value)}
                style={styles.input}
                />
                <Button 
                title='Lancer'
                onPress={()=> setContent('')}
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color:'#ea3a3a',
                  fontSize:15,
                }}
                buttonStyle={{
                  borderColor: "#ea3a3a", borderWidth:1
                }}
                />
                <StatusBar style="auto" />
            </ImageBackground>
        </TouchableWithoutFeedback>
      )
    }


  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding:10
      }, 
    input: {
      fontWeight: "bold",
      fontSize:15
    }
  });
  