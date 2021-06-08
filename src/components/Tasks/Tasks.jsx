import React, { useEffect, useState } from 'react';
import './module.tasks.css';
import Paginator from '../Paginator/Paginator';
import * as actions from '../../actions/index';
import { connect } from "react-redux";
import { Task } from '../Task/Task';
import s from './MenuSort.module.css';
import cn from "classnames";

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    totalCountTasks: state.totalCountTasks,
    authentication: state.authentication,
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    currentPagePaginator: state.currentPagePaginator
})

const actionCreators = {
    getTasksThunk: actions.getTasksThunk,
    getTasksByPageNumberEndFilterThunk: actions.getTasksByPageNumberEndFilterThunk,
    editingTaskThunk: actions.editingTaskThunk,
    setError: actions.setError,
    setSuccessMessage: actions.setSuccessMessage,
    setCurrentPagePaginator: actions.setCurrentPagePaginator
}

const Tasks = (props) => {

    const { tasks,
        getTasksThunk,
        getTasksByPageNumberEndFilterThunk,
        totalCountTasks,
        editingTaskThunk,
        authentication,
        isFetching,
        setError,
        setSuccessMessage,
        errorMessage,
        successMessage,
        currentPagePaginator,
        setCurrentPagePaginator

    } = props

    const [tasksFilteringMode, setTasksFilteringMode] = useState('общие')

    const handleClickFilter = ({ target: { outerText } }) => {
        setTasksFilteringMode(outerText)
        setCurrentPagePaginator(1)
        getTasksByPageNumberEndFilterThunk(null, outerText)
    }

    useEffect(() => getTasksThunk(), [])

    const btnClassTotal = cn({
        [s.sortTotal]: true,
        [s.sortActive]: tasksFilteringMode === 'общие',
    })
    const btnClassName = cn({
        [s.sortTotal]: true,
        [s.sortActive]: tasksFilteringMode === 'по имени',
    })
    const btnClassTotalEmail = cn({
        [s.sortTotal]: true,
        [s.sortActive]: tasksFilteringMode === 'по @email',
    })
    const btnClassTotalStatus = cn({
        [s.sortTotal]: true,
        [s.sortActive]: tasksFilteringMode === 'по статусу',
    })

    return (
        <div className='about_tasks'>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div className='header'>
                <div className="header_name">ЗАДАЧИ</div>
                <div className="header_sortTotal"><div className={btnClassTotal} onClick={handleClickFilter}>общие</div></div>
                <div className="header_sortName"><div className={btnClassName} onClick={handleClickFilter}>по имени</div></div>
                <div className="header_sortEmail"><div className={btnClassTotalEmail} onClick={handleClickFilter}>по @email</div></div>
                <div className="header_sortStatus"><div className={btnClassTotalStatus} onClick={handleClickFilter}>по статусу</div></div>
            </div>
            <div className='tasks'>
                <div className='tasks_paginator'>
                    <Paginator
                        currentPage={1}
                        numberPages={totalCountTasks}
                        getTasksByPageNumberEndFilterThunk={getTasksByPageNumberEndFilterThunk}
                        tasksFilteringMode={tasksFilteringMode}
                        setCurrentPagePaginator={setCurrentPagePaginator}
                        currentPagePaginator={currentPagePaginator}
                    />
                </div>
                <div className='tasks_list'>
                    {tasks && tasks.map((t) =>
                        <Task key={t.id} t={t}
                            editingTaskThunk={editingTaskThunk}
                            authentication={authentication}
                            isFetching={isFetching}
                            setError={setError}
                            setSuccessMessage={setSuccessMessage}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                        />)}
                </div>
            </div>
        </div>

    )
}

export default connect(mapStateToProps, actionCreators)(Tasks)