

export default (state = {}, action) => {
    switch(action.type) {
        case "SET_CURRENT_AUDIT": {
            return action.payload
        }
        case "CLEAR_CURRENT_TASK_STATE":
        case "CLEAR_CURRENT_AUDIT": {
            return {}
        }
        default: return state
    }
}