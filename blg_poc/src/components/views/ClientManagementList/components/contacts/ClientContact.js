import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import clientContactStyles from "./clientContacts.styles"
import { editClientContact, deleteClientContact } from "store/actions/clientContactActions"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ClientContactResendLinkModal from "./ClientContactResendLinkModal"
import ClientContactDeleteModal from "./ClientContactDeleteModal"
import SwitchButton from "components/lib/Switch"
import { FormControlLabel } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import EditContactModalComponent from "./EditContactModal.component.jsx";
import { useLocation } from 'react-router-dom';
import { getAuditByUUID } from "api/audits.api";

const R = require("ramda")

export default ({ contact, isActiveAudit }) => {

    const contactFields = [
        "id",
        "field_firstname",
        "field_lastname",
        "field_role",
        "field_email",
        "field_phone_number",
        "field_primary_contact",
        "field_active_to_receive_audit_link",
        "field_resend_audit_link",
        "field_active"
    ]
    const [draftContact, setDraftContact] = useState(R.pick(contactFields, contact))
    const [resendLinkModalOpen, setResendLinkModalOpen] = useState(false)
    const [deleteContactModalOpen, setDeleteContactModalOpen] = useState(false)
    const [editContact, setEditContact] = useState(false)

    const client = useSelector((state) => state.matters.currentMatter)
    // const uuid = useSelector((state) => state.matters.currentMatter.field_client_uuid)
    // useEffect(async () => {
    //     try {
    //         const audit = await getAuditByUUID(uuid)
    //         console.log('GFSADGS!!!!!!!', audit)
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    // },[])
    

    // const auditId = new URLSearchParams(useLocation().search).get('auditId')

    // console.log('from contacts, audit id', uuid)
    // console.log('AUDIT>>>>>>>>>>>>!!!!!!!!!!!',audit)

    useEffect(() => {
        setDraftContact(R.pick(contactFields, contact))
    }, [contact])
    const classes = clientContactStyles()
    const dispatch = useDispatch()

    const handleChange = async (field, val) => {
        const newState = {
            ...draftContact,
            [field]: val
        }
        console.log('NEW STATE_ ',newState)
        setDraftContact(newState)
        dispatch(editClientContact({ ...newState }))
    }
    
    const handleDeleteClicked = () => {
        setDeleteContactModalOpen(true)
    }
    const handleCloseDeleteContactModal = () => {
        setDeleteContactModalOpen(false)
    }
    const handleResendLinkClicked = () => {
        setResendLinkModalOpen(true)
    }
    const handleCloseResendLinkModal = () => {
        setResendLinkModalOpen(false)
    }
    const handleEditContactModal = () => {
        setEditContact(true)
    }
    const handleCloseEditContactModal = () => {
        setEditContact(false)
    }

    return <div className={classes.clientContact}>
        <div className={classes.clientContactContainer}>
            <div>
                {draftContact.field_firstname && <div className={classes.clientContactRow}>
                    <div>{`${draftContact.field_firstname} ${draftContact.field_lastname}`}</div>
                </div>}
                {draftContact.field_role && <div className={classes.clientContactRow}>
                    <div>{draftContact.field_role}</div>
                </div>}
                {draftContact.field_email && <div className={classes.clientContactRow}>
                    <div  className={classes.email}><a className={classes.emailAnchor} href={`mailto:${draftContact.field_email}`}>{draftContact.field_email}</a></div>
                </div>}
                {draftContact.field_phone_number && <div className={classes.clientContactRow}>
                    <div>{draftContact.field_phone_number}</div>
                </div>}
                {<div className={classes.formSwitch}>
                    <FormControlLabel 
                        classes={classes.label} 
                        control={<SwitchButton 
                                    color="primary" 
                                    checked={draftContact.field_primary_contact} 
                                    onChange={() => handleChange("field_primary_contact", !draftContact.field_primary_contact)} 
                                />} 
                        label='Primary contact' />
                </div>}
                <div className={classes.formSwitch}>
                    <FormControlLabel 
                        control={<SwitchButton 
                                    color="primary"     
                                    checked={draftContact.field_active_to_receive_audit_link} 
                                    onChange={() => handleChange("field_active_to_receive_audit_link", !draftContact.field_active_to_receive_audit_link)} 
                                />} 
                        label='Active to receive audit link' />
                </div>
                <div className={classes.clientContactRow}>
                    {/* <div className={classes.clientContactFieldLabel}>Reset audit link:</div> */}
                    <button
                        disabled={!contact.field_active_to_receive_audit_link || !isActiveAudit }
                        className={classes.resetAuditLink}
                        onClick={handleResendLinkClicked}
                    >
                        <EmailOutlinedIcon className={classes.actionButtonIcon} />
                        <span style={{ marginLeft: '7px', fontWeight: 300, fontSize: 14 }}>Reset audit link</span>
                    </button>
                </div>
                <div className={classes.clientContactRow}>
                    <button
                        className={classes.resetAuditLink}
                        onClick={handleEditContactModal}
                        name='edit'
                    >
                        <FontAwesomeIcon icon={faPen} />
                        <span style={{ marginLeft: '7px', fontWeight: 300, fontSize: 14 }}>Edit contact details</span>
                    </button>
                </div>
            </div>
            <div style={{display: 'flex',alignItems: 'center', marginRight: '20px'}}>
                <button className={classes.actionButton} onClick={handleDeleteClicked}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{fontSize:'20px'}} />
                </button>
            </div>
        </div>
        <EditContactModalComponent open={editContact} closeModel={handleCloseEditContactModal} client={client} contact={contact} />
        <ClientContactResendLinkModal open={resendLinkModalOpen} closeModel={handleCloseResendLinkModal} contact={contact} />
        <ClientContactDeleteModal open={deleteContactModalOpen} closeModel={handleCloseDeleteContactModal} contact={contact} />
    </div>
}