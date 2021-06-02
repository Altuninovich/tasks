import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Button, Form } from 'react-bootstrap';
import s from './CreateTask.module.css';
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state) => ({
    isFetching: state.isFetching,
    message: state.message
})

const actionCreators = {
    createTaskThunk: actions.createTaskThunk,
    setMessage: actions.setMessage
}





const CreateTask = (props) => {

    const {createTaskThunk, isFetching, message, setMessage} = props
    const [email, setEmail] = useState(null)
    const [username, setName] = useState(null)
    const [text, setText] = useState(null)

    const handleSubmit = () => {
        const form = {username, email, text}
        createTaskThunk(form)
        setText(null)
    }

    useEffect(() => {
        if (!message) {
            return
        }
        if (message.status !== 'ok') {
            const key = Object.keys(message.message)
            const value = Object.values(message.message)
            alert(`${key} ${value}`)
            setMessage(null)
        }
        else {
        setEmail(null)
        setName(null)
        setText(null)
        setMessage(null)
        alert('задача добавлена')
        setMessage(null)
        props.history.push("/tasks")
        }
    }, [message])

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