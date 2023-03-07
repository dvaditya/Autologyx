import type { UnsavedFile } from "./filesReducer";

const R = require("ramda")

export type InProgressQueue = Array<UnsavedFile>

export default (state: InProgressQueue, action: {type: string, payload: any}): Array<UnsavedFile> => {
    switch(action.type) {
        case "ADD_UNSAVED_IN_PROGRESS": {
            return [...state, ...action.payload]
        }
        case "REMOVE_UNSAVED_IN_PROGRESS": {
            return state.filter((item) => item.id !== action.payload)
        }
        default: {
            return state
        }

    }
}