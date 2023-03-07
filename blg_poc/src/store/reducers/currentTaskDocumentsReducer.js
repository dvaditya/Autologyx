export default (state = {
    loading: false,
    taskDocuments: []
}, action) => {
    switch (action.type) {
        case "SET_AUDIT_TASK_DOCUMENTS": {
            return {
                loading: false,
                taskDocuments: action.payload
            }
        }
        case "DELETE_CURRENT_TASK_DOCUMENT": {
            return {
                loading: false,
                taskDocuments: state.taskDocuments.filter((doc) => action.payload !== doc.field_document_uuid)
            }
        }
        case "ADD_AUDIT_TASK_DOCUMENT": {
            return {
                loading: false,
                taskDocuments: [...state.taskDocuments, action.payload]
            }
        }
        case "CLEAR_CURRENT_TASK_STATE":
        case "CLEAR_AUDIT_TASK_DOCUMENTS": {
            return {
                loading: false,
                taskDocuments: []
            }
        }
        default: return state
    }
}