import {
    controlSelectedPin,

    ControlActions
} from "store/ducks/Control"

describe('Test Actions Generated Correctly', () => {
    it('Should Create Set Number of Pins', () =>{
        const selectedPin = 0
        const testAction = {
            type: ControlActions.CONTROL_SET_SELECTED_PIN,
            payload: selectedPin
        }

        expect(controlSelectedPin(selectedPin)).toEqual(testAction)
    })
})