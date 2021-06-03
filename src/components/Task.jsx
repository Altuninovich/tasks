import React, { useState } from 'react';
import s from './Task.module.css';
import { Button } from 'react-bootstrap'
import { DropdownsList } from './Dropdowns';


export const Task = ({ t, editingTaskThunk, authentication: { token, isAuth } }) => {
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

    const handleClick = () => {
        setId(t.id)
        setNewText(t.text)
        setDropdownValue(status)
        setEditMode(!editMode)
    }

    const submitСhanges = () => {
        const modifiedTask = {
            token: token,
            text: newText,
            status: newTaskStatus,
            id: id,
        }
        editingTaskThunk(modifiedTask)
    }

    return (
        <div>
            <div className={s.task}>
                <div className={s.task_name}>{t.username}</div>
                <div className={s.task_email}>{t.email}</div>
                <div className={s.task_status}>
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
                        {isAuth && <Button onClick={handleClick} variant="secondary">edit</Button>}{' '}
                        {editMode && <Button onClick={submitСhanges} variant="info">Ok</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

//{isAuth && <div className={s.task_edit}>     </div></div>onClick={() => setEditMode(!editMode)}
//</div>onClick={() => setEditMode(!editMode)}
// {isAuth && <div className={s.task_edit}><div/>}