import React from 'react';
import { connect } from 'react-redux';

import { Button, Icon, Text, ListItem, Image }  from 'react-native-elements';
import { View } from 'react-native';


function PinsScreen(props){

  const handleRemovePin = (title) => {
    props.deletePOIRedux(title)
  }

  

    return(
      <View>
        <Text>Ma Pins List</Text>
         {props.listPOI.length === 0 ? <Text>LISTE VIDE</Text> 
         : props.listPOI.map((pin, i) => (
          <ListItem key={i}>
            <ListItem.Content  >
              <ListItem.Title ><Icon  type='font-awesome' name="map-marker" /> {pin.title} : {pin.desc}</ListItem.Title>
              <ListItem.Subtitle>{pin.lat}__{pin.lon}</ListItem.Subtitle>
                <View>
                <Image
                      // style={styles.image}
                      resizeMode="cover"
                      source={{uri : '../assets/pin.png' }}
                    />
                    <Button
                            onPress={()=>handleRemovePin(pin.title)}
                            icon={
                              <Icon
                              type='font-awesome'
                                name="minus-square"
                                size={25}
                                color="#ea3a3a"
                              />
                              }
                              iconRight
                              type="clear"
                              title=""
                              titleStyle={{color:'#ea3a3a'}}
                            />
                </View>
            </ListItem.Content>
          </ListItem>
            ))
          }
      </View>
       
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
