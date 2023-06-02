import React, {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {AppRootStateType} from './state/store';
import {TaskType} from './Todolist';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

export type TaskWithReduxPropsType = {
    taskId: string
    toDoListId: string
}

export const TaskWithRedux: React.FC<TaskWithReduxPropsType> = memo(({taskId, toDoListId}) => {
    const task = useSelector<AppRootStateType, TaskType >(state => state.tasks[toDoListId].filter(t=> t.id === taskId)[0])
    const dispatch = useDispatch()
    const removeTask = () => {
        const action = removeTaskAC(taskId, toDoListId);
        dispatch(action);
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(taskId, e.currentTarget.checked, toDoListId);
        dispatch(action);
    }
    const changeTaskTitle = (newTitle: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, toDoListId);
        dispatch(action);
    }

    return (
        <div className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeStatus}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

