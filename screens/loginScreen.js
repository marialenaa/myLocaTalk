import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon ,Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';

function LoginScreen({navigation, userSave}){
  const [loginName, setLoginName] = useState('')
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGo = () => {
    if(loginName != ''){
      console.log(loginName)
      navigation.navigate('map')
      userSave(loginName)
      setLoginName('')
    } else {
      setErrorMsg(<Text>Entrez un speudo</Text>)
    }
  }

  const handleChangeText = (value) => {
    setErrorMsg(null)
    setLoginName(value)
  }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <ImageBackground style={styles.container} source={require('../assets/loginBub.png')} style={styles.image}>
              {errorMsg}
                <Input 
                  containerStyle={
                    {width:'60%',
                   justifyContent: 'center'
                    }}
                  placeholder='Username'
                  placeholderTextColor='#f77b07'
                  fontSize={27}
                  onFocus={() => setErrorMsg(null)}
                  onChangeText={(value) => handleChangeText(value) }
                  value={loginName}
                  leftIcon={
                    <Icon
                     type='font-awesome'
                     name='user' 
                     size={30}
                     color='#f77b07'
                    />
                  }
                  style={styles.input}
                />
                <Button 
                      onPress={() => handleGo() }
                      title ="GO !"
                      type='outline'
                      titleStyle={{
                        fontWeight: "bold",
                        color:'#f77b07',
                        fontSize:25    
                      }}
                      buttonStyle={{
                        borderColor: "#b27237", borderWidth:1
                      }}
                      />
            </ImageBackground>
       </TouchableWithoutFeedback>
    )
  }

  function mapDispatchToProps(dispatch){
    return {
      userSave: function(loginName){
        dispatch( {type: 'userSaving',
        user : loginName } )
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    image: {
      flex: 1,
      paddingTop: 200,
      resizeMode: 'cover',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }, 
    input:  {
      textAlign: 'center',
      color:'#fc6805',
    },
    
  });
 
  export default connect(
    null,
    mapDispatchToProps
  )(LoginScreen)