import React from 'react';
import { connect } from 'react-redux';

import { Card, Button, Icon, Text   }  from 'react-native-elements';
import { View, Image } from 'react-native';


function PinsScreen(props){

  const handleRemovePin = (title) => {
    props.deletePOIRedux(title)
  }

    return(
        <Card >
        <Card.Title >Ma Pins List</Card.Title>
        <Card.Divider/>
        
        {props.listPOI.length === 0 ? <Text>LISTE VIDE</Text> : props.listPOI.map((pin, i) => (
              <View key={i} >
                <Image
                    // style={styles.image}
                    resizeMode="cover"
                    source={{uri : '../assets/ii.png' }}
                  />
                  <Text><Icon  type='font-awesome' name="map-marker" />{pin.title}</Text>
                   <Text>{pin.desc}</Text>
                   <Button
                      onPress={()=>handleRemovePin(pin.title)}
                      icon={
                        <Icon
                        type='font-awesome'
                          name="minus-square"
                          size={15}
                          color="#ea3a3a"
                        />
                        }
                        iconRight
                        type="clear"
                        title="Button"
                        titleStyle={{color:'#ea3a3a'}}
                      />
                      <Card.Divider/>

              </View>
              
            ))
          }
        </Card>
    )
}
function mapStateToProps(state){
  return {
    listPOI : state.listPOI
    }
}


function mapDispatchToProps(dispatch){
  return {
    deletePOIRedux : function(title){
     dispatch( {type: 'deletePin',
    title : title
    }) 
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PinsScreen)
