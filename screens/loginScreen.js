import React from 'react';
import { View, Text, StyleSheet, ImageBackground , Button} from 'react-native';

export default function LoginScreen({navigation}){
    
    return(
      <View  style={styles.container}>
           <ImageBackground source={require('../assets/loginBub.png')} style={styles.image}>
                <Text>YOU ARE in LOGIN PAGE on your app!</Text>
                    <Button
                        title='GO TO MAP'
                        onPress={()=> navigation.navigate('map')}
                    >
                    </Button>
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
  