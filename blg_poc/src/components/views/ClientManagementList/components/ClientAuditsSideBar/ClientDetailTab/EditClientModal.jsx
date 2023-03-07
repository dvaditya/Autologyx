import Modal from 'react-modal';
import clientStyles from "./clientModal.styles"
import clientContactsStyles from '../../contacts/clientContacts.styles';
import { useDispatch } from "react-redux"
import { useState } from 'react';
import TextInput from 'components/lib/TextInput'
import { Button, MultiSelect } from 'components/lib';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setGlobalLoader } from 'store/actions/globalActions';
import { editMatter2 } from 'store/actions/clientActions';
import { Select } from '@material-ui/core';

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
    overlay: {zIndex: 1000}
};

const newContactSchema = Yup.object().shape({
    field_company_name: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_street: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_city: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_province: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_country: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_postal_code: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    field_categories_registration: Yup.array().min(1).required('Required')
});

const R = require("ramda")

export default ({ closeModel, open, client }) => {

    const clientFields = [
        'field_company_name',
        'field_street',
        'field_city',
        'field_province',
        'field_country',
        'field_postal_code',
        'field_categories_registration'
    ]
    const [draftClient, setDraftContact] = useState(R.pick(clientFields, client))
    const [serverSideErrors, setServerSideErrors] = useState({})

    const createDraftContact = () => {
        return {
            field_company_name: client.field_company_name,
            field_street: client.field_street,
            field_city: client.field_city,
            field_province: client.field_province,
            field_country: client.field_country,
            field_postal_code: client.field_postal_code,
            field_categories_registration: client.field_categories_registration ? client.field_categories_registration.split("|") : []
        }
    }
    const dispatch = useDispatch()
    const classes = clientStyles();
    const ccClasses = clientContactsStyles()

    const handleEditContact = async (values) => {
        const newClientDetails = {
            ...draftClient,
            ...values,
            field_categories_registration: values.field_categories_registration.join("|")
        }
        dispatch(editMatter2(client.id, newClientDetails, client))
        closeModel()
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
            contentLabel="Edit Client Modal"
            width={600}
            overlayClassName="modal-backing"
        >
            <div className={classes.secondaryModalHeader}>
                <div style={{ fontWeight: '700' }}>{`Editing client ${client.field_company_name}`}</div>
            </div>
            <Formik
                initialValues={createDraftContact()}
                validationSchema={newContactSchema}
                onSubmit={handleEditContact}
            >
                {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur, errors, touched }) => {
                    console.log("values", values)
                    console.log("errors", errors)
                    console.log(isValid)
                    return <Form>
                        <div className={classes.body}>
                            <div className={classes.body}>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_company_name && touched.field_company_name}
                                            error={errors.field_company_name && touched.field_company_name}
                                            type="text"
                                            name="field_company_name"
                                            setValue={handleChange}
                                            value={values.field_company_name}
                                            onBlur={handleBlur}
                                            label={`Company Name`}
                                            helperText={errors.field_company_name && touched.field_company_name ? errors.field_company_name : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_street && touched.field_street}
                                            error={errors.field_street && touched.field_street}
                                            type="text"
                                            name="field_street"
                                            setValue={handleChange}
                                            value={values.field_street}
                                            onBlur={handleBlur}
                                            label='Street'
                                            helperText={errors.field_street && touched.field_street ? errors.field_street : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_city && touched.field_city}
                                            error={errors.field_city && touched.field_city}
                                            type="text"
                                            name="field_city"
                                            setValue={handleChange}
                                            value={values.field_city}
                                            onBlur={handleBlur}
                                            label='City'
                                            helperText={errors.field_city && touched.field_city ? errors.field_city : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_province && touched.field_province}
                                            error={errors.field_province && touched.field_province}
                                            type="text"
                                            name="field_province"
                                            setValue={handleChange}
                                            value={values.field_province}
                                            onBlur={handleBlur}
                                            label='Province'
                                            helperText={errors.field_province && touched.field_province ? errors.field_province : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_country && touched.field_country}
                                            error={errors.field_country && touched.field_country}
                                            type="text"
                                            name="field_country"
                                            setValue={handleChange}
                                            value={values.field_country}
                                            onBlur={handleBlur}
                                            label='Country'
                                            helperText={errors.field_country && touched.field_country ? errors.field_country : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <TextInput
                                            required={errors.field_postal_code && touched.field_postal_code}
                                            error={errors.field_postal_code && touched.field_postal_code}
                                            type="text"
                                            name="field_postal_code"
                                            setValue={handleChange}
                                            value={values.field_postal_code}
                                            onBlur={handleBlur}
                                            label='Postal Code'
                                            helperText={errors.field_postal_code && touched.field_postal_code ? errors.field_postal_code : ''}
                                        />
                                    </div>
                                </div>

                                <div className={ccClasses.clientContactRowModal}>
                                    <div>
                                        <MultiSelect
                                            multiple={true}
                                            required={errors.field_categories_registration}
                                            error={errors.field_categories_registration}
                                            name="field_categories_registration"
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                 handleChange(e)}}
                                            value={values.field_categories_registration}
                                            onBlur={handleBlur}
                                            emptyOption={false}
                                            label='Catagories Registration'
                                            options={['Investment Fund Manager', 'Exempt Market Dealer', 'Portfolio Manager']}
                                            helperText={errors.field_categories_registration ? errors.field_categories_registration : ''}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={classes.actions}>
                                <div style={{ marginRight: '17px' }}><Button type='secondary' onClick={handleClose}>Cancel</Button></div>
                                <div><Button disabled={!isValid || !dirty} type={"submit"}>Update</Button></div>
                            </div>
                        </div>
                    </Form>}}
            </Formik>
        </Modal>
    )
}