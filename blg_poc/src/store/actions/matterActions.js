import axios from 'axios';
import { batch } from 'react-redux';
import {
  GET_MATTERS,
  SORT_MATTERS,
  SEARCH_MATTERS,
  SELECT_MATTER,
  ADD_TASK,
  EDIT_MATTER_TASK,
  ADD_NOTE,
  OPEN_SIDEBAR,
  SHOW_MATTER_DETAIL,
  EDIT_MATTER,
  RESTORE_STATE,
  UPDATE_MATTER_FILES,
  UPDATE_RELATIVITY_FIELDS,
  SET_CURRENT_MATTER_CORRESPONDANCE,
} from 'store/constants/matters.consts';
import { addPoll } from 'store/actions/globalActions';
import {
  addError as addErrorAction,
  addAlert as addAlertAction,
} from 'store/actions/globalActions';
import { GET_NEW_DOCUMENT, GET_UPDATED_MATTERS } from 'store/polling/polling.const';
import {
  matters as mattersApi,
  tasks as tasksApi,
  relativity as relativityApi,
  correspondence as correspondenceApi,
} from 'api';

export const editMatter =
  (id = 0, values = {}, currentMatter = false) =>
  async dispatch => {
    try {
      let { success, editedMatter } = await mattersApi.editmattersApi(
        id,
        values,
        currentMatter
      );

      if (success) {
        dispatch({
          type: EDIT_MATTER,
          payload: { matter: editedMatter, currentMatter },
        });
      } else {
        throw new Error(message);
      }
    } catch ({ message }) {
      dispatch(addAlertAction(
        { severity: "error", title: message, content: message }
      ));
    }
  };

export const getMatters =
  ({ pageIndex, pageSize, sortBy, searchQuery = '' }) =>
  async dispatch => {
    try {
      let matters = await mattersApi.getMatters({
        pageIndex,
        pageSize,
        sortBy,
        searchQuery,
      });

      if (matters.success) {
        dispatch({
          type: GET_MATTERS,
          payload: await mattersApi.getMatters({
            pageIndex,
            pageSize,
            sortBy,
            searchQuery,
          }),
        });
      } else {
        throw new Error(message);
      }
    } catch ({ message }) {
      dispatch(addAlertAction(
        { severity: "error", title: message, content: message }
      ));
    }
  };

export const getClaims = () => async dispatch => {

  dispatch(
    addPoll({
      key: GET_NEW_DOCUMENT,
      data: {
        docId: payload.id,
        claimId,
      },
    })
  );
}

export const sortMatters = sortBy => async dispatch => {
  try {
    if (sortBy) {
      dispatch({
        type: SORT_MATTERS,
        payload: sortBy,
      });
    } else {
      throw new Error(message);
    }
  } catch ({ message }) {
    dispatch(addAlertAction(
      { severity: "error", title: message, content: message }
    ));
  }
};

export const searchMatters = query => async dispatch => {
  dispatch({
    type: SEARCH_MATTERS,
    payload: query,
  });
};

export const selectMatter = id => async dispatch => {
  try {
    let payload = await mattersApi.getMatterByID(id);

    if (id) {
      dispatch({
        type: SELECT_MATTER,
        payload: payload,
      });
    } else {
      throw new Error(message);
    }
  } catch ({ message }) {
    dispatch(addAlertAction(
      { severity: "error", title: message, content: message }
    ));
  }
};

export const deselectMatter = () => async dispatch => {
  dispatch({
    type: SELECT_MATTER,
    payload: null,
  });
};

export const initiateRelativityCall =
  (id, onSuccess = () => true, onErr = () => true) =>
  async dispatch => {
    try {
      let { payload, success } = await relativityApi.initiateRelativityCall(id);

      if (success) {
        // Handle success
        onSuccess();
      } else {
        throw new Error(message);
      }
    } catch ({ message }) {
      dispatch(addAlertAction(
        { severity: "error", title: message, content: message }
      ));
      onErr();
    }
  };

export const getRelativityData = id => async dispatch => {
  try {
    let { payload, success } = await relativityApi.getRelativityData(id);

    dispatch({
      type: UPDATE_RELATIVITY_FIELDS,
      payload,
    });

    if (success) {
      // Handle success
    } else {
      throw new Error(message);
    }
  } catch ({ message }) {
    dispatch(addAlertAction(
      { severity: "error", title: message, content: message }
    ));
  }
};

export const addTask = task => async dispatch => {
  dispatch({
    type: ADD_TASK,
    payload: await tasksApi.addTask(task),
  });
};

export const editCurrentTask = (id, data) => async dispatch => {
  dispatch({
    type: EDIT_MATTER_TASK,
    payload: await tasksApi.editTask(id, data),
  });
};

export const addNote = (id, note, user, date) => async (dispatch, getState) => {
  dispatch({
    type: ADD_NOTE,
    payload: await mattersApi.addNote(
      id,
      Array.isArray(getState().matters.currentMatter.field_notes) ? [{ note, user, date }, ...getState().matters.currentMatter.field_notes] : [{ note, user, date }]
    ),
  });
};

export const addTaskNote = (id, note, user, date) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TASK_NOTE,
    payload: await mattersApi.addNote(
      id,
      Array.isArray(getState().tasks.currentTask.task_notes) ? [...getState().tasks.currentTask.task_notes, { note, user, date }] : [{ note, user, date }]
    ),
  });
};

export const openSidebar = open => async dispatch => {
  dispatch({
    type: OPEN_SIDEBAR,
    payload: open,
  });
};

export const toggleMatterDetail = show => async dispatch => {
  batch(() => {
    dispatch({
      type: SHOW_MATTER_DETAIL,
      payload: show,
    });

    dispatch({
      type: OPEN_SIDEBAR,
      payload: show,
    });
  });

  if (!show) {
    // dispatch({
    //   type: COPY_MATTER_DETAILS_TO_TABLE,
    // });

    dispatch({
      type: SELECT_MATTER,
      payload: null,
    });
  }
};

export const hideMatterDetailOnly = show => async dispatch => {
  dispatch({
    type: SHOW_MATTER_DETAIL,
    payload: false,
  });
};

// Remove all state for the matter table, to be called on unmount
export const resetMattersTable = () => async dispatch => {
  batch(() => {
    dispatch({
      type: SELECT_MATTER,
      payload: null,
    });
    dispatch({
      type: SEARCH_MATTERS,
      payload: '',
    });
    dispatch({
      type: SORT_MATTERS,
      payload: {
        col: 'id',
        dir: 'desc',
      },
    });
  });
};

export const clearMatterState = () => async dispatch => {
  dispatch({
    type: RESTORE_STATE,
  });
};

export const updateMatterFiles = files => async dispatch => {
  dispatch({
    type: UPDATE_MATTER_FILES,
    payload: files,
  });
};

export const getNewDocument = (claimId, data, onSuccess) => async dispatch => {
  let { payload, success, msg } = await correspondenceApi.generateDocument(data);

  try {
    if (success) {
      onSuccess();

      batch(() => {
        dispatch(
          addPoll({
            key: GET_NEW_DOCUMENT,
            data: {
              docId: payload.id,
              claimId,
            },
          })
        );

        dispatch(
          addAlertAction({
            severity: 'info',
            title: 'Draft Document being Generated',
            content:
              'Your draft document is being generated and will be available shortly.',
          })
        );
      });
    } else {
      dispatch(
        addAlertAction({
          severity: 'error',
          title: 'Document Generation Failed',
          content: Object.values(msg.response.data),
        })
      );
      throw new Error(message);
    }
  } catch ({ message }) {
    dispatch(addAlertAction(
      { severity: "error", title: message, content: message }
    ));
  }
};

export const editCorrespondance =
  (id, data, file = false, onSuccess, title = false, content = false) =>
  async dispatch => {
    let { payload, success } = await correspondenceApi.editCorrespondance(
      id,
      data,
      file
    );

    try {
      if (success) {
        dispatch(
          addAlertAction({
            title: title ? title : 'Document Processed',
            content: content ? content : 'Your document has now been sent for processing.',
          })
        );

        dispatch({
          type: EDIT_TASK,
          payload: data,
        });

        onSuccess();
      } else {
        throw new Error(message);
      }
    } catch ({ message }) {
      dispatch(addAlertAction(
        { severity: "error", title: message, content: message }
      ));
    }
  };

export const getCorrespondance = id => async dispatch => {
  let { payload, success } = await correspondenceApi.getCorrespondance(id);

  try {
    if (success) {

      dispatch({
        type: SET_CURRENT_MATTER_CORRESPONDANCE,
        payload: payload,
      });
      onSuccess();
    } else {
      throw new Error(message);
    }
  } catch ({ message }) {
    dispatch(addAlertAction(
      { severity: "error", title: message, content: message }
    ));
  }
};

export const getUpdatedCorrespondance = (id) =>  async dispatch => {
  dispatch(
    addPoll({
      key: GET_UPDATED_MATTERS,
      data: {
        id
      },
    })
  );
}

export const deselectCorrespondanceMatter = () => async dispatch => {
  dispatch({
    type: SET_CURRENT_MATTER_CORRESPONDANCE,
    payload: null,
  });
};
