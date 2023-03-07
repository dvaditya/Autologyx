import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GenerateDocument from './GenerateDocument';
import ClaimDetails from './ClaimDetails';
import { alx } from 'utils';
import { SkeletonLoader } from 'components/lib';
import { getCorrespondance as getCorrespondanceAction } from 'store/actions/matterActions';

const DocumentGeneration = () => {
  const dispatch = useDispatch();
  const [claimDetailsObj, setClaimDetailsObj] = useState();
  const [templateDetailsObj, setTemplateDetailsObj] = useState();
  const [templateEditableDetailsObj, setTemplateEditableDetailsObj] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [docType, setDocType] = useState('DOCX');
  const [documentGenerated, setDocumentGenerated] = useState(false)
  const record = useSelector(state => state.matters.currentMatter);
  const templates = useSelector(state =>
    state.documentTemplate.templates.filter(
      template => template.document_status === 'Published'
    )
  );
  const templatesFetched = useSelector(
    ({ documentTemplate }) => documentTemplate.templatesFetched
  );

  useEffect(() => {
    if (record) {
      setClaimDetailsObj({
        field_claimant_id: record.field_claimant_id,
        field_claimant_name: record.field_claimant_name,
        field_claimant_reference: record.field_claimant_reference,
      });

      dispatch(getCorrespondanceAction(record.field_claimant_id));
    }

    if (record === null) {
      setClaimDetailsObj(false);
      setTemplateDetailsObj(false);
      setTemplateEditableDetailsObj(false);
      setSelectedTemplate(null);
      setDocType('DOCX');
    }
  }, [record]);

  useEffect(() => {
    if (selectedTemplate !== null) {
      let newObj = {};
      selectedTemplate.template_fields.map(field => {
        let newval = '';
        let key = alx.nameToSlug(field.name);
        if (!field.editable) {
          // TODO fix this-liable to break
          let relativityVal = record.field_relativity_data[0][key];
          if (typeof relativityVal !== null) {
            newval = relativityVal;
          }
        }

        newObj[key] = newval;
      });

      setTemplateDetailsObj(newObj);
    } else {
      setTemplateDetailsObj(false);
      setTemplateEditableDetailsObj(false);
      setDocType('DOCX');
    }
  }, [selectedTemplate]);

  const onSelectHandler = value => {
    let template = templates.find(template => template.name === value);
    setSelectedTemplate(typeof template !== 'undefined' ? template : null);
  };
  
  return record && templatesFetched ? (
    <>
      <ClaimDetails record={record} />
      <GenerateDocument
        templates={templates}
        onSelectHandler={onSelectHandler}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        record={record}
        templateDetailsObj={templateDetailsObj}
        setTemplateDetailsObj={setTemplateDetailsObj}
        templateEditableDetailsObj={templateEditableDetailsObj}
        setTemplateEditableDetailsObj={setTemplateEditableDetailsObj}
        claimDetailsObj={claimDetailsObj}
        docType={docType}
        setDocType={setDocType}
        documentGenerated={documentGenerated}
        setDocumentGenerated={setDocumentGenerated}
      />
    </>
  ) : (
    <div style={{ padding: '1rem' }}>
      <SkeletonLoader height={65} />
      <SkeletonLoader height={500} />
    </div>
  );
};

export default DocumentGeneration;
