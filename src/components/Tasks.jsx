import React, { useEffect } from 'react';
import { } from 'react-bootstrap';
import './module.tasks.css';
import Paginator from './Paginator';
import * as actions from '../actions/index';
import { connect } from "react-redux";
import { Task } from './Task';

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    totalCountTasks: state.totalCountTasks,
})

const actionCreators = {
    getTasksThunk: actions.getTasksThunk,
    getTasksByPageNumberThunk: actions.getTasksByPageNumberThunk
}



const Tasks = (props) => {

    const { tasks,
        getTasksThunk,
        getTasksByPageNumberThunk,
        totalCountTasks
    } = props

    useEffect(getTasksThunk, [])

    return (
        <div className='about_tasks'>
            <div className='header'>
                <div className="header_nameSort">ОБЩИЕ</div>
                <div className="header_active">активные</div>
                <div className="header_completed">завершенные</div>
                <div className="header_edited">отредактированные</div>
                <div className="header_editedcompleted">отредактированные<br />и завершенные</div>
            </div>
            <div className='tasks'>
                <div className='tasks_paginator'>
                    <Paginator currentPage={1} numberPages={totalCountTasks} getTasksByPageNumberThunk={getTasksByPageNumberThunk} />
                </div>
                <div className='tasks_list'>
                    {tasks && tasks.map((t) => <Task t={t} />)}
                </div>
            </div>
        </div>

    )
}

export default connect(mapStateToProps, actionCreators)(Tasks)