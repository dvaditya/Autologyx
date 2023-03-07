import alxConnect from './config';

export const getClientByUUID = async (clientUUID) => {
  const { clients } = alxConnect;



      let search = {
          "field_client_uuid": clientUUID
      };

      const { payload, success, total } = await clients.any.getAll({
          limit: 1,
          ...search,
      });
      

      if (!success || total !== 1) {
          throw new Error("Unable to retrieve client")
      }

      return payload[0];

  
};

export const getMatters = async ({
  pageIndex,
  pageSize,
  sortBy,
  searchQuery,
}) => {
  const { clients } = alxConnect;

  try {
    if (process.env.NODE_ENV === 'test') {
      const { payload, success } = await clients.v1.getAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
      });

      if (!success) {
        return {};
      }

      console.log('payload', payload)

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

      const { payload, success, total } = await clients.any.getAll({
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

export const getMatterByID = async id => {
  try {
    const { clients, tasks } = alxConnect;

    const { payload, success } = await clients.v1.getSingle(id);

    const matter = payload;
    return { ...matter };
  } catch (e) {}
};

export const deleteMatterByID = async id => {
  try {
    const { clients } = alxConnect;

    await clients.v2.deleteSingle(id);

  } catch (e) {}
  
}

export const editMatter = async (id = 0, values = {}) => {
  const { clients } = alxConnect;
  const newValues = {};

  Object.keys(values).forEach(value => {
    newValues[`field_${value}`] = values[value];
  });

  const { success, payload } = await clients.v1.update(id, newValues);

  const editedMatter = defaultRecord(payload, CLAIM_DEFAULTS);

  return { success, editedMatter };
};

export const editMatter2 = async (id = 0, values = {}) => {
  const { clients } = alxConnect;
  const { success, payload } = await clients.v1.update(id, values);
  return { success, payload };
};

export const createMatter = async data => {
  const { clients } = alxConnect;

  return await clients.v1.create(data);
};

export const uploadMatterFile = async (id, file) => {
  const { clients } = alxConnect;

  const { payload, success } = await clients.v2.upload(id, {
    field: 'field_clients_work_documents',
    file: file,
  });
};

export const addNote = async (id, notes) => {
  const { clients } = alxConnect;

  const { success, payload } = await clients.v1.update(id, {
    field_notes: notes,
  });

  if(success) {
    return payload
  } else {
    return []
  }
};

export const getContracts = async () => {
  const { contracts } = alxConnect;
  const { payload, success } = await contracts.v1.getAll();
  return payload.objects.map(contract =>
    defaultRecord(contract, CONTRACT_DEFAULTS)
  );
};

export const setMatterContract = async (matter, contract) => {
  const { clients } = alxConnect;

  let contracts = [];

  if (typeof matter !== 'undefined') {
    // Remove item
    if (!contract.selectedProvisions.length) {
      contracts = matter.contracts.filter(c => c.id !== contract.id);

      // Add/Update item if selected
    } else {
      let existingContract = matter.contracts.find(c => c.id === contract.id);

      // Add new contract
      if (typeof existingContract === 'undefined') {
        contracts = [
          ...matter.contracts,
          {
            ...contract,
            // Add application
            selectedProvisions: contract.selectedProvisions.map(pId => ({
              id: pId,
              application: '',
            })),
          },
        ];

        // Update existing contract
      } else {
        contracts = matter.contracts.map(c => {
          if (c.id === contract.id) {
            // Map provisions, so that we don't lose application detail
            c.selectedProvisions = contract.selectedProvisions.map(pId => {
              let existingProvision = existingContract.selectedProvisions.find(
                p => p.id === pId
              );

              return {
                id: pId,
                application:
                  typeof existingProvision !== 'undefined'
                    ? existingProvision.application
                    : '',
              };
            });
          }

          return c;
        });
      }
    }
  }

  const { payload, success } = await clients.v1.update(matter.id, {
    field_contracts: contracts,
  });

  return defaultRecord(payload, CLAIM_DEFAULTS);
};

export const editMatters = async (data, id) => {
  const { clients } = alxConnect;

  const { payload, success } = await clients.v1.update(id, data);
};

export const editMatterProvisionApplication = async (
  matter,
  contractID,
  provisionID,
  application
) => {
  const { clients } = alxConnect;

  const contracts = matter.contracts.map(contract => {
    if (contract.id === contractID) {
      contract.selectedProvisions = contract.selectedProvisions.map(
        provision => {
          if (provision.id === provisionID) {
            provision.application = application;
          }
          return provision;
        }
      );
    }
    return contract;
  });

  const { payload, success } = await clients.v1.update(matter.id, {
    field_contracts: contracts,
  });

  return defaultRecord(payload, CLAIM_DEFAULTS);
};
