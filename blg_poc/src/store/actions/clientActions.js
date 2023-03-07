import { batch } from 'react-redux';
import {
  GET_MATTERS,
  SORT_MATTERS,
  SEARCH_MATTERS,
  SELECT_MATTER,
  ADD_NOTE,
  OPEN_SIDEBAR,
  SHOW_MATTER_DETAIL,
  EDIT_MATTER,
  RESTORE_STATE,
  SET_MATTER_DETAIL,
  RESET_CLIENT_MATTER
} from 'store/constants/clientConstants';
import { addPoll } from 'store/actions/globalActions';
import {
  addError as addErrorAction,
  addAlert as addAlertAction,
  setGlobalLoader,
} from 'store/actions/globalActions';
import {
  clients as mattersApi,
} from 'api';

export const editMatter =
  (id = 0, values = {}, currentMatter = false) =>
    async dispatch => {
      try {
        let { success, editedMatter } = await mattersApi.editMatter(
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

    export const editMatter2 =
  (id = 0, values = {}) =>
    async dispatch => {
      dispatch(setGlobalLoader(true))
      try {
        let { success, payload } = await mattersApi.editMatter2(
          id,
          values
        );

        if (success) {
          dispatch({
            type: SET_MATTER_DETAIL,
            payload: payload
          })
          dispatch({
            type: RESET_CLIENT_MATTER,
            payload: payload
          })
          dispatch(setGlobalLoader(false))
        } else {
          throw new Error(message);
        }
      } catch ({ message }) {
        dispatch(addAlertAction(
          { severity: "error", title: message, content: message }
        ));
        dispatch(setGlobalLoader(false))
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

export const addNote = (id, note, user, date) => async (dispatch, getState) => {
  dispatch({
    type: ADD_NOTE,
    payload: await mattersApi.addNote(
      id,
      Array.isArray(getState().matters.currentMatter.field_notes)
        ? [
          { note, user, date },
          ...getState().matters.currentMatter.field_notes,
        ]
        : [{ note, user, date }]
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
