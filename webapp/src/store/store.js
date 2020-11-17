import { createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/index";
import thunkMiddleware from "redux-thunk";

export function prepareStore(init){
    return createStore(rootReducer, init, applyMiddleware(thunkMiddleware))
}