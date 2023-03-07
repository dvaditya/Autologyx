import React from 'react';
import audtitsStyles from './auditList.styles';
import AuditItem from './AudtitItem';
import { date, file } from 'utils';

const AuditList = ({clientId, clientAudits }) => {
    const classes = audtitsStyles();
    return (
        <div className={classes.root}>
            <ul className={classes.ul}>
                {clientAudits.map(clientAudit => {
                    return (
                        <AuditItem
                            clientId={clientId}
                            clientAudit={clientAudit}
                            key={clientAudit.field_uuid}
                        />
                    );
                })}
            </ul>
        </div>
    );
};


export default AuditList;