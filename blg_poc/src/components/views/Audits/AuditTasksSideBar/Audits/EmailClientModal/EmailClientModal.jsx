import Modal from 'react-modal';
import modalStyles from './emailClientModal.styles';
import { useDispatch, useSelector } from "react-redux"
import { appendClientContact, getClientContacts } from "store/actions/clientContactActions"
import { useEffect, useState } from 'react';
import TextInput from 'components/lib/TextInput'
import Textarea from 'components/lib/Textarea'
import { Button } from 'components/lib';
import Checkbox from "components/lib/Checkbox"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setGlobalLoader, addAlert as addAlertAction } from 'store/actions/globalActions';
import { editCurrentAudit } from 'store/actions/currentAuditActions';

const R = require("ramda")
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

const newContactSchema = Yup.object().shape({
    field_contact: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    field_contact_message: Yup.string()
        .min(2, 'Too Short!')
        .max(500, 'Too Long!')
        .required('Required'),
    field_contact_email: Yup.string().email('Invalid email').required('Required'),
});

export default ({ toggleOpen, open, audit }) => {
    const [serverSideErrors, setServerSideErrors] = useState({})
    const [primaryContact, setPrimaryContact] = useState(null)
    const [pcRetrieved, setPcretrieved] = useState(false)
    const contacts = useSelector((state) => state.clientContacts)
    useEffect(() => {
        dispatch(getClientContacts(audit.field_client_uuid))

        return () => {
            setServerSideErrors({})
            setPrimaryContact(null)
            setPcretrieved(false)
        }
    }, [audit])
    useEffect(() => {
        setPrimaryContact(R.find(R.propEq("field_primary_contact", true), contacts))
        setPcretrieved(true)
    }, [contacts])
    const createDraftContact = (primaryContact) => {
        console.log("primaryContact", primaryContact)
        if (primaryContact) {
            return {
                field_contact: `${primaryContact.field_firstname} ${primaryContact.field_lastname}`,
                field_contact_email: primaryContact.field_email,
                field_contact_message: "",
                field_check_to_send_to_client: true,
                field_date_of_completion: new Date().toISOString()
            }
        }
        return {
            field_contact: "",
            field_contact_email: "",
            field_contact_message: "",
            field_check_to_send_to_client: true
        }
    }
    const dispatch = useDispatch()
    const classes = modalStyles();
    const ccClasses = classes

    const handleEmailAudit = async (values) => {
        try {
            dispatch(setGlobalLoader(true))
            values.field_audit_status = "Completed"
            await dispatch(editCurrentAudit(audit.id, audit.field_client_uuid, values, false))
            dispatch(setGlobalLoader(false))
            toggleOpen(false)
        } catch (e) {
            console.log(e)
            dispatch(addAlertAction({
                severity: "error",
                title: "Unable to save recoord",
                content: "Unable to save recoord, please try again"
            }))
            dispatch(setGlobalLoader(false))
        }

    }

    const handleClose = () => {
        closeModel()
    }

    return (
        <Modal
            isOpen={open}
            onRequestClose={toggleOpen}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            contentLabel="Example Modal"
            width={600}
            overlayClassName="modal-backing"
        >
            <div className={classes.secondaryModalHeader}><div>{"Email Audit Report To Client"}</div><div onClick={toggleOpen}>x</div></div>
            {pcRetrieved && <Formik
                initialValues={createDraftContact(primaryContact)}
                validationSchema={newContactSchema}
                onSubmit={handleEmailAudit}
            >
                {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur, errors, touched }) => (
                    <Form>

                        <div className={classes.body}>
                            <div className={ccClasses.clientContact}>
                                <div className={ccClasses.clientContactRow}>
                                    <div className={ccClasses.clientContactFieldLabel}>Contact:</div>
                                    <div><TextInput type="text" name="field_contact" value={values.field_contact} setValue={handleChange} onBlur={handleBlur} />{errors.field_contact && touched.field_contact && <div className={classes.fieldError}>{errors.field_contact}</div>}</div>
                                </div>
                                <div className={ccClasses.clientContactRow}>
                                    <div className={ccClasses.clientContactFieldLabel}>Email:</div>
                                    <div><TextInput type="text" name="field_contact_email" value={values.field_contact_email} setValue={handleChange} onBlur={handleBlur} />{serverSideErrors.field_contact_email && <div className={classes.fieldError}>Email must be unique</div>}{errors.field_contact_email && touched.field_contact_email && <div className={classes.fieldError}>{errors.field_contact_email}</div>}</div>
                                </div>
                                <div className={ccClasses.clientContactRow}>
                                    <div className={ccClasses.clientContactFieldLabel}>Message:</div>
                                    <div><Textarea type="text" name="field_contact_message" value={values.field_contact_message} onChange={handleChange} onBlur={handleBlur} />{errors.field_contact_message && touched.field_contact_message && <div className={classes.fieldError}>{errors.field_contact_message}</div>}</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.actions}>
                                <div><Button onClick={toggleOpen}>Cancel</Button></div>
                                <div><Button disabled={!isValid || !dirty} type={"submit"}>Send</Button></div>
                            </div>
                        </div>
                    </Form>)}
            </Formik>
            }
        </Modal>
    )
}