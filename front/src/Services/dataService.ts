import Environment from "../Env/Environment";

export function getApi() {
    return fetch(Environment.apiUrlData, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

