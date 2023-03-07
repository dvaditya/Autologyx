import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Select, Button, Checkbox, FormSection } from 'components/lib';
import TemplateDetails from './TemplateDetails';
import ProcessDocumentModal from './ProcessDocumentModal';
import generateDocumentStyles from './generateDocument.styles';
import {
  getNewDocument as getNewDocumentAction,
  initiateRelativityCall as initiateRelativityCallAction,
} from 'store/actions/matterActions';
import { addAlert as addAlertAction } from 'store/actions/globalActions';
import { setUserGeneratedDocument as setUserGeneratedDocumentAction } from 'store/actions/userActions';

const GenerateDocument = ({
  templates,
  onSelectHandler,
  selectedTemplate,
  setSelectedTemplate,
  record,
  setTemplateDetailsObj,
  claimDetailsObj,
  templateDetailsObj,
  getNewDocumentAction,
  initiateRelativityCallAction,
  addAlertAction,
  docType,
  setDocType,
  user,
  matters,
  templateEditableDetailsObj,
  setTemplateEditableDetailsObj,
  documentGenerated,
  setUserGeneratedDocumentAction
}) => {
  const [genDocBtnLoad, setGenDocBtnLoad] = useState(false);
  const [btnSyncRelativiyLoafing, setBtnSyncRelativiyLoading] = useState(false);
  const [processDocModalOpen, setProcessDocModalOpen] = useState(false);
  const [required, setRequired] = useState(false);
  const classes = generateDocumentStyles();

  useEffect(() => {
    if (record === null) {
      setGenDocBtnLoad(false);
      setDocType('PDF');
    }
  }, [record]);

  useEffect(() => {
    if(matters.currentMatter.hasOwnProperty('correspondance')) {
      setProcessDocModalOpen(true)
    }
  }, [matters])
  
  // const handleGenerateDocument = () => {
  //   const selectedTemplateFieldLength = selectedTemplate.template_fields.filter(field => field.editable === true).length

  //   if(templateEditableDetailsObj && Object.keys(templateEditableDetailsObj).length === selectedTemplateFieldLength) {
  //     setRequired(false)
  //     setGenDocBtnLoad(true);
  //     getNewDocumentAction(
  //       record.id,
  //       {
  //         ...templateDetailsObj,
  //         ...templateEditableDetailsObj,
  //         ...claimDetailsObj,
  //         field_document_type: docType ? docType : 'DOCX',
  //         field_last_updated: new Date().toISOString(),
  //         field_creator: `${user.firstName} ${user.lastName}`,
  //         field_template_name: selectedTemplate.name,
  //       },
  //       () => {
  //         setGenDocBtnLoad(false);
  //       }
  //     );
  //   } else {
  //     setRequired(true)
  //     return 
  //   }
  // };

  const handleGenerateDocument = () => {
    setGenDocBtnLoad(true);
    setUserGeneratedDocumentAction(false)
    getNewDocumentAction(
      record.id,
      {
        ...templateDetailsObj,
        ...claimDetailsObj,
        field_document_type: docType ? docType : 'DOCX',
        field_last_updated: new Date().toISOString(),
        field_creator: `${user.firstName} ${user.lastName}`,
        field_template_name: selectedTemplate.name,
        // field_task_allocation: selectedTemplate === "Panel Pack" ? "Yes" : "No"
      },
      () => {
        setUserGeneratedDocumentAction(true)
        setGenDocBtnLoad(false);
      }
    );
  };

  const handleSyncRelativity = () => {
    setBtnSyncRelativiyLoading(true);

    initiateRelativityCallAction(
      record.id,
      // onSuccess
      () => {
        setBtnSyncRelativiyLoading(false);
        addAlertAction({
          severity: 'info',
          title: 'Relativity Fields Syncing',
          content: 'Your relativity fields have begun syncing.',
        });
      },
      // onErr
      () => {
        setBtnSyncRelativiyLoading(false);
        addAlertAction({
          severity: 'error',
          title: 'Relativity Fields Sync Error',
          content:
            'It seems there has been issue syncing your relativity fields.',
        });
      }
    );
  };

  const panelPackChecker = () => {
    if(selectedTemplate && selectedTemplate.name === "Cover Sheet (Panel Pack)") {
      return matters.currentMatterCorrespondance.data.length && matters.currentMatterCorrespondance.data[0].field_template_name === "Cover Sheet (Panel Pack)"
    } else {
      return false
    }
  }

  return (
    <>
      <div className={classes.genDocRoot}>
        <FormSection.Wrapper>
          <FormSection.Header>Document Generation</FormSection.Header>
          <FormSection.Content>
            <div className={classes.sectionWrapper}>
              <div className={classes.paragraph}>
                Please select a template that you would like to use to generate
                a document: -
              </div>
              {templates ? (
                <div className={classes.selectWrapper}>
                  <Select
                    options={templates.map(template => template.name)}
                    value={selectedTemplate ? selectedTemplate.repr_value : ''}
                    onChange={({ target }) => {
                      onSelectHandler(target.value);
                    }}
                    emptyOption
                  />
                </div>
              ) : null}
            </div>

            {selectedTemplate ? (
              <>
                <div style={{ marginTop: 20 }}>
                  <hr className={classes.hr} />
                </div>
                <div className={classes.contentContainer}>
                  <div>
                    <div className={classes.paragraph}>
                      <b>Template:</b> {selectedTemplate.name}
                    </div>
                    <div className={classes.paragraph}>
                      {selectedTemplate !== null
                        ? selectedTemplate.description
                          ? selectedTemplate.description
                          : 'No Description for this template'
                        : null}
                    </div>
                  </div>
                  <div>
                    {/* <Button
                      fullWidth
                      loading={btnSyncRelativiyLoafing}
                      type="secondary"
                      onClick={handleSyncRelativity}
                      classNames={classes.syncRelativityBtn}
                    >
                      Sync Relativity
                    </Button> */}

                    {documentGenerated && selectedTemplate.name !== 'Cover Sheet (Panel Pack)' ? (
                      <Button
                        fullWidth
                        type="secondary"
                        onClick={() => setProcessDocModalOpen(true)}
                      >
                        Process Document
                      </Button>
                    ) : null}
                  </div>
                </div>
                
                {selectedTemplate.name !== "Cover Sheet (Panel Pack)" ? 
                    <div className={classes.formItem}>
                    <div className={classes.paragraph}>
                      In which format would you like the document?
                    </div>
                    <div style={{ display: 'flex' }}>
                      <Checkbox
                        label={'PDF'}
                        checked={docType === 'PDF'}
                        onClick={() => setDocType('PDF')}
                      />
                      <Checkbox
                        label={'DOCX'}
                        checked={docType === 'DOCX'}
                        onClick={() => setDocType('DOCX')}
                      />
                    </div>
                  </div> : 
                  null
                }
              </>
            ) : null}
            {selectedTemplate !== null ? (
              <>
                <TemplateDetails
                  selectedFields={selectedTemplate.template_fields}
                  templateDetailsObj={templateDetailsObj}
                  templateEditableDetailsObj={templateEditableDetailsObj}
                  setTemplateDetailsObj={setTemplateDetailsObj}
                  setTemplateEditableDetailsObj={setTemplateEditableDetailsObj}
                  required={required}
                />
                <div className={classes.buttonContainer}>
                {panelPackChecker() === true ?
                    <>
                      <div className={classes.disabledText}>Panel Pack has already been generated</div>
                      <Button
                        loading={genDocBtnLoad}
                        onClick={handleGenerateDocument}
                        disabled
                      >
                        Generate Document
                      </Button>
                    </> :
                    <Button
                      loading={genDocBtnLoad}
                      onClick={handleGenerateDocument}
                    >
                      Generate Document
                    </Button>
                  }
                </div>
              </>
            ) : null}
          </FormSection.Content>
        </FormSection.Wrapper>
      </div>
      <ProcessDocumentModal
        open={processDocModalOpen}
        docType={docType}
        correspondance={record !== null ? record.correspondance : null}
        cancel={() => setProcessDocModalOpen(false)}
        setProcessDocModalOpen={setProcessDocModalOpen}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        setUserGeneratedDocumentAction={setUserGeneratedDocumentAction}
      />
    </>
  );
};

export default connect(({ user, matters }) => {
    return { user, matters };
  },
  {
    getNewDocumentAction,
    initiateRelativityCallAction,
    addAlertAction,
    setUserGeneratedDocumentAction
  }
)(GenerateDocument);
