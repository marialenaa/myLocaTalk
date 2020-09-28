import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { Text, Input, Button} from 'react-native-elements';

export default function ChatScreen(){

  const [messList, setMessList] = useState([])
  const [content, setContent] = useState('')

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bub.jpg')} style={styles.image}>
                <Input 
                placeholderTextColor='#ea3a3a'
                placeholder='Your message ...'
                value={content}
                onChangeText={(value) => setContent(value)}
                style={styles.input}
                />
                <Button 
                title='Send your message'
                onPress={()=> setContent('')}
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color:'#ea3a3a',
                  fontSize:'15px',
                }}
                buttonStyle={{
                  borderColor: "#ea3a3a", borderWidth:1
                }}
                />
                <StatusBar style="auto" />
            </ImageBackground>
        </View>
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
      fontSize:'15px'
    }
  });
  