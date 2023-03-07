import Modal from 'react-modal';
import modalStyles from './Modal.styles';
import clientContactStyles from "./clientContacts.styles"
import { useDispatch } from "react-redux"
import { appendClientContact } from "store/actions/clientContactActions"
import { useEffect, useState } from 'react';
import TextInput from 'components/lib/TextInput'
import { Button } from 'components/lib';
import Checkbox from "components/lib/Checkbox"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createClientContact } from "api/clientContacts.api"
import { setGlobalLoader, addAlert as addAlertAction } from 'store/actions/globalActions';
import SwitchButton from 'components/lib/Switch';
import { FormControlLabel, Switch } from '@material-ui/core';


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
    field_firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    field_lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    field_email: Yup.string().email('Invalid email').required('Required'),
});

export default ({ closeModel, open, client }) => {
    const [ serverSideErrors, setServerSideErrors ] = useState({})
    const [ fieldPrimaryContact, setFieldPrimaryContact ] = useState(false)
    const createDraftContact = () => {
        return {
            field_firstname: "",
            field_lastname: "",
            field_email: "",
            field_primary_contact: false,
            field_active_to_receive_audit_link: true,
            field_active: true,
            field_client_uuid: client.field_client_uuid,
            field_phone_number: '',
            field_role: '',
            field_owner: client.field_owner,
            field_client_name: client.field_company_name
        }
    }
    const dispatch = useDispatch()
    const classes = modalStyles();
    const ccClasses = clientContactStyles()

    const handleCreateContact = async (values) => {
        try {
            console.log('from values', values)
            dispatch(setGlobalLoader(true))
            const res = await createClientContact(values)
            const { success, payload } = res
            dispatch(setGlobalLoader(false))
            if (success) {
                await dispatch(appendClientContact(payload))
                closeModel()
            } else {
                if (typeof res.msg_body === "object") {
                    setServerSideErrors(res.msg_body)
                }
            }
        } catch (e) {
            console.log("e", e)
            dispatch(setGlobalLoader(false))
            dispatch(addAlertAction({
                title: "Error saving record",
                content: "Unable to save client contact, please try again",
                severity: "error"
            }))
        }
    }

    const handleClose = () => {
        setServerSideErrors({})
        closeModel()
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
            <div className={classes.secondaryModalHeader}>
                <div style={{fontWeight: '700'}}>{`Create a new contact for ${client.field_company_name}`}</div>
            </div>
            <Formik
                initialValues={createDraftContact()}
                validationSchema={newContactSchema}
                onSubmit={handleCreateContact}
            >
                {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                        <div className={classes.body}>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                        required={errors.field_firstname && touched.field_firstname}
                                        error={errors.field_firstname && touched.field_firstname}
                                        type="text"
                                        name="field_firstname"
                                        setValue={handleChange}
                                        onBlur={handleBlur}
                                        label={`First name`}
                                        helperText={errors.field_firstname && touched.field_firstname ? 'Required' : ''}
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                        required={errors.field_lastname && touched.field_lastname}
                                        error={errors.field_lastname && touched.field_lastname}
                                        type="text"
                                        name="field_lastname"
                                        setValue={handleChange}
                                        onBlur={handleBlur}
                                        label='Last name'
                                        helperText={errors.field_lastname && touched.field_lastname ? 'Required' : ''}
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                        required={serverSideErrors.field_email || errors.field_email && touched.field_email}
                                        error={serverSideErrors.field_email || errors.field_email && touched.field_email}
                                        type="text"
                                        name="field_email"
                                        setValue={handleChange}
                                        onBlur={handleBlur}
                                        label='Email'
                                        helperText={serverSideErrors.field_email ? 'Email must be unique' : errors.field_email && touched.field_email ? 'Required' : ''}
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                        type="text"
                                        name="field_phone_number"
                                        setValue={handleChange}
                                        value={values.field_phone_number}
                                        onBlur={handleBlur}
                                        label='Phone number'
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                        type="text"
                                        name="field_role"
                                        setValue={handleChange}
                                        value={values.field_role}
                                        onBlur={handleBlur}
                                        label='Role'
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowSwitchButtonsModal}>
                                <div>
                                    <FormControlLabel
                                        control={<SwitchButton 
                                                    type="checkbox" 
                                                    name="field_primary_contact"
                                                    checked={values.field_primary_contact}
                                                    onChange={handleChange}
                                                />}
                                        label='Primary contact'
                                        /> 
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowSwitchButtonsModal}>
                                <div style={{marginBottom: '30px'}}>
                                    <FormControlLabel
                                        control={<SwitchButton 
                                                    type="checkbox" 
                                                    name="field_active_to_receive_audit_link" 
                                                    checked={values.field_active_to_receive_audit_link}
                                                    onChange={handleChange}
                                                />}
                                        label='Active to receive audit link'
                                    />
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className={classes.actions}>
                                <div style={{marginRight: '17px'}}><Button type='secondary' onClick={handleClose}>Cancel</Button></div>
                                <div><Button disabled={!isValid || !dirty} type={"submit"}>Create</Button></div>
                            </div>
                        </div>
                    </Form>)}
            </Formik>
        </Modal>
    )
}