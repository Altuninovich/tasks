import React, { useState,useEffect } from 'react';
import s from './Task.module.css';
import { Button } from 'react-bootstrap'
import { DropdownsList } from './Dropdowns';
import cn from "classnames";


export const Task = ({
    t,
    editingTaskThunk,
    authentication: { token, isAuth },
    isFetching,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setError,
}) => {
    const statusTask = {
        0: 'задача не выполнена',
        1: 'задача не выполнена, отредактирована админом',
        10: 'задача выполнена',
        11: 'задача отредактирована админом и выполнена'
    }
    const status = statusTask[t.status]
    const [editMode, setEditMode] = useState(false)
    const [newText, setNewText] = useState('')
    const [dropdownValue, setDropdownValue] = useState('')
    const [newTaskStatus, setNewTaskStatus] = useState(null)
    const [id, setId] = useState(null)

    const handleClickEdit = () => {
        setId(t.id)
        setNewText(t.text)
        setDropdownValue(status)
        setEditMode(!editMode)
    }

    const submitСhanges = () => {
        const modifiedTask = {
            token: token,
            text: newText,
            status: newTaskStatus || status,
            id: id,
        }
        editingTaskThunk(modifiedTask)

    }

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage)
            setError(null)
        }
    }, [errorMessage])

    useEffect(() => {
        if (successMessage) {
            setSuccessMessage(null)
            setEditMode(false)
        }
    }, [successMessage])

    const btnClassStatus = cn({
        [s.task_status]: true,
        [s.statusNotCompleted]: t.status === 0 || t.status === 1,
        [s.statusCompleted]: t.status === 10 || t.status === 11,
    })

    return (
        <div>
            <div className={s.task}>
                <div className={s.task_name}>{t.username}</div>
                <div className={s.task_email}>{t.email}</div>
                <div className={btnClassStatus}>
                    {editMode ?
                        <DropdownsList
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue}
                            setNewTaskStatus={setNewTaskStatus}
                        /> : status}
                </div>
                <div className={s.task_id}>{t.id}</div>
                <div className={s.task_text}>
                    {editMode ? <textarea onChange={(e) => setNewText(e.target.value)} value={newText} /> : t.text}
                </div>
                <div className={s.task_edit}>
                    <div className={s.task_buttonGroup}>
                        {isAuth && <Button onClick={handleClickEdit} variant="secondary">edit</Button>}{' '}
                        {editMode && <Button disabled={isFetching} onClick={submitСhanges} variant="info">Ok</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

