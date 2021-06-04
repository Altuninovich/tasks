import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

const mapStateToProps = (state) => ({
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
    authentication: state.authentication
})

const actionCreators = {
    createTaskThunk: actions.createTaskThunk,
    setError: actions.setError,
    authenticationThunk: actions.authenticationThunk
}

const Login = (props) => {
    const { authentication: { isAuth }, authenticationThunk, errorMessage, setError } = props
    const [login, setLogin] = useState(null)
    const [parol, setParol] = useState(null)
    const [inputMode, setInputMode] = useState(false)
    console.log(errorMessage)
    const handleSubmit = () => {
        const form = { username: login, password: parol }
        authenticationThunk(form)
    }

    const handleChangeLogin = (e) => {
        setLogin(e.target.value)
        setError(null)
    }
    const handleChangeParol = (e) => {
        setParol(e.target.value)
        setError(null)
    }

    return (
        <div>
            <input placeholder='login' value={login} onChange={handleChangeLogin} type='text' />
            <input placeholder='parol' value={parol} onChange={handleChangeParol} type='text' />
            <submit onClick={handleSubmit}>войти</submit>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    )
}

export default connect(mapStateToProps, actionCreators)(Login)