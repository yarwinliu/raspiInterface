// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction} from "redux"

const BOARD_SET_BOARD_PINS = "config/SET_BOARD_PINS"
export const boardSetPins = (numPins: number) => {
    return {
        type: BOARD_SET_BOARD_PINS,
        payload: numPins
    }
}

const BOARD_SET_NAME = "config/SET_NAME"
export const boardSetNamePin = (numPin: number, name: string) => {
    return {
        type: BOARD_SET_NAME,
        payload: {
            key: numPin,
            value: name
        }
    }
}

const BOARD_SET_LABEL = "config/SET_LABEL"
export const boardSetLabelPin = (numPin: number, label: string) => {
    return {
        type: BOARD_SET_LABEL,
        payload: {
            key: numPin,
            value: label
        }
    }
}

const BOARD_SET_STATUS = "config/SET_STATUS"
export const boardSetNameStatus = (numPin: number, status: boolean) => {
    return {
        type: BOARD_SET_STATUS,
        payload: {
            key: numPin,
            value: status
        }
    }
}




interface Config{
    numPins: number,
    names: Array<string>,
    labels: Array<string>,

    statuses: Array<number>,


}

const initialState: Config = {
    numPins: 0,
    names: [] as string[],
    labels: [] as string[],

    statuses: [] as number[],

}

export const BoardActions = {
    BOARD_SET_BOARD_PINS,
    BOARD_SET_NAME,
    BOARD_SET_LABEL,
    BOARD_SET_STATUS,
}

export const BoardReducer = (state: Config = initialState, action:AnyAction = {type: ""}) => {
    switch(action.type){
        case BOARD_SET_BOARD_PINS:
            if(action.payload === 0){
                return {...state, names: [], labels: [], statuses: [], numPins: action.payload}
            }
            return {...state, names: Array(action.payload).fill("UNSET"), labels: Array(action.payload).fill("UNSET"), statuses: Array(action.payload).fill(0), numPins: action.payload}
        case BOARD_SET_NAME:
            const newName = state.names
            newName[action.payload.key] = action.payload.value
            return{...state, names: newName}
        case BOARD_SET_LABEL:
            const newLabel = state.labels
            newLabel[action.payload.key] = action.payload.value
            return{...state, labels: newLabel}
        case BOARD_SET_STATUS:
            const newStatus = state.statuses
            newStatus[action.payload.key] = action.payload.value
            return{...state, statuses: newStatus}
        default:
            return state
    }
}