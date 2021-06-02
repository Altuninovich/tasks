import React from 'react';
import s from './Task.module.css';




export const Task = ({ t }) => {
    const statusTask = {
        0: 'задача не выполнена',
        1: 'задача не выполнена, отредактирована админом',
        10: 'задача выполнена',
        11: 'задача отредактирована админом и выполнена'
    }
    return (
        <div>
            <div className={s.task}>
                <div className={s.task_name}>{t.username}</div>
                <div className={s.task_email}>{t.email}</div>
                <div className={s.task_status}>{statusTask[t.status]}</div>
                <div className={s.task_id}>{t.id}</div>
                <div className={s.task_text}>{t.text}</div>
                <div className={s.task_edit}>редактировать</div>
                <div className={s.task_changeStatus}>сменить статус</div>
            </div>
        </div>
    )
}