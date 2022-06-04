import axios from "axios";

let config = {
    headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
    }
}

export const fetch = async (url: string) => {
    axios.get(url)
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            console.log(`[Unable to fetch from ${url}], error=${error}`)
        })
}