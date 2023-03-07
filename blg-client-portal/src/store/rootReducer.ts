import appReducer from "./appReducer";
import type { AppState } from "./appReducer"
import clientConfigReducer from "./clientConfigReducer";
import { ClientAuditConfig } from "./clientConfigReducer"
import filesReducer from "./filesReducer";
import { ModulesState } from "./filesReducer"
import fileUploadQueueReducer, { FileUploadQueue } from "./fileUploadQueueReducer";
import inProgressReducer, { InProgressQueue } from "./inProgressReducer";
import extractedFormReducer, { ExtractedForm } from "./extractedFormReducer"
import currentPathReducer from "./currentPathReducer";
import alertsReducer, {Alert} from "./alertsReducer";

export type RootState = {
    appConfig: AppState,
    clientAuditConfig: ClientAuditConfig,
    filesState: ModulesState,
    fileUploadQueue: FileUploadQueue,
    inProgress: InProgressQueue,
    extractedForm: ExtractedForm,
    currentPath: string[],
    alerts: Alert[]
}

export const defaultRootState: RootState = {
    appConfig: {
        currentModule: 0,
        pageLoaderOpen: false,
        unrecoverableErrorMessage: ""
    },
    clientAuditConfig: {
        moduleName: "",
        instructions: "",
        maxFiles: 0,
        subfolders: [],
        hideUnusedSubfolders: false,
        noClientDisplay: false
    },
    filesState: {
        moduleName: "",
        savedFiles: [],
        unsavedFiles: [],
        subFolders: {}
    },
    fileUploadQueue: [],
    inProgress: [],
    extractedForm: {
        fields: [],
        apiKey: "",
        csrfToken: "",
        urlPath: "",
        emailId: 0,
        fieldState: {}
    },
    currentPath : [],
    alerts: []
}

export type ReducerAction = {
    type: string,
    payload: any
}

export const rootReducer = (state: RootState, action: ReducerAction): RootState => {
    return {
        appConfig: appReducer(state["appConfig"], action),
        clientAuditConfig: clientConfigReducer(state["clientAuditConfig"], action),
        filesState: filesReducer(state["filesState"], action),
        fileUploadQueue: fileUploadQueueReducer(state["fileUploadQueue"], action),
        inProgress: inProgressReducer(state["inProgress"], action),
        extractedForm: extractedFormReducer(state["extractedForm"], action),
        currentPath: currentPathReducer(state["currentPath"], action),
        alerts: alertsReducer(state["alerts"], action)
    }
}