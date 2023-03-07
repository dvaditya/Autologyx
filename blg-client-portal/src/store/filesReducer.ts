const R = require("ramda")

export type SavedFile = {
    id: string,
    path: [string]
    fileName: string,
    type: string,
    extension: string,
    size: number,
    dateCreated: string,
    createdBy: string
}

export type UnsavedFile = {
    id: string,
    path: [string]
    fileName: string,
    fileObject: File,
    type: string,
    extension: string,
    size: number,
    failed: boolean
}

export type ModuleState = {
    moduleName: string,
    savedFiles: Array<SavedFile>,
    unsavedFiles: Array<UnsavedFile>,
    subFolders: {[key: string]: ModuleState}
}

export type ModulesState = ModuleState//{[key: string]: ModuleState}

type FilesAction = {
    type: string,
    payload: any
}

const insertSavedFileAtModulePath = (path: Array<string>, state: ModulesState, savedFile: SavedFile): ModulesState => {
    if(path.length === 0) {
        return {
            ...state, 
            savedFiles: [...state.savedFiles, savedFile]
        }
    } else if (state.subFolders[path[0]]) {
        return {
            ...state,
            subFolders: {
                ...state.subFolders,
                [path[0]]: insertSavedFileAtModulePath(R.tail(path), state.subFolders[path[0]], savedFile)
            }
        }
    } else {
        const newSubFolder: ModuleState = {
            moduleName: path[0],
            savedFiles: [],
            unsavedFiles: [],
            subFolders: {}
        }
        return {
            ...state,
            subFolders: {
                ...state.subFolders,
                [path[0]]: insertSavedFileAtModulePath(R.tail(path), newSubFolder, savedFile)
            }
        }
    }
}

const insertUnSavedFileAtModulePath = (path: Array<string>, state: ModulesState, unsavedFile: UnsavedFile): ModulesState => {
    if(path.length === 0) {
        return {
            ...state, 
            unsavedFiles: [...state.unsavedFiles, unsavedFile]
        }
    } else if (state.subFolders[path[0]]) {
        return {
            ...state,
            subFolders: {
                ...state.subFolders,
                [path[0]]: insertUnSavedFileAtModulePath(R.tail(path), state.subFolders[path[0]], unsavedFile)
            }
        }
    } else {
        const newSubFolder: ModuleState = {
            moduleName: path[0],
            savedFiles: [],
            unsavedFiles: [],
            subFolders: {}
        }
        return {
            ...state,
            subFolders: {
                ...state.subFolders,
                [path[0]]: insertUnSavedFileAtModulePath(R.tail(path), newSubFolder, unsavedFile)
            }
        }
    }
}

export default (state: ModulesState, action: FilesAction): ModulesState => {
    switch (action.type) {
        case "SET_MODULES_STATE": {
            return action.payload
        }
        case "SET_SAVED_FILE": {
            const {path, savedFile} = action.payload
            return insertSavedFileAtModulePath(path, state, savedFile)
        }  
        case "DELETE_SAVED_FILE": {
            const {path, id} = action.payload
            const interspersedPath = ["subFolders", ...R.intersperse("subFolders", path)]
            const folder: ModuleState = R.path(interspersedPath, state)
            folder.savedFiles = folder.savedFiles.filter((f) => f.id !== id)
            return {...state}
        }
        case "SET_UNSAVED_FILE": {
            const {path, unSavedFile} = action.payload
            return insertUnSavedFileAtModulePath(path, state, unSavedFile)
        }  
        case "DELETE_UNSAVED_FILE": {
            const {path, id} = action.payload
            const interspersedPath = ["subFolders", ...R.intersperse("subFolders", path)]
            const folder: ModuleState = R.path(interspersedPath, state)
            folder.unsavedFiles = folder.unsavedFiles.filter((f) => f.id !== id)
            return {...state}
        }
        case "UPDATE_UNSAVED_FILE": {
            const {path, unSavedFile} = action.payload
            const interspersedPath = ["subFolders", ...R.intersperse("subFolders", path)]
            const folder: ModuleState = R.path(interspersedPath, state)
            folder.unsavedFiles = folder.unsavedFiles.reduce((acc, item) => {
                if(item.id === unSavedFile.id) {
                    return [...acc, unSavedFile]
                } else {
                    return [...acc, item]
                }
            }, [] as Array<UnsavedFile>)
            return {...state}
        }
        default: return state
    }
}