import React, {useRef} from 'react';
import { Modal, Button } from 'components/lib';
import useStyles from './updateAuditModal.styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setGlobalLoader, addAlert as addAlertAction } from 'store/actions/globalActions';
import { useDispatch, useSelector } from "react-redux"
import {Select} from 'components/lib';
import { editCurrentAudit } from 'store/actions/currentAuditActions';
const R = require("ramda")

export default ({ open, toggleOpen, audit }) => {
  const classes = useStyles();
  const ccClasses = classes
  const renderHeader = () => <>Update Audit</>;
  const formRef = useRef();
  const users = useSelector(state => state.users).filter((user) => R.any((role) => role.name === "Auditor", user?.roles))
  const dispatch = useDispatch()

  const updateAuditSchema = Yup.object().shape({
    field_owner: Yup.string()
      .required('Required')
  });

  const createDraftAudit = () => {
    return {
      field_owner: audit.field_owner
    }
  }

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  const handleOnSubmit = async (values) => {
    dispatch(setGlobalLoader(true))
    console.log(values)
    await dispatch(editCurrentAudit(audit.id, audit.field_client_uuid, values, true))
    dispatch(setGlobalLoader(false))
    toggleOpen(false)
  }

  const renderFooter = () => {
    return (
      <div className={classes.footer}>
        <Button type="secondary" onClick={() => toggleOpen()}>
          Cancel
        </Button>
        <Button onClick={submitForm} type="warning">
          Update
        </Button>
      </div>
    );
  };
  return (
    <Modal
      open={open}
      toggleOpen={toggleOpen}
      footer={renderFooter}
      header={renderHeader}
    >
      <div className={classes.content}>
        <Formik
          initialValues={createDraftAudit()}
          validationSchema={updateAuditSchema}
          onSubmit={handleOnSubmit}
          innerRef={formRef}
        >
          {({ isSubmitting, isValid, dirty, values, handleChange, handleBlur, errors, touched }) => (
            <Form>

              <div className={classes.body}>
                <div className={ccClasses.clientContact}>
                  <div className={ccClasses.clientContactRow}>
                    <div className={ccClasses.clientContactFieldLabel}>Owner:</div>
                    <div><Select name="field_owner" value={values.field_owner} onChange={handleChange} options={users.map(user => user.email)} emptyOption={true} />{errors.field_owner && touched.field_owner && <div>{errors.field_owner}</div>}</div>
                  </div>
                </div>
              </div>
            </Form>)}
        </Formik>
      </div>
    </Modal>
  );
};

