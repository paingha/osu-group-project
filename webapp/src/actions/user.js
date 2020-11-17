export function requestLogin(){
    return {
        type: "REQUEST_LOGIN"
    }
}

export function receiveLogin(data){
    return {
        type: "RECEIVE_LOGIN",
        data
    }
}

export function errorLogin(error){
    return {
        type: "ERROR_LOGIN",
        error
    }
}

export function clearError(){
    return {
        type: "CLEAR_ERROR"
    }
}
