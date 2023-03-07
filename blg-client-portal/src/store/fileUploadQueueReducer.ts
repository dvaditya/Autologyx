import type { UnsavedFile } from "./filesReducer";

const R = require("ramda")

export type FileUploadQueue = Array<UnsavedFile>

export default (state: FileUploadQueue, action: {type: string, payload: any}): Array<UnsavedFile> => {
    switch(action.type) {
        case "PUSH_FILE_UPLOAD": {
            return [...state, action.payload]
        }
        case "POP_FILE_UPLOAD": {
            return R.drop(1, state)
        }
        case "REMOVE_MULTIPLE_FILE_UPLOAD": {
            return state.filter((item) => {
                return !action.payload[item.id]
            })
        }
        default: {
            return state
        }

    }
}