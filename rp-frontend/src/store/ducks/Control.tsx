// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction} from "redux"

const CONTROL_SET_SELECTED_PIN = "control/SET_SELECTED_PIN"
export const controlSelectedPin = (pin: number) => {
    return {
        type: CONTROL_SET_SELECTED_PIN,
        payload: pin
    }
}

interface Control{
    selectedPin: number,
}

const initialState: Control = {
    selectedPin: 0,
}

export const ControlActions = {
    CONTROL_SET_SELECTED_PIN
}

export const ControlReducer = (state: Control = initialState, action: AnyAction = {type: ""}) => {
    switch(action.type){
        case CONTROL_SET_SELECTED_PIN:
            return {...state, selectedPin: action.payload}
        default:
            return state
    }
}