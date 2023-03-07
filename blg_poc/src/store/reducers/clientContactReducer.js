const defaultState = []

export default (state = defaultState, action) => {
    switch(action.type) {
        case "SET_CLIENT_CONTACTS": {
            return action.payload
        }
        case "CLEAR_CURRENT_AUDIT":
        case "CLEAR_CLIENT_CONTACTS": {
            return []
        }
        case "APPEND_CLIENT_CONTACT": {
            return [...state, action.payload]
        }
        case "UPDATE_CLIENT_CONTACT": {
            return state.reduce((acc, contact) => {
                if(contact.id === action.payload.id) {
                    return [...acc, action.payload]
                } else {
                    return [...acc, contact]
                }
            }, [])
        }
        case "DELETE_CLIENT_CONTACT": {
            return state.filter((contact) => {
                return contact.id !== action.id
            })
        }
        default: return state
    }
}