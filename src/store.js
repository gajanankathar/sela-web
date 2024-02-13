import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { taskDetailsReducers, taskListReducers, taskCreateReducers } from './reducers/taskReducers';


const reducer = combineReducers({
    taskList: taskListReducers,
    taskDetails: taskDetailsReducers,
    taskCreate: taskCreateReducers,
})

const initialState={}
const middleware=[thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store;