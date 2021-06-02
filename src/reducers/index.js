import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const initlState = [
    {
        id: null,
        username: null,
        email: null,
        text: null,
        status: null
    }
]

const tasks = (state = null, action) => {
    switch (action.type) {
        case 'SET_TASKS': {
            return action.payload.tasks
        }
        default:
            return state

    }
}


const totalCountTasks = (state = null, action) => {
    switch (action.type) {
        case 'SET_TOTAL_COUNT_TASKS':
            return Number(action.payload.num)
        default:
            return state
    }
}

const message = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload.message
        default:
            return state
    }
}


const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'IS_FETCHING': {
            return action.payload.isFetching
        }
        default:
            return state
    }
}

const initStateAut = {token: null, isAuth: false}

const authentication = (state = initStateAut, action) => {
    switch (action.type) {
        case 'SET_AUTH_DATA':
            return action.payload.authData
        default:
            return state
    }
}

/*
const weatherCityGeneralData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_WEATHER_CITY_GENERAL_DATA': {
            return action.payload.weatherCityGeneralData
        }
        default:
            return state
    }
}
*/
export default combineReducers({
    tasks,
    totalCountTasks,
    form: formReducer,
    message,
    isFetching,
    authentication
    
});