import { Dispatch } from "redux"

import {
    boardSetPins,
    setIpAddr
} from "store/ducks"
import { boardSetNamePin, boardSetNameStatus } from "./Board"

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
                for(let i in Object.keys(json)){
                    console.log(Number(i)   , Object.keys(json)[i], json[Object.keys(json)[i]])
                    dispatch(boardSetNamePin(Number(i), Object.keys(json)[i]))
                    dispatch(boardSetNameStatus(Number(i), json[Object.keys(json)[i]].state))
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(boardSetPins(0)) // ERR CODE
            })
    }
}

export const togglePin = (url: string, pinNo: number) => {
    return (dispatch: Dispatch) => {
        return fetch(url + "api_request/" + pinNo + "/toggle")
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                dispatch(boardSetPins(Object.keys(json).length))
                for(let i in Object.keys(json)){
                    dispatch(boardSetNamePin(Number(i), Object.keys(json)[i]))
                    dispatch(boardSetNameStatus(Number(i), json[Object.keys(json)[i]].state))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}