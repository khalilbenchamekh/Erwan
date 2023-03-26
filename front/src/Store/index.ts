import {createStore ,applyMiddleware,compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "src/Saga";
import  users  from "../Reducers";

const sagaMiddleware = createSagaMiddleware();
const store = compose(
    applyMiddleware(sagaMiddleware),
   
  )(createStore)(users);



sagaMiddleware.run(rootSaga);

export default store;