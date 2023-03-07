import alxConnect from './config';

import { CONFIGURATION_NAME } from 'consts/general';

export const getConfig = async () => {
  const { templates } = alxConnect;

  try {
    const { success, payload } = await templates.v1.getAll({
      field_name: CONFIGURATION_NAME,
    });

    if (!success) {
      throw new Error('Get docassemble config error.');
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

export const updateConfig = async (data, id = 0) => {
  const { templates } = alxConnect;

  try {
    // Update
    if (!!id) {
      const { success, payload } = await templates.v1.update(id, {
        field_configuration_parameters: JSON.stringify(data),
      });

      if (!success) {
        throw new Error('Update docassemble config error.');
      }
      return {
        success,
        payload: payload,
      };
      // create
    } else {
      const { success, payload } = await templates.v1.create({
        field_name: CONFIGURATION_NAME,
        field_configuration_parameters: JSON.stringify(data),
      });
      if (!success) {
        throw new Error('Create docassemble config error.');
      }
      return {
        success,
        payload: payload,
      };
    }
  } catch ({ message }) {
    return {
      message,
      success: false,
      payload: [],
    };
  }
};
