import Modal from 'react-modal';
import modalStyles from './Modal.styles';
import {useDispatch} from "react-redux"
import {editClientContact} from "store/actions/clientContactActions"
import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from 'components/lib';

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
    zIndex: 9999999999
  },
};

export default ({closeModel, open, contact}) => {
    const dispatch = useDispatch()
    const classes = modalStyles();
    const [message, setMessage] = useState("")
    
    const handleClose = () => {
        setMessage("")
        closeModel()
    }
    const handleRsend = () => {
        dispatch(editClientContact({
            id: contact.id,
            "field_resend_audit_link": true,
            "field_message": message
        }))
        handleClose()
    }
    return (
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
          contentLabel="Example Modal"
          width={600}
          overlayClassName="modal-backing"
        >
          <div className={classes.secondaryModalHeader}><div>{`Resend audit link for  ${contact.field_firstname} ${contact.field_lastname}`}</div><div onClick={handleClose}>x</div></div>
          <div className={classes.bodyTitle}>Message to contact:</div>
          <div className={classes.body}>
              <TextField multiline={true} value={message} onChange={(e) => setMessage(e.target.value)} rows={10} variant="outlined" fullWidth={true}/>
          </div>
          <div className={classes.footer}>
              <div className={classes.actions}>
                  <div><Button onClick={handleClose}>Cancel</Button></div>
                  <div><Button onClick={handleRsend}>Resend</Button></div>
              </div>
          </div>
        </Modal>
    )
}