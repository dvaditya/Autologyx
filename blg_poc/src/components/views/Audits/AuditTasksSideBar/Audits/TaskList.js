import React from 'react';
import taskListStyles from './taskList.styles';
import TaskItem from './TaskItem';
import { date, file } from 'utils';

const TaskList = ({auditId, tasks, children }) => {
    const classes = taskListStyles();
    return (
        <div className={classes.root}>
            <ul className={classes.ul}>
                {tasks.map(task => {
                    return (
                        <TaskItem 
                            auditId={auditId}
                            task={task}
                            key={task.id}
                        />
                    );
                })}
                {
                    children
                }
            </ul>
        </div>
    );
};


export default TaskList;