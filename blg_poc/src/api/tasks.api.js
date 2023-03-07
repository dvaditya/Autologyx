import alxConnect from './config';

export const getTaskByID = async id => {

  const { tasks } = alxConnect;

  const res = await tasks.v1.getSingle(id);
  const {payload, success} = res
  const task = payload;
  if (!success) {
    throw new Error("Unable to retrieve task")
  }
  return { ...task };
};

export const getTasksByAuditUUID = async (auditUUID) => {
  const { tasks } = alxConnect;



  let search = {
    "field_audit_uuid": auditUUID
  };

  const { payload, success, total } = await tasks.v1.getAll({
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


export const getTasks = async ({
  pageIndex,
  pageSize,
  sortBy,
  searchQuery,
}) => {
  const { tasks } = alxConnect;

  let ordering = {};

  if (sortBy.col !== 'id') {
    const sortField = TASK_FIELD_FORMATS[sortBy.col];
    ordering = {
      order_by: `${sortBy.dir === 'desc' ? '-' : ''}${sortField}`,
    };
  }
  const { payload, success } = await tasks.v1.getAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    ...ordering,
  });

  if (!success) {
    return {};
  }

  const _records = payload.objects.map(record =>
    defaultRecord(record, TASK_DEFAULTS)
  );

  return {
    records: _records,
    total: payload.meta.total_count,
    pageSize: payload.meta.limit,
    pageIndex: payload.meta.offset,
    pageCount: Math.ceil(payload.meta.total_count / payload.meta.limit),
  };
};

export const addTask = async data => {
  const { tasks } = alxConnect;
  return await tasks.v1.create(
    data
  );

};

export const editTask = async (id, data) => {
  const { tasks } = alxConnect;
  return await tasks.v1.update(
    id,
    data
  );
};
