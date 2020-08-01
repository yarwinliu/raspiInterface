// THIS IS A TEMPORARY DEMO ONLY VERSION OF COMMUNICATING WITH THE FRONT END, WILL REPLACE WITH REDUX STORES AND THUNK

export const getElements = async () => {
    const request = new Request('http://192.168.0.25:8000/api_request/get_pins/')


    const response = await fetch(request)
    const json = response.json()

    return json
}