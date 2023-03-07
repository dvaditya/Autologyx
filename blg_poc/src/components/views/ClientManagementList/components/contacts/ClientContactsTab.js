import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import modalStyles from './Modal.styles';
import { useSelector, useDispatch } from "react-redux"
import { getClientContacts, clearClientContacts } from "store/actions/clientContactActions"
import ClientContactsList from "./ClientContactsList"
import NewContact from './NewContact';
import { getAuditByUUID } from 'api/audits.api';

const R = require("ramda")

export default ({ currentClient }) => {
  const clientContacts = useSelector((state => state.clientContacts))
  const client = useSelector((state) => state.matters.currentMatter)
  const dispatch = useDispatch()
  const classes = modalStyles();
  
  const [isActiveAudit, setIsActiveAudit] = useState(false)

  useEffect(() => {
    if (client) {
      dispatch(getClientContacts(client.field_client_uuid))
    }

  }, [client])

  useEffect( async () => {
    const uuid = clientContacts[0]?.field_audit_uuid
    if (uuid) {
      try {
        const response = await getAuditByUUID(uuid)
        setIsActiveAudit(response?.field_active && response.field_audit_status !== 'Completed')
      } catch (error) {
        console.log(error)
        setIsActiveAudit(false)
      }
    }
  },[clientContacts])

  return (
    client ?
      <div style={{overflowY: 'scroll'}}>
        <div className={classes.header}>{`Contacts for client ${client.field_company_name}`}</div>
        <NewContact client={client} />
        <ClientContactsList contacts={clientContacts} isActiveAudit={isActiveAudit} />
      </div>
      : null
  );
}