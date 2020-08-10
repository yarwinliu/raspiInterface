// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction, Dispatch} from "redux"
import {
    boardSetPins
} from "store/ducks"

const CONFIG_SET_IP_ADDR = "config/SET_IP_ADRRESS"
export const setIpAddr = (ipAddr: string) => {
    return {
        type: CONFIG_SET_IP_ADDR,
        payload: ipAddr
    }
}


// Thunks
export const setUpForIp = (url: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setIpAddr(url))
        return fetch(url + "api_request/get_pins/")
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                dispatch(boardSetPins(Object.keys(json).length))
                console.log(json, json.length)
            })
            .catch((err) => {
                console.log(err)
                dispatch(boardSetPins(-1)) // ERR CODE
            })
    }
}

interface Config{
    ipAddress: string,

}

const initialState: Config = {
    ipAddress: ""
}

export const ConfigReducer = (state: Config = initialState, action:AnyAction = {type: ""}) => {
    switch(action.type){
        case CONFIG_SET_IP_ADDR:
            return {...state, ipAddress: action.payload}
        default:
            return state
    }
}