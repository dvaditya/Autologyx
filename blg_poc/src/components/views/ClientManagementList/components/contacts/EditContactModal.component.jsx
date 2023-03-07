import Modal from 'react-modal';
import modalStyles from './Modal.styles';
import clientContactStyles from "./clientContacts.styles"
import { useDispatch } from "react-redux"
import { useState } from 'react';
import TextInput from 'components/lib/TextInput'
import { Button } from 'components/lib';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { editClientContact } from "store/actions/clientContactActions"


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
    field_role: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_phone_number: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

const R = require("ramda")

export default ({ closeModel, open, contact }) => {

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
    const [serverSideErrors, setServerSideErrors] = useState({})
    console.log(contact)

    const createDraftContact = () => {
        return {
            field_firstname: contact.field_firstname,
            field_lastname: contact.field_lastname,
            field_email: contact.field_email,
            field_primary_contact: contact.field_primary_contact,
            field_active_to_receive_audit_link: contact.field_active_to_receive_audit_link,
            field_phone_number: contact.field_phone_number,
            field_role: contact.field_role,
            field_active: true
        }
    }
    const dispatch = useDispatch()
    const classes = modalStyles();
    const ccClasses = clientContactStyles()

    const handleEditContact = async (values) => {
        const newDetails = {
            ...draftContact,
            ...values
        }
        dispatch(editClientContact({ ...newDetails }))
        handleClose()
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
                <div style={{ fontWeight: '700' }}>{`Editing client ${contact.field_firstname} ${contact.field_lastname}`}</div>
            </div>
            <Formik
                initialValues={createDraftContact()}
                validationSchema={newContactSchema}
                onSubmit={handleEditContact}
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
                                        value={values.field_firstname}
                                        onBlur={handleBlur}
                                        label={`First name`}
                                        helperText={errors.field_firstname && touched.field_firstname ? errors.field_firstname : ''}
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
                                        value={values.field_lastname}
                                        onBlur={handleBlur}
                                        label='Last name'
                                        helperText={errors.field_lastname && touched.field_lastname ? errors.field_lastname : ''}
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
                                        value={values.field_email}
                                        onBlur={handleBlur}
                                        label='Email'
                                        helperText={serverSideErrors.field_email ? 'Email must be unique' : errors.field_email && touched.field_email ? errors.field_email : ''}
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                    required={serverSideErrors.field_phone_number || errors.field_phone_number && touched.field_phone_number}
                                    error={serverSideErrors.v || errors.field_phone_number && touched.field_phone_number}
                                        type="text"
                                        name="field_phone_number"
                                        setValue={handleChange}
                                        value={values.field_phone_number}
                                        onBlur={handleBlur}
                                        label='Phone number'
                                        helperText={errors.field_phone_number && touched.field_phone_number ? errors.field_phone_number : ''}
                                    />
                                </div>
                            </div>
                            <div className={ccClasses.clientContactRowModal}>
                                <div>
                                    <TextInput
                                    required={serverSideErrors.field_role || errors.field_role && touched.field_role}
                                    error={serverSideErrors.field_role || errors.v && touched.field_role}
                                        type="text"
                                        name="field_role"
                                        setValue={handleChange}
                                        value={values.field_role}
                                        onBlur={handleBlur}
                                        label='Role'
                                        helperText={errors.field_role && touched.field_role ? errors.field_role : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className={classes.actions}>
                                <div style={{ marginRight: '17px' }}><Button type='secondary' onClick={handleClose}>Cancel</Button></div>
                                <div><Button disabled={!isValid || !dirty} type={"submit"}>Update</Button></div>
                            </div>
                        </div>
                    </Form>)}
            </Formik>
        </Modal>
    )
}