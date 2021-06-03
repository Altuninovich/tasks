import * as api from "../api/api";

export const togglePreloader = (isFetching) => ({
    type: 'IS_FETCHING',
    payload: {
        isFetching,
    }
})

export const setSuccessMessage = (message) => ({
    type: 'SET_MESSAGE',
    payload: {
        message,
    }
})

export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    payload: {
        tasks,
    }
})

const setTotalCountTasks = (num) => ({
    type: 'SET_TOTAL_COUNT_TASKS',
    payload: {
        num,
    }
})

export const setError = (errorMessage) => ({
    type: 'SET_ERROR',
    payload: {
        errorMessage,
    }
})

export const setAuthenticationData = (authData) => ({
    type: 'SET_AUTH_DATA',
    payload: {
        authData,
    }
})

export const authenticationThunk = (form) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.authAPI.authentication(form)
    if (response.status === 'ok') {
        localStorage.setItem('token', JSON.stringify({
            token: response.message.token
        }))
        dispatch(setAuthenticationData({ token: response.message.token, isAuth: true }))
    }
    else {
        dispatch(setError(response.message.password))
    }
    dispatch(togglePreloader(false))
}

export const getTasksThunk = () => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.tasksAPI.getTasks()
    dispatch(setTotalCountTasks(response.message.total_task_count))
    dispatch(setTasks(response.message.tasks))
    dispatch(togglePreloader(false))
}

export const getTasksByPageNumberThunk = (num) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.tasksAPI.getTasksByPageNumber(num)
    dispatch(setTasks(response.message.tasks))
    dispatch(togglePreloader(false))
}

export const createTaskThunk = (form) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.tasksAPI.createTask(form)
    if (response.status !== 'ok') {
        const key = Object.keys(response.message)
        const value = Object.values(response.message)
        dispatch(setError(`${key} ${value}`))
    }
    else {
        dispatch(setSuccessMessage(response))
    }
    dispatch(togglePreloader(false))
}
 
export const verifyingAuthFromlocalStorageThunk = () => (dispatch) => {
    const data = JSON.parse(localStorage.getItem('token'))
    if (data && data.token) {
        dispatch(setAuthenticationData({ token: data.token, isAuth: true }))
    }
}

export const logautThunk = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setAuthenticationData({ token: null, isAuth: false }))
}

