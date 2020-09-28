import React , {useState} from 'react';
import { View,  StyleSheet, ImageBackground } from 'react-native';
import { Input, Icon ,Button} from 'react-native-elements';

export default function LoginScreen({navigation}){
    
  const [loginName, setLoginName] = useState()

  const handleGo = () => {
    setLoginName('')
    navigation.navigate('map')
  }

    return(
      <View  style={styles.container}>
           <ImageBackground source={require('../assets/loginBub.png')} style={styles.image}>
              
                <Input 
                  containerStyle={
                    {width:'60%',
                   justifyContent: 'center'
                    }}
                  placeholder='Username'
                  placeholderTextColor='#f77b07'
                  fontSize='27px'
                  onChangeText={(value) => setLoginName(value)}
                  value={loginName}
                  leftIcon={
                    <Icon
                     type='font-awesome'
                     name='user' 
                     size='30'
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
                        fontSize:'25px'    
                      }}
                      buttonStyle={{
                        borderColor: "#b27237", borderWidth:1
                      }}
                      />
            </ImageBackground>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent:'space-evenly'
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'space-around',
      alignItems: 'center',
    }, 
    input:  {
      textAlign: 'center',
      color:'#fc6805',
    },
    
  });
  