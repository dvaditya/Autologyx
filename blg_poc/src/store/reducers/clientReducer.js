import {
    GET_MATTERS,
    SORT_MATTERS,
    SELECT_MATTER,
    SEARCH_MATTERS,
    ADD_TASK,
    EDIT_MATTER_TASK,
    ADD_NOTE,
    OPEN_SIDEBAR,
    SHOW_MATTER_DETAIL,
    EDIT_MATTER,
    RESTORE_STATE,
    UPDATE_MATTER_FILES,
    UPDATE_RELATIVITY_FIELDS,
    SET_MATTER_DETAIL,
    RESET_CLIENT_MATTER,
    SET_CURRENT_MATTER_CORRESPONDANCE,
    GET_UPDATED_CORRESPONDANCE
} from 'store/constants/clientConstants';

const defaultMatters = {
    pageIndex: 0,
    pageSize: 0,
    searchQuery: '',
    total: null,
    records: [],
    showMatterDetail: false,
    editingMatterContract: false,
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
            key: 'field_company_name',
            label: 'Name',
            width: 200,
        },
        {
            key: 'field_street',
            label: 'Street',
            width: 200,
        },
        {
            key: 'field_city',
            label: 'City',
            width: 200,
        },
        {
            key: 'field_province',
            label: 'Province',
            width: 200,
        },
        {
            key: 'field_country',
            label: 'Country',
            width: 200,
        },
        {
            key: 'field_postal_code',
            label: 'Postal Code',
            width: 200,
        },
        {
            key: 'field_categories_registration',
            label: 'Categories Registration',
            width: 250,
        },
    ],
    currentMatter: null,
    currentMatterCorrespondance: {
        data: [],
        fetched: false,
    },
};

export default (state = defaultMatters, action) => {
    switch (action.type) {
        case GET_MATTERS:
            return { ...state, ...action.payload };

        case SORT_MATTERS:
            return { ...state, sortBy: action.payload };

        case SEARCH_MATTERS:
            return { ...state, searchQuery: action.payload };

        case SELECT_MATTER:
            let currentMatter =
                action.payload === null
                    ? null
                    : { ...action.payload, relativityFields: null };

            return {
                ...state,
                currentMatter,
            };
     
        case ADD_NOTE:
            return {
                ...state,
                currentMatter: { ...action.payload },
            };

        case OPEN_SIDEBAR:
            return { ...state, open: action.payload };

        case SHOW_MATTER_DETAIL:
            return { ...state, showMatterDetail: action.payload };

        case EDIT_MATTER:
            // Dictates whether or not the matter is open in detail view.
            if (action.payload.currentMatter) {
                return {
                    ...state,
                    currentMatter: {
                        ...state.currentMatter,
                        ...action.payload.matter,
                    },
                };
            } else {
                return {
                    ...state,
                    records: state.records.map(matter =>
                        matter.id !== action.payload.matter.id
                            ? matter
                            : action.payload.matter
                    ),
                };
            }
        case SET_MATTER_DETAIL:
            return {
                ...state,
                currentMatter: {
                    ...state.currentMatter,
                    ...action.payload,
                },
            };
        case RESET_CLIENT_MATTER:
            return {
                ...state,
                records: state.records.map(matter =>
                    matter.id !== action.payload.id
                        ? matter
                        : action.payload
                ),
            };
        case RESTORE_STATE:
            return { ...defaultMatters };
        default:
            return state;
    }
};
