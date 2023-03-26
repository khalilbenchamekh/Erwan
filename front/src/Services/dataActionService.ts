import Environment from "../Env/Environment";

export function getApiDataAction() {
    return fetch(Environment.apiUrlDataAction, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

