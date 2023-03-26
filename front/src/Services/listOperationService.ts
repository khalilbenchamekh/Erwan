import Environment from "../Env/Environment";

export function getListOperation() {
    return fetch(Environment.apiUrlDataUser, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}