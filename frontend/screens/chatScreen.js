import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet,Keyboard,TouchableWithoutFeedback  } from 'react-native';
import {Input, Button, ListItem, Icon} from 'react-native-elements';
import { View } from 'react-native'

import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://192.168.1.3:3000");

function ChatScreen({pseudo}){

  const [messList, setMessList] = useState([])
  const [newMessageFromBack, setNewMessageFromBack]  = useState([])
  const [sendMessage, setSendMessage] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  // console.log(props)

  useEffect(() => {
    socket.on('sendMessageToAll', (newMessage) => {
      setNewMessageFromBack(newMessage)
    })
  }, [newMessageFromBack])
  console.log('after useEffect',newMessageFromBack, messList)
  

  const handleSocket = () => {
    let icon = 'user-astronaut'
    let myRegexAnge = /ange/ig ;
    let myRegexIles = /îles/ig;
    let myRegexBb = /bb/ig;
    let myRegexP = /putain/ig
  let newMessage = sendMessage.replace(myRegexAnge, '\uD83D\uDC7C');
  let newnewMess = newMessage.replace(myRegexIles, '\uD83C\uDFD6');
  let nnewMess = newnewMess.replace(myRegexP, 'put'+'\u2022\u2022\u2022');

  console.log('regex1',nnewMess)

  let theMess = nnewMess.replace(myRegexBb, '\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69')
  console.log('regex2',theMess)

    setMessList([...messList, {icon: icon, mess:theMess}])
    // console.log('SOOOOCKET', sendMessage)
    socket.emit('sendMessage', {sendMessage:theMess, pseudo:pseudo})
    setSendMessage('')
  }
  // console.log('infoForOFRONT',newMessageFromBack)

  
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground style={styles.container} source={require('../assets/bub.jpg')} >
              <View>
                {
                  messList.map((item, i) => (
                    <ListItem containerStyle={{backgroundColor:'transparent', alignContent:'center'}} key={i} bottomDivider>
                      <Icon name={item.icon} type='font-awesome-5' size={30} color={'yellow'}/>
                      <ListItem.Content >
                        <ListItem.Title style={{color:'yellow', width:250, fontWeight: "bold", fontSize:20, paddingRight:20, }}>{pseudo}: {item.mess}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
                 </View>
                 <Input 
                placeholderTextColor='#ea3a3a'
                placeholder='Ecrire..'
                value={sendMessage}
                onChangeText={(value) => setSendMessage(value)}
                style={styles.input}
                />
                <Button 
                title='Lancer'
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color:'#ea3a3a',
                  fontSize:15,
                }}
                onPress={() => handleSocket()}
                buttonStyle={{
                  borderColor: "#ea3a3a", borderWidth:1
                }}
                />               
                {/* <Button 
                title='Lancer A TOUS LE MONDE'
                onPress={()=> setContent('')}
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color:'#ea3a3a',
                  fontSize:15,
                }}
                onPress={() => io.emit('sendMessage', 'hello John ! ')}
                buttonStyle={{
                  borderColor: "#ea3a3a", borderWidth:1
                }}
                /> */}
               
                <StatusBar style="auto" />
            </ImageBackground>
        </TouchableWithoutFeedback>
      )
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
      flexDirection: "column",
      justifyContent: 'flex-end',
      alignItems:'center',
      padding:10
    },
    input: {
      fontWeight: "bold",
      fontSize:15,
      color: "#ffffff"
    },
    message: {
      flexDirection: "row",
      fontWeight: "bold",
      alignSelf: 'flex-end',
      width:'auto',
      color:'red'
    }
  });
  
  function mapStateToProps(state){
    return {
      pseudo : state.user
      }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(ChatScreen)

  