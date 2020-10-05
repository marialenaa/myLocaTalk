import React, { useState } from 'react';
import { PROVIDER_GOOGLE , Marker, Callout} from 'react-native-maps';

import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Overlay, Input, Text, Tile }  from 'react-native-elements';

export default function MarkerCustom(){
    // const [avatarPin, setAvatartPin] = useState('../assets/ii.png')
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    return(
        <Marker
            draggable
            provider={PROVIDER_GOOGLE}
            key={i}
            ref={i}
            coordinate={props.coordinate}
            image={require('../assets/ii.png')}
            >
                <TouchableWithoutFeedback onPress={setOverlayVisible(!isOverlayVisible)}>
                    <Callout>
                        <View>
                        <Text>
                            {props.title}
                            </Text>
                            <Text>
                            {marker.desc}
                            </Text>
                        </View>
                    </Callout>
                </TouchableWithoutFeedback>
        </Marker>
    )
}