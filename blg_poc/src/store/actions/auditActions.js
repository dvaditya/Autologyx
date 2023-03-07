import axios from 'axios';
import { batch } from 'react-redux';
import {
    GET_AUDITS,
    SORT_AUDITS,
    SEARCH_AUDITS,
    SELECT_AUDIT,
    ADD_NOTE,
    OPEN_SIDEBAR,
    SHOW_AUDIT_DETAIL,
    EDIT_AUDIT,
    RESTORE_STATE,
} from 'store/constants/auditConstants';
import { addPoll } from 'store/actions/globalActions';
import {
    addError as addErrorAction,
    addAlert as addAlertAction,
    setGlobalLoader,
} from 'store/actions/globalActions';
import {
    audits as auditsApi,
} from 'api';

export const editAudit =
    (id = 0, values = {}, currentAudit = false) =>
        async dispatch => {
            try {
                let { success, editedAudit } = await auditsApi.editAudit(
                    id,
                    values,
                    currentAudit
                );

                if (success) {
                    dispatch({
                        type: EDIT_AUDIT,
                        payload: { audit: editedAudit, currentAudit },
                    });
                } else {
                    throw new Error(message);
                }
            } catch ({ message }) {
                dispatch(addAlertAction(
                    {severity: "error", title: message, content: message}
                ));
            }
        };

export const getAudits =
    ({ pageIndex, pageSize, sortBy, searchQuery = '' }) =>
        async dispatch => {
            try {
                let audits = await auditsApi.getAudits({
                    pageIndex,
                    pageSize,
                    sortBy,
                    searchQuery,
                });

                if (audits.success) {
                    dispatch({
                        type: GET_AUDITS,
                        payload: await auditsApi.getAudits({
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
                    {severity: "error", title: message, content: message}
                ));
            }
        };

export const sortAudits = sortBy => async dispatch => {
    try {
        if (sortBy) {
            dispatch({
                type: SORT_AUDITS,
                payload: sortBy,
            });
        } else {
            throw new Error(message);
        }
    } catch ({ message }) {
        dispatch(addAlertAction(
            {severity: "error", title: message, content: message}
        ));
    }
};

export const searchAudits = query => async dispatch => {
    dispatch({
        type: SEARCH_AUDITS,
        payload: query,
    });
};

export const selectAudit = id => async dispatch => {
    try {
        let payload = await auditsApi.getAuditByID(id);

        if (id) {
            dispatch({
                type: SELECT_AUDIT,
                payload: payload,
            });
        } else {
            throw new Error(message);
        }
    } catch ({ message }) {
        dispatch(addAlertAction(
            {severity: "error", title: message, content: message}
        ));
    }
};

export const deselectAudit = () => async dispatch => {
    dispatch({
        type: SELECT_AUDIT,
        payload: null,
    });
};

export const addNote = (id, note, user, date) => async (dispatch, getState) => {
    dispatch({
        type: ADD_NOTE,
        payload: await auditsApi.addNote(
            id,
            Array.isArray(getState().audits.currentAudit.field_notes)
                ? [
                    { note, user, date },
                    ...getState().audits.currentAudit.field_notes,
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

export const toggleAuditDetail = show => async dispatch => {
    batch(() => {
        dispatch({
            type: SHOW_AUDIT_DETAIL,
            payload: show,
        });

        dispatch({
            type: OPEN_SIDEBAR,
            payload: show,
        });
    });

    if (!show) {
        // dispatch({
        //   type: COPY_AUDIT_DETAILS_TO_TABLE,
        // });

        dispatch({
            type: SELECT_AUDIT,
            payload: null,
        });
    }
};

export const hideAuditDetailOnly = show => async dispatch => {
    dispatch({
        type: SHOW_AUDIT_DETAIL,
        payload: false,
    });
};

// Remove all state for the audit table, to be called on unmount
export const resetAuditsTable = () => async dispatch => {
    batch(() => {
        dispatch({
            type: SELECT_AUDIT,
            payload: null,
        });
        dispatch({
            type: SEARCH_AUDITS,
            payload: '',
        });
        dispatch({
            type: SORT_AUDITS,
            payload: {
                col: 'id',
                dir: 'desc',
            },
        });
    });
};

export const clearAuditState = () => async dispatch => {
    dispatch({
        type: RESTORE_STATE,
    });
};

export const createAudit = (clientUUID, clientName) => async (dispatch, getState) => {
    try {
        const year = new Date().getFullYear
        const audit = await auditsApi.createAudit({
            field_client_uuid: clientUUID,
            field_audit_year: year,
            field_name: `${clientName} - ${year}`,
            field_owner: getState()?.user?.email,
            field_tasks_created: false,
            field_date_of_commencement: new Date().toISOString()
        })
    } catch(e) {
        console.log(e)
        dispatch(addAlertAction(
            {severity: "error", title: "Unable to create audit, please try again", content: "Unable to create audit, please try again"}
        ));
    }
}

