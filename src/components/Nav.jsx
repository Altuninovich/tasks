import React, { useState } from 'react';
import {Navbar, Nav, Button, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../actions/index';

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  message: state.message,
  authentication: state.authentication
})

const actionCreators = {
  createTaskThunk: actions.createTaskThunk,
  setMessage: actions.setMessage,
  authenticationPostThunk: actions.authenticationPostThunk
}

const Navibar = (props) => {
  const {authentication: {isAuth}, authenticationPostThunk, message} = props
    const [login, setLogin] = useState(null)
    const [parol, setParol] = useState(null)
    const [inputMode, setInputMode] = useState(false)

    const handleSubmit = () => {
      const form = {username: login, password: parol}
      authenticationPostThunk(form)
    }

    return (
        <div className='about_nav'>
              <Navbar bg="light" variant="light">
                <Nav className="mr-auto">
                  <Nav.Link><NavLink style={{ textDecoration: 'none', color: 'grey' }} to="/tasks">Список задач</NavLink></Nav.Link>
                  <Nav.Link><Link style={{ textDecoration: 'none', color: 'grey' }} to="/create">Создать задачу</Link></Nav.Link>
                  <Nav.Link onClick={() => setInputMode(true)}>{isAuth && 'Вход'}</Nav.Link>
                </Nav>
              </Navbar>
              {inputMode &&
              <div>
                <input placeholder='login' value={login} onChange={(e) => setLogin(e.target.value)} type='text'/>
                <input placeholder='parol' value={parol} onChange={(e) => setParol(e.target.value)} type='text'/>
                <submit onClick={handleSubmit}>войти</submit>
              </div>
               }
      </div>
    )
}

export default connect(mapStateToProps, actionCreators)(Navibar)