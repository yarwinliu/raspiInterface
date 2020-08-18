import {
    boardSetPins,
    boardSetNamePin,
    boardSetLabelPin,
    boardSetNameStatus,

    BoardActions
} from "store/ducks/Board"

describe('Test Actions Generated Correctly', () => {
    it('Should Create Set Number of Pins', () =>{
        const pinNumber = 4
        const testAction = {
            type: BoardActions.BOARD_SET_BOARD_PINS,
            payload: pinNumber
        }

        expect(boardSetPins(pinNumber)).toEqual(testAction)
    })

    it('Should Create Set Number of Pins', () =>{
        const pinNumber = 0
        const pinName = "TEST"
        const testAction = {
            type: BoardActions.BOARD_SET_NAME,
            payload: {
                key: pinNumber,
                value: pinName
            }
        }

        expect(boardSetNamePin(pinNumber, pinName)).toEqual(testAction)
    })
})