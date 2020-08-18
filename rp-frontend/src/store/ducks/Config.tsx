// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction } from "redux"

const CONFIG_SET_IP_ADDR = "config/SET_IP_ADRRESS"
export const setIpAddr = (ipAddr: string) => {
    return {
        type: CONFIG_SET_IP_ADDR,
        payload: ipAddr
    }
}




interface Config{
    ipAddress: string,
}

const initialState: Config = {
    ipAddress: ""
}

export const ConfigActions = {
    CONFIG_SET_IP_ADDR
}

export const ConfigReducer = (state: Config = initialState, action:AnyAction = {type: ""}) => {
    switch(action.type){
        case CONFIG_SET_IP_ADDR:
            return {...state, ipAddress: action.payload}
        default:
            return state
    }
}