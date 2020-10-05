export default function(listPOI = [], action){

 if(action.type === "addInPoiList"){
    console.log(listPOI)

    let listPOICopy =  [...listPOI, action.infosPOI]
    return listPOICopy

    } else if (action.type === 'deletePin'){
     console.log('DELETE')
    let listPOICopy = listPOI.filter(pin => pin.title !== action.title)
    return listPOICopy
 } else {
     return listPOI
 }
}