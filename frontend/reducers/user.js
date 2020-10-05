export default function(user = '', action){
    if(action.type === 'userSaving'){
        return action.user
    } else {
        return user
    }
}