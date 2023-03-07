export type ModuleConfig = {
    moduleName: string,
    instructions: string,
    maxFiles: number,
    subfolders: Array<ModuleConfig>,
    hideUnusedSubfolders: boolean,
    noClientDisplay: boolean
}

export type ClientAuditConfig = ModuleConfig /*{
    moduleOrder: Array<string>,
    modules: {[key: string]: ModuleConfig}
}*/

type ClientAuditConfigAction = {
    type: string,
    payload: any
}

export default (state: ClientAuditConfig, action: ClientAuditConfigAction): ClientAuditConfig => {
    switch(action.type) {
        case "SET_CLIENT_AUDIT_CONFIG": {
            return action.payload
        }
        default: return state
    }
}