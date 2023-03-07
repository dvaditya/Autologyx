import React from 'react';
import correspondanceItemStyles from './auditItem.styles';
import { date } from 'utils';
import { useHistory } from 'react-router';

const TaskItem = ({ auditId, task }) => {
  const history = useHistory()
  const classes = correspondanceItemStyles();
  let color
  const onClickHandler = () => {
    history.push(`/management/audit/${auditId}/module/${task.id}`);
  };

  if (task.field_module_status === 'Completed') {
    color = 'rgb(150, 247, 162)';
  }

  if (task.field_module_status === 'In Progress') {
    color = 'rgb(245, 200, 100)';
  }

  return (
    <div className={classes.root} onClick={() => onClickHandler()} style={{ background: color }}>
      <div>
        <div className={classes.title}>{`Module Name: ${task.field_audit_module_name}`}
      </div>
      </div>
      <div className={classes.task_status}>{task.field_module_status}</div>
    </div>
  );
};

export default TaskItem;
