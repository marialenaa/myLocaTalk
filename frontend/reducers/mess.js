export default function Mess( listMess = [] , action){
if (action.type === 'listMess'){
        let listMessCopy = [...listMess, {mess: action.message.mess, pseudo :action.message.pseudo}]
        console.log('copyREDUCER',listMessCopy )
        return listMessCopy
    } else {
        return listMess
    }
} 