import React from 'react';

import { View } from 'react-native';
import { Button, Icon, Overlay, Input }  from 'react-native-elements';


export default function OverlayPin(props){

  // const [isVisible, setIsVisible] = useState(false);

    return(
        <Overlay overlayStyle={{ width: '85%', textAlign:'center'}} isVisible={props.isOverlayVisible} onBackdropPress={props.onPressKeyBord}>
            <View >
                <Button 
                    title="Go "
                    onPress={props.onPressBtnGo}
                    type='outline' 
                    titleStyle={props.titleStyleBtnGo}
                    disabled={props.disabledBtnGo}
                    icon={
                      <Icon
                        type='font-awesome'
                        name="map-marker"
                        size={props.sizeIconGo}
                        color={props.colorIconGo}
                      />
                    }
                    iconRight
                    buttonStyle={props.styleBtn}
                  />
                  <Input 
                    label='Titre'
                    placeholderTextColor='#fcb1ab'
                    placeholder="J'écris.."
                    value={props.valueTitle}
                    onChangeText={props.onChangeTextBtntitle}
                    style={props.stylesInput}
                  />
                  <Input 
                    label='Description'
                    placeholderTextColor='#fcb1ab'
                    placeholder="J'écris.."
                    value={props.valueDesc}
                    onChangeText={props.onChangeTextBtnDesc}
                    style={props.stylesInput}
                  />
                
                  <Button 
                    title="Annuler  "
                    onPress={props.onPressBtnAnnuler}
                    buttonStyle={props.styleBtn}
                    type='outline' 
                    titleStyle={{
                      fontWeight: "bold",
                      color:'#ea3a3a',
                      fontSize:15,
                    }}
                />
            </View>
       </Overlay>
    )
}

