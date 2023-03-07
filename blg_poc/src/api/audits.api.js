import alxConnect from './config';

export const getAuditByUUID = async (auditUUID) => {
  const { audits } = alxConnect;



      let search = {
          "field_uuid": auditUUID,
          "field_active": true
      };

      const { payload, success, total } = await audits.any.getAll({
          limit: 1,
          ...search,
      });

      if (!success || total !== 1) {
          throw new Error("Unable to retrieve audit")
      }

      return payload[0];

  
};

export const getAudits = async ({
  pageIndex,
  pageSize,
  sortBy,
  searchQuery,
}) => {
  const { audits } = alxConnect;

  try {
    if (process.env.NODE_ENV === 'test') {
      const { payload, success } = await audits.v1.getAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
      });

      if (!success) {
        return {};
      }

      return {
        success,
        records: payload.objects,
        total: payload.meta.total_count,
        pageSize: payload.meta.limit,
        pageIndex: payload.meta.offset,
        pageCount: Math.ceil(payload.meta.total_count / payload.meta.limit),
      };
    } else {
      let search = {
        "field_active": true
      };

      const searchFields = ['field_search'];

      if (searchQuery.length) {
        searchFields.forEach(field => {
          search[field] = searchQuery;
        });
      }

      const { payload, success, total } = await audits.any.getAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        ordering: `${sortBy.dir === 'desc' ? '-' : ''}${sortBy.col}`,
        ...search,
      });

      if (!success) {
        return {};
      }

      return {
        success,
        records: payload,
        total,
        pageSize,
        pageIndex,
        pageCount: Math.ceil(total / pageSize),
      };
    }
  } catch ({ message }) {
    console.error(message);
  }
};

export const getAuditByID = async id => {
  try {
    const { audits, tasks } = alxConnect;

    const { payload, success } = await audits.v1.getSingle(id);

    const audit = payload;

    const tasksRes = await tasks.v1.getAll({
      field_audit_id: id,
    });

    return { ...audit };
  } catch (e) {}
};

/*export const editAudit = async (id = 0, values = {}) => {
  const { audits } = alxConnect;
  const newValues = {};

  Object.keys(values).forEach(value => {
    newValues[`field_${value}`] = values[value];
  });

  const { success, payload } = await audits.v1.update(id, newValues);

  const editedAudits = defaultRecord(payload, CLAIM_DEFAULTS);

  return { success, editedAudits };
};*/

export const createAudit = async data => {
  const { audits } = alxConnect;

  return await audits.v1.create(data);
};

export const uploadAuditFile = async (id, file) => {
  const { audits } = alxConnect;

  const { payload, success } = await audits.v2.upload(id, {
    field: '',
    file: file,
  });
};

export const addNote = async (id, notes) => {
  const { audits } = alxConnect;

  const { success, payload } = await audits.v1.update(id, {
    field_notes: notes,
  });

  if(success) {
    return payload
  } else {
    return []
  }
};

export const updateDelectedDocuments = async (auditId, userEmail) => {
  const { audits } = alxConnect;
  return await audits.v1.update(auditId, {
    field_documents_deleted_by: userEmail,
    field_documents_deleted_date: new Date()
  })
}


export const editAudit = async (data, id) => {
  const { audits } = alxConnect;

  const { payload, success } = await audits.v1.update(id, data);
};

export const updateAudit = async (auditId, auditData, file = false) => {
  const { audits } = alxConnect;

  try {
    const files = file
    ? [
        {
          file,
          fieldName: 'field_audit_document'
        },
      ]
    : []
    console.log(files)
    const { success, payload } = await audits.v2.updateFormData(
      auditId,
      auditData,
      files
    );

    if (!success) {
      throw new Error('Update audit error.');
    }

    return {
      success,
      payload
    };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};