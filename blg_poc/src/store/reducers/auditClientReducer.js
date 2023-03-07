
export default (state = {}, action) => {
    switch(action.type) {
        case "SET_CURRENT_AUDIT_CLIENT": {
            return action.payload
        }
        case "CLEAR_CURRENT_AUDIT":
        case "CLEAR_CURRENT_AUDIT_CLIENT": {
            return {}
        }
        default: return state
    }
}