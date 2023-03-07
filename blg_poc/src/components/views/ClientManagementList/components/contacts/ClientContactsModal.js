import React, { useEffect } from 'react';
import Modal from 'react-modal';
import modalStyles from './Modal.styles';
import {useSelector, useDispatch} from "react-redux"
import {getClientContacts, clearClientContacts} from "store/actions/clientContactActions"
import ClientContactsList from "./ClientContactsList"
import NewContact from './NewContact';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 3,
  },
};

export default ({closeModel, open, client}) => {
    const clientContacts = useSelector((state => state.clientContacts))
    const dispatch = useDispatch()
    const classes = modalStyles();
    useEffect(() => {
        if(client) {
            dispatch(getClientContacts(client.field_client_uuid))
        }
        
    }, [client])
    const handleClose = () => {
        dispatch(clearClientContacts())
        closeModel()
    }
    return (
        client ? 
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          contentLabel="Example Modal"
          width={600}
          overlayClassName="modal-backing"
        >
          <div className={classes.header}>{`Contacts for client ${client.field_company_name}`}</div>
          <ClientContactsList contacts={clientContacts} />
          <NewContact client={client} />
        </Modal>
        : null
      );
}