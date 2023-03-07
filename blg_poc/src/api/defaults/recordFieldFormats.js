const formatFields = (data, fields) => {
  const formattedData = {};
  Object.keys(data).forEach(key => {
    if (fields.hasOwnProperty(key)) {
      formattedData[fields[key]] = data[key];
    } else {
      console.error(
        `Data formatting attemptes for create/update: ${key}. Skipping as no formatting found`,
        data
      );
      formattedData[key] = data[key];
    }
  });

  return formattedData;
};

export const TASK_FIELD_FORMATS = {
  assignee: 'field_assignee',
  creator: 'field_creator',
  due_at: 'field_due_date',
  status: 'field_task_status',
  completed_at: 'field_completed_at',
  summary: 'field_summary',
  title: 'field_title',
  matterId: 'field_matter_id',
};

export default formatFields;
