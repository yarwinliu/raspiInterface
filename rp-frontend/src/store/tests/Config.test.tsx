import {
    setIpAddr,

    ConfigActions
} from "store/ducks/Config"

describe('Test Actions Generated Correctly', () => {
    it('Should Create Set Number of Pins', () =>{
        const ipAddr = "127.0.0.1"
        const testAction = {
            type: ConfigActions.CONFIG_SET_IP_ADDR,
            payload: ipAddr
        }

        expect(setIpAddr(ipAddr)).toEqual(testAction)
    })
})