type CurrentPathAction = {
    type: string,
    payload: any
}

export default (state: string[], action: CurrentPathAction): string[] => {
    switch(action.type) {
        case "SET_CURRENT_PATH": {
            return action.payload
        }
        default: {
            return state
        }
    }
} 