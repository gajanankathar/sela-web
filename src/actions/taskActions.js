import axios from "axios";

import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL,
    TASK_ADD_REQUEST,
    TASK_ADD_SUCCESS,
    TASK_ADD_FAIL,
    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_FAIL,
} from "../constants/taskConstants";

import { BASE_URL } from "../constants";

const client = axios.create({
  baseURL: BASE_URL,
});

export const listTasks = () => async (dispatch) => {
    try {
        dispatch({type: TASK_LIST_REQUEST})
        const { data } = await client.get(`/api/tasks/`);
        dispatch({
            type:TASK_LIST_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:TASK_LIST_FAIL,
            payload:error.response && error.response.data.detail ? error.response.data.detail
            : error.message,
        })
    }
}

export const listTaskDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: TASK_DETAILS_REQUEST})
        const { data } = await client.get(`/api/tasks/${id}`);

        dispatch({
            type: TASK_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: TASK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail
            : error.message,
        })
    }
}

export const createTask = (data) => async (dispatch) => {
    console.log("Inside action dispatch and data", dispatch, data);
    try {
        dispatch({type: TASK_ADD_REQUEST})
        const response = await client.post(`/api/tasks/`, data);
        dispatch({
            type: TASK_ADD_SUCCESS,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: TASK_ADD_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        dispatch({type: TASK_DELETE_REQUEST})
        const { data } = await client.delete(`/api/tasks/${id}`);

        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateTask = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: TASK_UPDATE_REQUEST })
        const { data } = await client.put(`/api/tasks/${id}/`, payload);

        dispatch({
            type: TASK_UPDATE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}
