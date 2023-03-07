import store from 'store/store';
import {
  UPLOAD_NEW_DOCUMENT_TEMPLATE,
  TEST_DOCUMENT_TEMPLATE,
  GET_NEW_DOCUMENT,
  GET_UPDATED_MATTERS
} from './polling.const';
import { templates as templatesApi } from 'api';
import { EDIT_TEMPLATE } from 'store/constants/documentTemplate.consts';
import { SET_MATTER_DETAIL, GET_UPDATED_CORRESPONDANCE } from 'store/constants/matters.consts';
import { VIEW_DOCUMENT } from '../alerts/alert.consts';
import { addAlert as addAlertAction } from 'store/actions/globalActions';
import { 
  correspondence as correspondenceApi,
  matters as mattersApi, 
} from 'api';
import { batch } from 'react-redux';

const getCurrentTemplate = id => {
  return store.getState().documentTemplate.templates.find(t => t.id === id);
};

const uploadNewDocumentTemplate = async ({ id }, complete) => {
  const { success, payload } = await templatesApi.getTemplateById(id);
  const currentTemplate = getCurrentTemplate(id);

  if (success) {
    if (
      payload.template_files.length !== currentTemplate.template_files.length
    ) {
      complete();
      store.dispatch({
        type: EDIT_TEMPLATE,
        payload: payload,
      });
    }
  } else {
    // TODO handle error
  }
};

const testDocumentTemplate = async ({ id }, complete) => {
  try {
    const { success, payload } = await templatesApi.getTemplateById(id);

    if (success) {
      if (payload.drafted_document !== null) {
        complete();

        store.dispatch(
          addAlertAction({
            title: 'Test Document Generated',
            content: 'Your test document is now available.',
            buttonText: 'Download',
            type: VIEW_DOCUMENT,
            data: {
              file: payload.drafted_document,
              fileName: payload.name,
            },
          })
        );
      }
    } else {
      throw new Error('Test document GET not working.');
    }
  } catch ({ message }) {
    // TODO handle error
  }
};

const getDocument = async ({ docId }, complete) => {
  try {
    let { success, payload } = await correspondenceApi.getCorrespondenceById(
      docId
    );

    if (!success) {
      throw new Error('Get document error');
    }

    if (payload.field_task_allocation === 'Yes') {
      batch(() => {
        store.dispatch({
          type: SET_MATTER_DETAIL,
          payload: {
            correspondance: payload,
          },
        });
  
        store.dispatch({
          type: SET_USER_GENERATED_DOCUMENT,
          payload: false,
        });
  
        store.dispatch(
          addAlertAction({
            title: 'Draft Document Generated',
            content: 'Your draft document is now available for processing.',
          })
        );
      });
      complete();
    }
  } catch ({ message }) {
    // TO DO - ADD UI ERROR
  }

  // await api.v1.getSingle(data.id)
  // Get ID from Data and then search correspondence
};

const getUpdatedCorrespondance = async ({ id }, complete) => {
  try {
    let { success, payload } = await correspondenceApi.getCorrespondance(
      id
    );

    if (!success) {
      throw new Error('Get document error');
    }

    if(success) {
      store.dispatch({
        type: GET_UPDATED_CORRESPONDANCE,
        payload
      });
    }
    complete();
  } catch ({ message }) {
    // TO DO - ADD UI ERROR
  }
}

export default {
  [UPLOAD_NEW_DOCUMENT_TEMPLATE]: uploadNewDocumentTemplate,
  [TEST_DOCUMENT_TEMPLATE]: testDocumentTemplate,
  [GET_NEW_DOCUMENT]: getDocument,
  [GET_UPDATED_MATTERS]: getUpdatedCorrespondance
};
