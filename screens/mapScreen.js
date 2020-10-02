import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import { StyleSheet,View, Keyboard } from 'react-native';
import { Button, Icon, Overlay, Input, Text   }  from 'react-native-elements';

function MapScreen(props){
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [titlePOI, setTitlePOI] = useState(null)
  const [descPOI, setDescPOI] = useState(null)
  const [coords, setCoords] = useState(0)
  const [waittingMarker, setWaittingMarker] = useState(false)
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function askPermission(){
      const {status} = await Permissions.askAsync(Permissions.LOCATION)
      // console.log('status', {status})
      if(status === 'granted'){
       Location.watchPositionAsync({distanceInterval: 10},
          (location) => {
            props.addPOIRedux({title:'Ma position', desc:'', coordinate:{latitude:location.coords.latitude, longitude: location.coords.longitude}} ) 
          })
            // console.log(location);
      } else {
        setErrorMsg(<Text style={{textAlign:'center', backgroundColor:'#fcb1ab'}}>Location permission not granted</Text>)
      }
    }
    askPermission()
  }, [])

  const Region = {
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.2,
  }
    // console.log('REGIO++++++',Region)
    let title, title2
    if(waittingMarker){
      title="Selectionnez sur la Map   "
      title2="..."
    }else{
      title="Pin personnalisé   "
      title2="Mes Pins"
    }
  const handleOverlay = (coord) =>{
    if(waittingMarker){
      setOverlayVisible(!isOverlayVisible)
      setCoords(coord)
      setDescPOI(null)
      setTitlePOI(null)
    }else{
      console.log('ELSEEEE')
    }
  }

  const handleMarkerSelec = () => {
    setWaittingMarker(true)
  }

  const handleAjout = () => {
    setWaittingMarker(false)
    setOverlayVisible(!isOverlayVisible)
    props.addPOIRedux({title:titlePOI, desc:descPOI, coordinate:coords})
  }

  let disabledAjout = false
  if(titlePOI && descPOI){
    disabledAjout=true
  }

    return (

      <View style={styles.container}>
            {errorMsg}
            <MapView  
            showsMyLocationButton={true}
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            style={ {flex: 1}}
            initialRegion={Region}
            onPress={e => handleOverlay(e.nativeEvent.coordinate)}
            >
               {props.listPOI.map((marker, i) => (
                  <Marker
                    draggable
                    provider={PROVIDER_GOOGLE}
                    key={i}
                    coordinate={marker.coordinate}
                    pinColor={'pink'}
                  >
                       <Callout>
                         <View>
                            <Text>
                              {marker.title}
                              </Text>
                              <Text>
                              {marker.desc}
                              </Text>
                         </View>
                        </Callout>
                  </Marker>
                 ))
            }
            </MapView>
            <Button 
                disabled={waittingMarker}
                title={title}
                onPress={handleMarkerSelec}
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color: waittingMarker? '#9da4ad' :  '#fcd476',
                  fontSize: 20,
                }}
                icon={
                  <Icon
                    type='font-awesome'
                    name="plus"
                    size={25}
                    color={waittingMarker? '#9da4ad' :  "#fcd476" }
                  />
                }
                iconLeft
                buttonStyle={{
                    justifyContent:'center', 
                    backgroundColor: waittingMarker? '#c5e0db' :  '#42c6ae' , 
                    borderWidth:2, 
                    borderColor:'#ffe093', 
                }}
                />
                 {/* <Button 
                disabled={waittingMarker}
                title={title2}
                onPress={() => setIsVisible(true)}
                type='outline' 
                titleStyle={{
                  fontWeight: "bold",
                  color:waittingMarker? '#9da4ad' :  '#fcd476',
                  fontSize:20,
                }}
                buttonStyle={{
                    justifyContent:'center', 
                    backgroundColor: waittingMarker? '#c5e0db' :  '#42c6ae' , 
                    borderWidth:2, 
                    borderColor:'#ffe093', 
                }}
                /> */}
                 <Overlay overlayStyle={{ width: '85%', textAlign:'center'}} isVisible={isOverlayVisible} onBackdropPress={() => Keyboard.dismiss()}>
                   <View >
                   <Button 
                      title="Go "
                      onPress={handleAjout}
                      type='outline' 
                      titleStyle={{
                        fontWeight: "bold",
                        color:'#ea3a3a',
                        fontSize: disabledAjout? 30 : 20,
                      }}
                      disabled={!disabledAjout}
                      icon={
                        <Icon
                          type='font-awesome'
                          name="map-marker"
                          size={disabledAjout ? 30: 20}
                          color={disabledAjout ? "#ea3a3a" : '#abb0b5'}
                        />
                      }
                      iconRight
                      buttonStyle={{borderColor: "#42c6ae", borderWidth:1 , marginBottom:20}}
                    />
                   <Input 
                      label='Titre'
                      placeholderTextColor='#fcb1ab'
                      placeholder="J'écris.."
                      value={titlePOI}
                      onChangeText={(value) => setTitlePOI(value)}
                      style={styles.input}
                    />
                    <Input 
                      label='Description'
                      placeholderTextColor='#fcb1ab'
                      placeholder="J'écris.."
                      value={descPOI}
                      onChangeText={(value) => setDescPOI(value)}
                      style={styles.input}
                    />
                 
                    <Button 
                      title="Annuler  "
                      onPress={() => {setWaittingMarker(false) , setOverlayVisible(!isOverlayVisible)}}
                      type='outline' 
                      titleStyle={{
                        fontWeight: "bold",
                        color:'#ea3a3a',
                        fontSize:15,
                      }}
                      buttonStyle={styles.butonStyle}
                    />
                   </View>
                  </Overlay>
    </View>

    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    input: {
      fontWeight: "bold",
      fontSize:15
    },
    butonStyle: {
      justifyContent:'center', 
      borderColor:'#42c6ae', 
      borderWidth:1, 
      marginBottom:20,
    }
  });

function mapDispatchToProps(dispatch){
  return {
    addPOIRedux: function(addPOIList){
      dispatch({ type: "addInPoiList",
      infosPOI : addPOIList })
    }
  }
}

function mapStateToProps(state){
  return {
    listPOI : state.listPOI
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
