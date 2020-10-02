export default function(listPOI = [], action){

 if(action.type === "addInPoiList"){
    let isDoublon = false
    let listPOICopy = [...listPOI]

        if(listPOI.length>0){
            for(var i = 0 ; i< listPOICopy.length; i++){
                console.log('here',listPOICopy[i].title, action.infosPOI.title)

                if(listPOICopy[i].title === action.infosPOI.title){
                    console.log('DOUBLON')
                    isDoublon = true
                }else{
                    listPOICopy = [...listPOI, action.infosPOI]
                }
            }
                return listPOICopy
    } if(!isDoublon ){
            listPOICopy = [...listPOI, action.infosPOI]
    }
    return listPOICopy

    } else if (action.type=== 'pinDeleted'){
     console.log('DELETE')
    let listPOICopy = listPOI.filter(pin => pin.title !== action.title)
    return listPOICopy
 } else {
     return listPOI
 }
}