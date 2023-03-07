import React from 'react';
import taskStyles from './task.styles';
import dateFormatter from 'functions/dateFormatter';
import { getDate } from '../../../utils/date';

const Task = ({ task, setCurrentTask, setOpen }) => {
  const classes = taskStyles();
  let color;

  //console.log('task', task)

  const onClickHandler = () => {
    setCurrentTask(task);
    if(task.field_name !== "Email Audit Document To Client" && task.field_name !== "Audit Document" && task.field_name !== "Review Audit Report" && task.field_name !== 'Client Document Upload') {
      setOpen(true);
    }
  };

  if (task.field_task_status === 'Completed') {
    color = 'rgb(150, 247, 162)';
  }

  if (task.field_task_status === 'Open') {
    color = '#ecf0f5';
  }

  if (task.field_task_status === 'In Progress') {
    color = 'rgb(245, 200, 100)';
  }

  return (
    <div
      className={classes.root}
      style={{ background: color }}
      onClick={() => onClickHandler()}
    >
      <div>
        <div className={classes.title}>
          {task.field_name}
        </div>
        {task && task.field_last_updated ? (
          <div>Last Updated: {getDate(task.field_last_updated, false, 'DD')}</div>
        ) : 
        null
        }
      </div>
      <div>
        <div>{task.field_assignee}</div>
        <div className={classes.field_task_status}>{task.field_task_status}</div>
      </div>
    </div>
  );
};

Task.defaultProps = {
  setCurrentTask: () => null
}

export default Task;
