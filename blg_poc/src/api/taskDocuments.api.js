import alxConnect from './config';

export const getTaskDocumentsByAuditUUID = async (auditUUID) => {
    const { documents } = alxConnect;

    let search = {
        "field_audit_uuid": auditUUID
    };

    const {success, ...rest } = await documents.v1.getAll({
        limit: 9999,
        ...search,
    });

    if (!success) {
        throw new Error("Unable to retrieve client audit documents")
    }

    return {
        success,
        records: rest?.payload?.objects ? rest?.payload?.objects : []
    };


};