// THIS IS A TEMPORARY DEMO ONLY VERSION OF COMMUNICATING WITH THE FRONT END, WILL REPLACE WITH REDUX STORES AND THUNK

export const getElements = async () => {
    const response = await fetch('http://192.168.0.25:8000/api_request/get_pins/', {
        method: "GET"
    })
    const json = response.json()

    return json
}

export const toggleElement = async (pinName: any) => {
    const response = await fetch('http://192.168.0.25:8000/api_request/' + pinName + '/toggle', {
        method: "GET"
    })
    return response.json()
}