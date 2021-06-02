import * as api from "../api/api";

export const togglePreloader = (isFetching) => ({
    type: 'IS_FETCHING',
    payload: {
        isFetching,
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

export const setMessage = (message) => ({
    type: 'SET_MESSAGE',
    payload: {
        message,
    }
})

export const setAuthenticationData = (authData) => ({
    type: 'SET_AUTH_DATA',
    payload: {
        authData,
    }
})

export const authenticationPostThunk = (form) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.authAPI.authenticationPost(form)
    if (response.status === 'ok') {
        localStorage.setItem('token', JSON.stringify({
            token: response.message.token
          }))
        dispatch(setAuthenticationData({token: response.message.token, isAuth: true}))
    }
    else {
        dispatch(setMessage(response))
    }
}

export const getTasksThunk = () => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.tasksAPI.getTasks()
    console.log(response)
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
    /*
    if (response.status !== 'ok') {
        const key = Object.keys(response.message)
        const value = Object.values(response.message)
        dispatch(setMessage(`${key} ${value}`))
        
       dispatch(setMessage(response))
    }
    */
    dispatch(setMessage(response))
        //dispatch(setMessage('задача была добавлена'))
        dispatch(togglePreloader(false))               
}
 
