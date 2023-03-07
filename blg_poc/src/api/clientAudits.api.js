import alxConnect from './config';

export const getAudits = async (clientUUID) => {
    const { audits } = alxConnect;



        let search = {
            "field_client_uuid": clientUUID,
            "field_active": true
        };

        const { payload, success, total } = await audits.any.getAll({
            limit: 1000,
            ...search,
        });

        if (!success) {
            throw new Error("Unable to retrieve client audits")
        }

        return {
            success,
            records: payload,
            total,
            pageSize: 1000,
            pageIndex: 0,
            pageCount: Math.ceil(total / 1000),
        };

    
};

export const getAuditByID = async id => {
    try {
        const { audits } = alxConnect;

        const { payload, success } = await audits.v1.getSingle(id);

        const audit = payload;
        return { ...audit };
    } catch (e) { }
};

export const editaudit = async (id = 0, values = {}) => {
    const { audits } = alxConnect;
    const res = await audits.v1.update(id, values);
    const { success, payload } = res
    return { success, payload };
};

export const createAudit = async data => {
    const { audits } = alxConnect;

    return await audits.v1.create(data);
};
