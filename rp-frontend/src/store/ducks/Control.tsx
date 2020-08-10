// store/ducks/config.tsx -- This reducer is meant to store the configurations of each session (IP address/URL of the backend server, things like that, etc.)
import {AnyAction} from "redux"

interface Config{
}

const initialState: Config = {
}

export const ConfigReducer = (state: Config = initialState, action: AnyAction = {type: ""}) => {
    switch(action.type){
        default:
            return state
    }
}