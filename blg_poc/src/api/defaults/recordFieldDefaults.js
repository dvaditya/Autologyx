// Defaults records to specififed defaults if set to null
export const defaultRecord = (record, defaultFields) => {
  const defaultedRecord = {};
  Object.keys(record).forEach(field => {
    let key = field;
    let val = record[field];
    key = field.replace('field_', '');
    if (record[field] === null) {
      if (defaultFields.hasOwnProperty(key)) {
        val = defaultFields[key];
      } else {
        // console.error(`A field has not been set up with a default: ${key}`);
      }
    }
    defaultedRecord[key] = val;
  });

  return defaultedRecord;
};

export const CLAIM_DEFAULTS = {
  field_claim_id: '',
  field_claimant_id: '',
  field_claimant_name: '',
  field_claimant_reference: '',
};

export const TASK_DEFAULTS = {
  matterId: -1,
  title: '',
  task_status: '',
  creator: '',
  assignee: '',
  completed_at: '',
  due: '',
  summary: '',
};

export const CONTRACT_DEFAULTS = {
  name: '',
  description: '',
  title: '',
  provisions: [],
  short_name: [],
  jurisdiction: '',
};

export const TEMPLATE_DEFAULTS = {
  assembled_document: null,
  creation_date: null,
  description: '',
  docassemble_api: {},
  document: null,
  document_name: '',
  document_template_url: null,
  document_version: 0,
  name: '',
  parent_id: null,
  selected_document_fields: null,
  template_files: [],
  template_fields: [],
  docassemble_data: [],
  creator: '',
  last_updated: '',
  updated_by: '',
  document_status: 'Draft',
};
