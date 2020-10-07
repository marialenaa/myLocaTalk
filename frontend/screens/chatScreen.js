import React, { useState, useEffect } from 'react';

import { KeyboardAvoidingView, ImageBackground, StyleSheet, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import {Input, Button, ListItem, Icon} from 'react-native-elements';
import { View } from 'react-native'

import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://192.168.1.3:3000");

function ChatScreen({pseudo, messList, messagerie, notif}){

  const [sendMessage, setSendMessage] = useState('')

  useEffect(() => {
    socket.on('sendMessageToAll', (newMessage) => {
      // console.log('newMessage', newMessage,newMessage.mess)
      // setNewMessageFromBack([...newMessageFromBack, {mess:newMessage.mess, pseudo:newMessage.pseudo}])
      messList({mess:newMessage.mess, pseudo:newMessage.pseudo})
      notif()
    })
  }, [messList])
  console.log('after useEffect','newMessageFromBack', messList)

  const handleSocket = () => {
    // let icon = 'user-astronaut'
    let myRegexAnge = /ange/ig ;
    let myRegexIles = /îles/ig;
    let myRegexBb = /bb/ig;
    let myRegexP = /putain/ig
  let newMessage = sendMessage.replace(myRegexAnge, '\uD83D\uDC7C');
  let newnewMess = newMessage.replace(myRegexIles, '\uD83C\uDFD6');
  let nnewMess = newnewMess.replace(myRegexP, 'put'+'\u2022\u2022\u2022');
  let theMess = nnewMess.replace(myRegexBb, '\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69')
  
    messList({mess:theMess, pseudo:pseudo})
    // setNewMessageFromBack([...newMessageFromBack, {mess:theMess, pseudo:pseudo}])
    socket.emit('sendMessage', {mess:theMess, pseudo:pseudo})
    setSendMessage('')
  }

    return(
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={require('../assets/bub.jpg')} >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{flex:1, justifyContent: "flex-end"}}>
                 {
                  messagerie.map((item, i) => (
                    <ListItem containerStyle={{backgroundColor:'transparent', alignContent:'center', textAlign:'right'}} key={i} bottomDivider>
                      {/* <Icon name={item.icon} type='font-awesome-5' size={30} color={'yellow'}/> */}
                      <ListItem.Content >
                        <ListItem.Title style={{color:'yellow', width:250, fontWeight: "bold", fontSize:20, paddingRight:20, }}>{item.pseudo}: {item.mess} </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
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
                  fontSize:25,
                }}
                onPress={() => handleSocket()}
                buttonStyle={{
                  borderColor: "#ea3a3a", borderWidth:1, marginBottom: 65, 
                }}
                /> 
                </View>
              </TouchableWithoutFeedback>     
          </ImageBackground>
        </KeyboardAvoidingView>
      )
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      flexDirection: "column",
      justifyContent: 'flex-end',
      padding:10
    },
    input: {
      fontWeight: "bold",
      fontSize:15,
      color: "#ffffff"    },
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
      pseudo : state.user,
      messagerie : state.messagerie,
      }
  }   

  function mapDispatchToProps(dispatch){
    return{
        messList : function(message){
          dispatch( {type: 'listMess', message: message })
        },
        notif : function(){
          dispatch( {type: 'setCount' })
        }
      }
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatScreen)

  