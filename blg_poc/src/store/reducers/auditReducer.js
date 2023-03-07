import {
    GET_AUDITS,
    SORT_AUDITS,
    SELECT_AUDIT,
    SEARCH_AUDITS,
    ADD_NOTE,
    OPEN_SIDEBAR,
    SHOW_AUDIT_DETAIL,
    EDIT_AUDIT,
    RESTORE_STATE,
    SET_AUDIT_DETAIL,
} from 'store/constants/auditConstants';

const defaultAudits = {
    pageIndex: 0,
    pageSize: 0,
    searchQuery: '',
    total: null,
    records: [],
    showAuditDetail: false,
    editingAuditContract: false,
    // Dictates if the sidebar is open
    open: false,
    sortBy: {
        col: 'id',
        dir: 'desc',
    },
    columnOptions: [
        {
            // Key should be the function name
            key: 'selectRecord',
            // Type of function means it will be a passed in columnFuncs function
            label: '',
            type: 'custom',
            width: 150,
        },
        {
            key: 'id',
            label: 'ID',
            width: 100
        },
        {
            key: 'field_name',
            label: 'Audit Name',
            width: 200,
        },
        {
            key: 'field_audit_year',
            label: 'Audit Year',
            width: 200,
        },
        {
            key: 'field_audit_status',
            label: 'Audit Status',
            width: 200,
        },
        {
            key: 'field_owner',
            label: 'Owner',
            width: 200,
        },
        {
            key: 'field_date_of_commencement',
            label: 'Date of Commencement',
            width: 230,
            type: 'date',
        },
        {
            key: 'field_date_of_completion',
            label: 'Date of Completion',
            width: 200,
            type: 'date',
        },
    ],
    currentAudit: null,
    currentAuditCorrespondance: {
        data: [],
        fetched: false,
    },
};

export default (state = defaultAudits, action) => {
    switch (action.type) {
        case GET_AUDITS:
            return { ...state, ...action.payload };

        case SORT_AUDITS:
            return { ...state, sortBy: action.payload };

        case SEARCH_AUDITS:
            return { ...state, searchQuery: action.payload };

        case SELECT_AUDIT:
            let currentAudit =
                action.payload === null
                    ? null
                    : { ...action.payload, relativityFields: null };

            return {
                ...state,
                currentAudit,
            };
       
        case ADD_NOTE:
            return {
                ...state,
                currentAudit: { ...action.payload },
            };

        case OPEN_SIDEBAR:
            return { ...state, open: action.payload };

        case SHOW_AUDIT_DETAIL:
            return { ...state, showAuditDetail: action.payload };

        case EDIT_AUDIT:
            // Dictates whether or not the audit is open in detail view.
            if (action.payload.currentAudit) {
                return {
                    ...state,
                    currentAudit: {
                        ...state.currentAudit,
                        ...action.payload.audit,
                    },
                };
            } else {
                return {
                    ...state,
                    records: state.records.map(audit =>
                        audit.id !== action.payload.audit.id
                            ? audit
                            : action.payload.audit
                    ),
                };
            }
        case SET_AUDIT_DETAIL:
            return {
                ...state,
                currentAudit: {
                    ...state.currentAudit,
                    ...action.payload,
                },
            };
        case RESTORE_STATE:
            return { ...defaultAudits };
        default:
            return state;
    }
};
