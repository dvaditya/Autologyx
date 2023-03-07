import React from 'react';
import correspondanceItemStyles from './auditItem.styles';
import { useHistory } from 'react-router-dom';

const AuditItem = ({clientId, clientAudit }) => {
  const history = useHistory()
  const classes = correspondanceItemStyles();
  let color
  const onClickHandler = () => {
    history.push(`/management/client?id=${clientId}&auditId=${clientAudit.id}`);
    
  };

  if (clientAudit.field_audit_status === 'Completed') {
    color = 'rgb(150, 247, 162)';
  }

  if (clientAudit.field_audit_status === 'In Progress') {
    color = 'rgb(245, 200, 100)';
  }


  return (
    <div className={classes.root} onClick={() => onClickHandler()} style={{ background: color }}>
      <div>
        <div className={classes.title}>{`Audit Year: ${clientAudit.field_audit_year}`}
      </div>
      </div>
      <div className={classes.task_status}>{clientAudit.field_audit_status}</div>
    </div>
  );
};

export default AuditItem;
