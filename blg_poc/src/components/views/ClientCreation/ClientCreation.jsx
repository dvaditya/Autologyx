import React, { useState } from 'react';
import {
  SubHeader,
  Input,
  TextInput,
  Button,
  Breadcrumb,
  PageTitle,
} from 'components/lib';
import { Add as AddIcon } from '@material-ui/icons';

import claimCreationStyles from './clientCreation.styles';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MultiSelect } from 'components/lib';
import * as Yup from 'yup';
import { useSaveNewClient } from "./hooks"
import { useSelector } from 'react-redux';

const EDIT_CLAIM_ACTION = 'EDIT_CLAIM_ACTION';

const formSchema = Yup.object().shape({
  field_company_name: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  field_street: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_city: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_province: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_country: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_postal_code: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  field_lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  field_role: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_phone_number: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
  field_email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const categoriesRegistrationOptions = [
  "Investment Fund Manager",
  "Exempt Market Dealer",
  "Portfolio Manager"
]

const ClaimCreation = ({ }) => {
  const classes = claimCreationStyles();
  const user = useSelector((state) => state.user)

  const createDraftFormState = () => {
    return {
      field_company_name: "",
      field_street: "",
      field_city: "",
      field_province: "",
      field_country: "",
      field_postal_code: "",
      field_categories_registration: [],
      field_role: "",
      field_phone_number: "",
      field_firstname: "",
      field_lastname: "",
      field_email: "",
      field_primary_contact: true,
      field_active_to_receive_audit_link: true,
      field_active: true,
      field_client_uuid: "",
      field_owner: user.email
    }
  }

  // creates client and contact 
  const { serverSideErrors, saveClient } = useSaveNewClient()

  const lablejsx = (
    <React.Fragment>
      <span style={{ color: 'red', fontSize: 14 }}>*</span>
    </React.Fragment>
  )

  return (
    <div className={classes.pageContent}>
      <Formik
        initialValues={createDraftFormState()}
        validationSchema={formSchema}
        onSubmit={saveClient}
      >
        {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur, errors, touched }) => {
          return <Form>
            <Breadcrumb path={['Home', 'Client Management', 'New Client']} />
            <PageTitle>New Client</PageTitle>
            <div className={classes.formWrapper}>
              <SubHeader>Client Detail</SubHeader>
              <div style={{ padding: '17px 17px 17px 21px', fontSize: '14px', color: 'rgb(46, 63, 87)' }}><span style={{ color: 'red' }}>*</span> = Required</div>
              <div className={classes.summaryWrapper} style={{ position: 'relative' }}>
                <div className={classes.detailWrapperContained}>
                  <div className={classes.inputCell}>
                    <TextInput
                      required={errors.field_company_name && touched.field_company_name}
                      error={errors.field_company_name && touched.field_company_name}
                      type="text"
                      name="field_company_name"
                      setValue={handleChange}
                      value={values.field_company_name}
                      onBlur={handleBlur}
                      label={`Company Name`}
                      helperText={errors.field_company_name && touched.field_company_name ? errors.field_company_name : ' '}
                    />
                  </div>
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
                    <div style={{
                      width: "100%",
                      marginRight: "35px",
                      display: "inline-block",
                      marginBottom: "6px",
                      position: "relative"
                    }}>
                      <MultiSelect label={"Categories Registration"}
                        name="field_categories_registration"
                        value={values.field_categories_registration}
                        onChange={handleChange} options={categoriesRegistrationOptions}
                        emptyOption={false}
                      />
                      {errors.field_categories_registration && touched.field_categories_registration && <div>{errors.field_categories_registration}</div>}
                    </div>
                  </div>
                </div>
                <div
                  style={{ position: 'absolute', right: '20px', bottom: '25px' }}
                >
                  {serverSideErrors.global}
                </div>
              </div>
              <SubHeader>Client primary contact</SubHeader>
              <div className={classes.summaryWrapper} style={{ position: 'relative' }}>
                <div className={classes.detailWrapperContained}>
                  <div className={classes.inputCell}>
                    <TextInput
                      required={errors.field_firstname && touched.field_firstname}
                      error={errors.field_firstname && touched.field_firstname}
                      type="text"
                      name="field_firstname"
                      setValue={handleChange}
                      value={values.field_firstname}
                      onBlur={handleBlur}
                      label={`First name`}
                      helperText={errors.field_firstname && touched.field_firstname ? errors.field_firstname : ' '}
                    />
                  </div>
                  <div className={classes.inputCell}>
                    <TextInput
                      required={errors.field_lastname && touched.field_lastname}
                      error={errors.field_lastname && touched.field_lastname}
                      type="text"
                      name="field_lastname"
                      setValue={handleChange}
                      value={values.field_lastname}
                      onBlur={handleBlur}
                      label='Last name'
                      helperText={errors.field_lastname && touched.field_lastname ? errors.field_lastname : ' '}
                    />
                  </div>
                  <div className={classes.inputCell}>
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
                  <div className={classes.inputCell}>
                    <TextInput
                      required={serverSideErrors.field_email || errors.field_email && touched.field_email}
                      error={serverSideErrors.field_email || errors.field_email && touched.field_email}
                      type="text"
                      name="field_email"
                      setValue={handleChange}
                      value={values.field_email}
                      onBlur={handleBlur}
                      label='Email'
                      helperText={serverSideErrors.field_email ? 'Email must be unique' : errors.field_email && touched.field_email ? errors.field_email : ' '}
                    />
                  </div>
                  <div className={classes.inputCell}>
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
              </div>
            </div>
            <Button classNames={classes.addClaimButton} type="submit" disabled={!isValid || !dirty}>
              <AddIcon />
              Add Client
            </Button>
          </Form>
        }}
      </Formik>
    </div>
  );
};

export default ClaimCreation
