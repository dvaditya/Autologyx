import type { RootState } from "./rootReducer";
import type { ModuleState } from "./filesReducer";

const R = require("ramda")

export const getFileFolder = (state: RootState, path: Array<string>): ModuleState => {
    const {filesState} = state
    const defaultVal: ModuleState = {
     moduleName: "",
     savedFiles: [],
     unsavedFiles: [],
     subFolders: {}
    }
    const interspersedPath = ["subFolders", ...R.intersperse("subFolders", path)]
    const folder: ModuleState = R.pathOr(defaultVal, interspersedPath, filesState)
    return folder
}