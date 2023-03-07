import alxConnect from './config';
import {
  defaultRecord,
  TEMPLATE_DEFAULTS,
} from './defaults/recordFieldDefaults';
import { excludeList } from 'consts/general';

export const getAvailableFields = async () => {
  const { correspondence } = alxConnect;

  try {
    const { success, payload } = await correspondence.v2.getFields();

    if (!success) {
      throw new Error('Get vailable fields error.');
    }

    return {
      success,
      payload,
    };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

export const getTemplates = async () => {
  const { templates } = alxConnect;

  try {
    const { success, payload } = await templates.v1.getAll({
      limit: 1000,
    });

    if (!success) {
      throw new Error('Get templates error.');
    }

    const records = payload.objects
      .map(template => defaultRecord(template, TEMPLATE_DEFAULTS))
      // Ensure we filter out the configuration object.
      .filter(t => !excludeList.includes(t.name));

    return { success, payload: records };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

export const getTemplateById = async id => {
  const { templates } = alxConnect;

  try {
    const { success, payload } = await templates.v1.getSingle(id);

    if (!success) {
      throw new Error('Get templates error.');
    }

    return { success, payload: defaultRecord(payload, TEMPLATE_DEFAULTS) };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

export const createTemplate = async data => {
  const { templates } = alxConnect;

  try {
    const { success, payload } = await templates.v1.create({
      ...data,
    });

    if (!success) {
      throw new Error('Create template error.');
    }

    return { success, payload: defaultRecord(payload, TEMPLATE_DEFAULTS) };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

export const editTemplate = async (templatedId, templateData, file = false) => {
  const { templates } = alxConnect;

  try {
    const { success, payload } = await templates.v2.update(
      templatedId,
      templateData,
      file
        ? [
            {
              file,
              fieldName: 'field_new_template',
              fileName: templateData.field_name,
            },
          ]
        : []
    );

    if (!success) {
      throw new Error('Update template error.');
    }

    return {
      success,
      payload: {
        id: templatedId,
        fields: defaultRecord(templateData, TEMPLATE_DEFAULTS),
      },
    };
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};

export const getDocumentTemplates = async () => {
  const { templates } = alxConnect;

  let { success, ...rest } = await templates.v2.getAll();

  return { success, ...rest };
};
