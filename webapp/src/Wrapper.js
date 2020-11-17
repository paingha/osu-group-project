import React from "react"
import Router from './Router';
import { Provider } from "react-redux";
import { prepareStore } from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";

const Wrapper=(props)=>{
    const store = prepareStore({});
    return(
        <ChakraProvider>
            <Provider store={store}>
                <Router />
            </Provider>
        </ChakraProvider>
    )
}

export default Wrapper;