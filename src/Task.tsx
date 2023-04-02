import React, {ChangeEvent, memo} from 'react';
import {TaskType} from './Todolist';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(({
                                                  task,
                                                  changeTaskStatus,
                                                  changeTaskTitle,
                                                  removeTask,
                                              }) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }
    console.log('task')
    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})
