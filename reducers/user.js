export default function(user = '', action){
    if(action.type === 'userSaving'){
        console.log(action.user)
        return action.user
    } else {
        return user
    }
}