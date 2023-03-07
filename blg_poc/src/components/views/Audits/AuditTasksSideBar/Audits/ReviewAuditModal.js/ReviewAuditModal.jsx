import React from 'react';
import { Modal, Button } from 'components/lib';
import useStyles from './reviewAuditModal.styles';
import { getOrigin, getApiKey } from 'utils/url';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { updateAudit } from 'api/audits.api';
import { addAlert, setGlobalLoader } from 'store/actions/globalActions';
import { setCurrentAudit } from 'store/actions/currentAuditActions';
import { Alert } from '@material-ui/lab';

const R = require("ramda")




const ReviewAuditModal = ({ open, toggleOpen, audit }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const url = getOrigin()
  const api_key = getApiKey()
  const handleDownloadReportLink = () => {
    const docId = audit.field_audit_document ? R.last(audit.field_audit_document.split("/")).split(".")[0] : null
    if (!docId) {
      return null
    }
    return `${url}/system/file-store/download/${docId}/`
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1
  });

  const files = acceptedFiles.map(file => (
    <div key={file.path} className={classes.newFileItem}>
      {file.path}
    </div>
  ));

  const handleSave = async () => {
    try {
      dispatch(setGlobalLoader(true))
      const file = acceptedFiles[0]
      console.log(acceptedFiles[0])
      const { success, message } = await updateAudit(
        audit.id,
        {
          field_review_audit_document_completed: "Yes"
        },
        file
      )
      if (!success) {
        throw new Error(message)
      }
      await dispatch(setCurrentAudit(audit.id))
      dispatch(setGlobalLoader(false))
      toggleOpen(false)
    } catch (e) {
      console.log(e)
      dispatch(addAlert({ severity: "error", title: "Error saving audit", content: "Error saving audit, please try again" }))
      dispatch(setGlobalLoader(false))
    }
  }

  const renderHeader = () => <>Audit Document</>;

  const renderFooter = () => {
    return (
      <div className={classes.footer}>
        <Button type="secondary" onClick={() => toggleOpen()}>
          Cancel
        </Button>
        <Button onClick={handleSave} type="warning">
          Save
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
        <div className={classes.alertContainer}>
          <Alert style={{width: '430px', textAlign: 'left'}} severity='info'>
            <p>Click the download report section to review your AML Effectiveness Report. If you need to modify the report, you can update the word document and save the changes into a PDF document, then upload into the drag and drop area and click save.</p>
            <br/>
            <p>If you are happy with the report you can save the word document as a PDF and upload into the drag and drop zone and click save, this will open the email model to allow the report to be sent to the client.</p>
          </Alert>
        </div>
        {audit.field_audit_document && <div className={classes.downloadContainer}><a className={classes.downloadLink} href={handleDownloadReportLink()} target={"_blank"}>Download report</a></div>}
        {!audit.field_audit_document && <div>Report not generated</div>}
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag and drop your updated file here, or click to select your file</p>
        </div>
        <div className={classes.newFile}>
          <h4>New file</h4>
          {files}
        </div>
      </div>

    </Modal>
  );
};

export default ReviewAuditModal;