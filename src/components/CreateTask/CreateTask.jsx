import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Button, Form } from 'react-bootstrap';
import s from './CreateTask.module.css';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => ({
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage
})

const actionCreators = {
    createTaskThunk: actions.createTaskThunk,
    setError: actions.setError,
    setSuccessMessage: actions.setSuccessMessage,
}


const CreateTask = (props) => {

    const { createTaskThunk, isFetching, errorMessage, setError, successMessage, setSuccessMessage } = props
    const [email, setEmail] = useState('')
    const [username, setName] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = () => {
        const form = { username, email, text }
        createTaskThunk(form)
    }

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage)
            setError(null)
        }
    }, [errorMessage])

    useEffect(() => {
        if (successMessage) {
            setEmail('')
            setName('')
            setText('')
            alert(`${successMessage.message.username} ваша задача добавлена`)
            setSuccessMessage(null)
            props.history.push("/")
        }
    }, [successMessage])

    return (
        <div className={s.wrapper}>
            <div className='container'>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Введите email</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="@email" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Введите имя</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} value={username} ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label></Form.Label>
                        <Form.Control onChange={(e) => setText(e.target.value)} value={text} as="textarea" rows={4} />
                    </Form.Group>
                </Form>
            </div>
            <div className={s.submitForm}>
                <button disabled={isFetching} onClick={handleSubmit}>ОТПРАВИТЬ</button>
            </div>
        </div>
    )
}


const WithUrlCreateTask = withRouter(CreateTask)
export default connect(mapStateToProps, actionCreators)(WithUrlCreateTask);