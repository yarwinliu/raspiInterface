    global.fetch = require("node-fetch");

async function run() {
    const response = await fetch("https://www.google.com")
    console.log(response, "TEST")
}

run()