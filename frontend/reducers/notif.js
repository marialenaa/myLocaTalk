export default function Notif( notif = null , action){
    if (action.type === 'resetCount'){
        console.log('RESEEEEEET')
        let notifCopy = notif - 1
        return notifCopy
    } else if (action.type === 'setCount'){
        let notifCopy = notif + 1
        return notifCopy
    } else {
        return notif
    }
} 