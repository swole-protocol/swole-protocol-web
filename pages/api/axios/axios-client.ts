import axios from "axios";

export const fetch = async (url: string) => {
    axios.get(url)
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            console.log(`[Unable to fetch from ${url}], error=${error}`)
        })
}

export const post = async (url: string, jsonBody: string) => {
    return axios
    .post(url, jsonBody, {
        headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
        }
    })
    .then(function (response) {
        return response.data["IpfsHash"];
    })
    .catch(function (error) {
        console.log(`[error communicating with service] ${error}`);
    });
}