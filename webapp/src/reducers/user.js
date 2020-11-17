const init = {
    token: null,
    error:  null,
    isFetching:  false,
    data:  null
}

export default function user(state = init, action){
    if(typeof state === "undefined"){
        return {
            data: undefined,
            token: undefined,
            error: undefined,
            isFetching: undefined
        }
    }

    switch(action.type){
        case "REQUEST_LOGIN":
            return {
                ...state,
                isFetching: true
            }
        case "RECEIVE_LOGIN":
            return {
                ...state,
                data: action.data.user,
                token: action.data.token,
                isFetching: false
            }
        case "ERROR_LOGIN":
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state
    }
}