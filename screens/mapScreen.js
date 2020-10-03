import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import { StyleSheet,View, Keyboard } from 'react-native';
import { Button, Icon, Text }  from 'react-native-elements';

import OverlayPin from '../components/overlayPin'

function MapScreen(props){
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [titlePOI, setTitlePOI] = useState(null)
  const [descPOI, setDescPOI] = useState(null)
  const [coords, setCoords] = useState(0)

  const [waittingMarker, setWaittingMarker] = useState(false)

  // const [lon, setLon] = useState(null)
  // const [lat, setLat] = useState(null)
  const [loca, setLoca] = useState({})


  useEffect(() => {
    async function askPermission(){
      const {status} = await Permissions.askAsync(Permissions.LOCATION)
      // console.log('status', {status})
      if(status === 'granted'){
       await Location.watchPositionAsync({distanceInterval: 30},
          (location) => {
            // setLoca(location.coords)            
            // setLon(location.coords.longitude)
            // setLat(location.coords.latitude)
          })
      } else {
        setErrorMsg(<Text style={{textAlign:'center', backgroundColor:'#fcb1ab'}}>Location permission not granted</Text>)
      }
    }
    askPermission()
  }, [])

  const Region = {
    latitude:  48.866667,
    longitude:  2.333333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.2,
  }

  let title
    if(waittingMarker){
      title="Selectionnez sur la Map   "
    }else{
      title="Pin personnalisé   "
    }

    const handleMarkerSelec = () => {
      setWaittingMarker(true)
    }

    const handleOverlay = (lat, lon) =>{
      console.log('lonlat',lat, lon)
      if(waittingMarker){
        console.log('zofnzfzf')
        setOverlayVisible(!isOverlayVisible)
        setCoords({lat:lat, lon:lon})
        setDescPOI(null)
        setTitlePOI(null)
      }else{
        console.log('ELSEEEE')
      }
    }

  const handleAjout = () => {
    setWaittingMarker(false)
    setOverlayVisible(!isOverlayVisible)
    props.addPOIRedux({title:titlePOI, desc:descPOI, lat:coords.lat, lon:coords.lon})
  }

  let disabledAjout = false
  if(titlePOI && descPOI){
    disabledAjout=true
  }

    return (

      <View style={styles.container}>
            {errorMsg}
            <MapView  
                showsUserLocation={true}
                showsMyLocationButton={true}
                onUserLocationChange={e => setLoca(e.nativeEvent.coordinate)}
                zoomEnabled={true}
                scrollEnabled={true}
                showsScale={true}
                style={ {flex: 1}}
                region={Region}
                onPress={e => handleOverlay(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
            >
               {props.listPOI.map((marker, i) => (
                  <Marker
                    draggable
                    provider={PROVIDER_GOOGLE}
                    key={i}
                    coordinate={{latitude:marker.lat, longitude:marker.lon}}
                    pinColor={'#fc7d74'}
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
                  fontSize:20 ,
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
                <OverlayPin 
                    onPressKeyBord={() => Keyboard.dismiss()}
                    isOverlayVisible={isOverlayVisible}
                    onPressBtnAnnuler={() => {setWaittingMarker(false) , setOverlayVisible(!isOverlayVisible)}}
                    stylesInput={styles.input}
                    styleBtn={styles.butonStyle}
                    onChangeTextBtnDesc={(value) => setDescPOI(value)}
                    onChangeTextBtntitle={(value) => setTitlePOI(value)}
                    valueDesc={descPOI}
                    valueTitle={titlePOI}
                    onPressBtnGo={handleAjout}
                    disabledBtnGo={!disabledAjout}
                    sizeIconGo={disabledAjout ? 30: 20}
                    colorIconGo={disabledAjout ? "#ea3a3a" : '#abb0b5'}
                    titleStyleBtnGo={{
                      fontWeight: "bold",
                      color:'#ea3a3a',
                      fontSize: disabledAjout? 30 : 20,
                    }}
                    buttonStyleBtnGo={{borderColor: "#42c6ae", borderWidth:1 , marginBottom:20}}

                />
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
