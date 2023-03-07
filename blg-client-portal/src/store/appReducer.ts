type AppConfigAction = {
    type: string,
    payload: number | boolean | string
}

export type AppState = {
    currentModule: number,
    pageLoaderOpen: boolean,
    unrecoverableErrorMessage: string
}

export default (state: AppState, action: AppConfigAction): AppState => {
    switch(action.type) {
        case "SET_CURRENT_MODULE": {
            return {
                ...state,
                currentModule: action.payload as number
            }
        }
        case "SET_PAGE_LOADER": {
            return {
                ...state,
                pageLoaderOpen: action.payload as boolean
            }
        }
        case "SET_UNRECOVERABLE_MESSAGE": {
            return {
                ...state,
                unrecoverableErrorMessage: action.payload as string
            }
        }
        default: return state
    }
}