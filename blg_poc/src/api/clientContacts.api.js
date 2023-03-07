import alxConnect from './config';

export const getClientContacts = async (clientUUID) => {
    const { clientContacts } = alxConnect;



        let search = {
            "field_client_uuid": clientUUID,
            "field_active": true
        };

        const { payload, success, total } = await clientContacts.v1.getAll({
            limit: 1000,
            ...search,
        });

        if (!success) {
            throw new Error("Unable to retrieve client contacts")
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

export const getClientContactByID = async id => {
    try {
        const { clientContacts } = alxConnect;

        const { payload, success } = await clientContacts.v1.getSingle(id);

        const clientContact = payload;
        return { ...clientContact };
    } catch (e) { }
};

export const editClientContact = async (id = 0, values = {}) => {
    const { clientContacts } = alxConnect;
    const res = await clientContacts.v1.update(id, values);
    console.log("res", res)
    const { success, payload } = res
    return { success, payload };
};

export const createClientContact = async data => {
    const { clientContacts } = alxConnect;

    return await clientContacts.v1.create(data);
};
