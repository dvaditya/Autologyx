export default (state = {
    loading: false,
    tasks: []
}, action) => {
    switch (action.type) {
        case "SET_AUDIT_TASKS_LOADING": {
            return {
                loading: true,
                tasks: []
            }
        }
        case "SET_AUDIT_TASKS": {
            return {
                loading: false,
                tasks: action.payload
            } 
        }
        case "CLEAR_CURRENT_AUDIT":
        case "CLEAR_AUDIT_TASKS": {
            return {
                loading: false,
                tasks: []
            }
        }
        default: return state
    }
}