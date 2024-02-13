import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL, TASK_DETAILS_REQUEST, TASK_DETAILS_SUCCESS, TASK_DETAILS_FAIL,
TASK_ADD_REQUEST,TASK_ADD_SUCCESS,TASK_ADD_FAIL,TASK_DELETE_REQUEST,TASK_DELETE_SUCCESS,TASK_DELETE_FAIL} from "../constants/taskConstants";


export const taskListReducers = (state = {tasks:[]}, action) => {
    switch(action.type){
        case TASK_LIST_REQUEST:
            return {loading:true, tasks:[]}
        case TASK_LIST_SUCCESS:
            return {loading:false, tasks:action.payload}
        case TASK_LIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const taskDetailsReducers = (state = {task:[]}, action) => {
    switch(action.type){
        case TASK_DETAILS_REQUEST:
            return {loading:true, ...state}
        case TASK_DETAILS_SUCCESS:
            return {loading:false, task:action.payload}
        case TASK_DETAILS_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const taskCreateReducers = (state = {task:[]}, action) => {
    switch(action.type){
        case TASK_ADD_REQUEST:
            return {loading:true, ...state}
        case TASK_ADD_SUCCESS:
            return {loading:false, task:action.payload}
        case TASK_ADD_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const taskDeleteReducers = (state = {task:[]}, action) => {
    switch(action.type){
        case TASK_DELETE_REQUEST:
            return {loading:true, ...state}
        case TASK_DELETE_SUCCESS:
            return {loading:false, task:action.payload}
        case TASK_DELETE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}