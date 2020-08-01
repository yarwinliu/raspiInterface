// THIS IS A TEMPORARY DEMO ONLY VERSION OF COMMUNICATING WITH THE FRONT END, WILL REPLACE WITH REDUX STORES AND THUNK

export const getElements = async () => {
    const response = await fetch('/api_request/get_pins/', {
        method: "GET"
    })
    const json = response.json()

    return json
}