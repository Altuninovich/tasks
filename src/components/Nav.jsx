import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../actions/index';
import Login from './Login';

const mapStateToProps = (state) => ({
  authentication: state.authentication
})

const actionCreators = {
  logautThunk: actions.logautThunk,
  setError: actions.setError,
}

const Navibar = (props) => {
  const { authentication: { isAuth }, logautThunk, setError } = props
  const [inputMode, setInputMode] = useState(false)

  useEffect(() => { }, [])

  const handleClick = (e) => {
    if (e.target.innerText === 'Выход') {
      logautThunk()
    }
    setInputMode(!inputMode)
    setError(null)
  }

  return (
    <div className='about_nav'>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <NavLink style={{ textDecoration: 'none', color: 'grey' }} to="/">Список задач</NavLink>
          <NavLink style={{ textDecoration: 'none', color: 'grey', marginLeft: '10px' }} to="/create">Создать задачу</NavLink>
        </Nav>
        <Nav.Link onClick={handleClick}>{isAuth ? 'Выход' : 'Вход'}</Nav.Link>
      </Navbar>
      {inputMode && !isAuth ? <Login /> : null}
    </div>
  )
}

export default connect(mapStateToProps, actionCreators)(Navibar)