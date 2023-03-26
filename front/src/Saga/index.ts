import { all } from 'redux-saga/effects'
import userSage from "./userSage";


function* rootSaga(){
    yield all(
        [
           userSage()
        ]
    )
}

export default rootSaga;