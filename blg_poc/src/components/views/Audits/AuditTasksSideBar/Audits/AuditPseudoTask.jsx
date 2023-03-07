import React from 'react';
import correspondanceItemStyles from './auditItem.styles';
import { date } from 'utils';
import { useHistory } from 'react-router';

const AuditPseudoTask = ({ title, handleClick, status }) => {
  const classes = correspondanceItemStyles();
  let color
  if (status === 'Completed') {
    color = 'rgb(150, 247, 162)';
  }

  if (status === 'In Progress') {
    color = 'rgb(245, 200, 100)';
  }

  return (
    <div className={classes.root} onClick={handleClick} style={{ background: color }}>
      <div>
        <div className={classes.title}>{`Module Name: ${title}`}
      </div>
      </div>
      <div className={classes.task_status}>{status}</div>
    </div>
  );
};

export default AuditPseudoTask;
