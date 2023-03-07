type AlertAction = {
    type: string,
    payload: any
}

export type Alert = {
    severity: string,
    message: string,
    id: string
}

export default (state: Alert[], action: AlertAction): Alert[] => {
    switch(action.type) {
        case "ADD_ALERT": {
            return [...state, action.payload]
        }
        case "REMOVE_ALERT": {
            return state.filter((a) => {
                return a.id !== action.payload
            })
        }
        default: {
            return state
        }
    }
} 