// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction} from "redux"

const BOARD_SET_BOARD = "config/SET_BOARD"
export const boardSetPins = (numPins: number) => {
    return {
        type: BOARD_SET_BOARD,
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



interface Config{
    numPins: number,
    names: Array<string>,
    labels: Array<string>

}

const initialState: Config = {
    numPins: 0,
    names: [] as string[],
    labels: [] as string[]
}

export const BoardReducer = (state: Config = initialState, action:AnyAction = {type: ""}) => {
    switch(action.type){
        case BOARD_SET_BOARD:
            if(action.payload === -1){
                return {...state, names: [], labels: [], numPins: action.payload}
            }
            return {...state, names: Array(action.payload).fill(""), labels: Array(action.payload).fill(""), numPins: action.payload}
        case BOARD_SET_NAME:
            const newName = state.names
            newName[action.payload.key] = action.payload.value
            return{...state, names: newName}
        case BOARD_SET_LABEL:
            const newLabel = state.labels
            newLabel[action.payload.key] = action.payload.value
            return{...state, labels: newLabel}
        default:
            return state
    }
}