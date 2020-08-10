import { combineReducers } from "redux";

import { BoardReducer as Board } from "store/ducks/Board"
import { ConfigReducer as Config} from "store/ducks/Config"


export * from "store/ducks/Board"
export * from "store/ducks/Config" 

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    Board,
    Config
})