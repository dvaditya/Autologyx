import { tasks as tasksApi, taskDocuments as taskDocumentsApi, audits as auditsApi } from "api"
import {
    addError as addErrorAction,
    addAlert as addAlertAction,
    setGlobalLoader,
} from 'store/actions/globalActions';
import { validate_aml_atf_policies_deficiencies } from "components/views/Task/components/FormDisplay/Validators";
import axios from 'axios';

const R = require("ramda")
const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;
import { get_build, get_build_prefix } from 'utils/build';
const BUILD = get_build()

const populateDefauts = (schemaItem, key) => {
    schemaItem.label = key
    switch (schemaItem.type) {
        case "deficiencies": {
            return {
                ...schemaItem,
                value: { status: "", notes: "" }
            }
        }
        case "checkbox": {
            return {
                ...schemaItem,
                value: false
            }
        }
        case "select": {
            return {
                ...schemaItem,
                value: ""
            }
        }
        case "freeform": {
            return {
                ...schemaItem,
                value: ""
            }
        }
        case "comments": {
            return {
                ...schemaItem,
                value: ""
            }
        }
        case "grouping": {
            return {
                ...schemaItem,
                value: "",
                fields: R.keys(schemaItem.fields).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: populateDefauts(schemaItem.fields[key], key)
                    }

                }, {})
            }
        }
        case "summaryGrouping": {
            return {
                ...schemaItem,
                value: ""
            }
        }
        default: {
            return schemaItem
        }
    }
}

const addStateToSchema = (schema) => {
    return R.keys(schema).reduce((acc, key) => {
        if (schema[key].type === "sectionHeader") {
            return acc
        }
        return {
            ...acc,
            [key]: populateDefauts(schema[key], key)
        }
    }, {})
}

const addStateToForm = (form) => {
    return {
        schema: addStateToSchema(form.schema),
        extract_deficiencies: !!form.extract_deficiencies
    }
}

const addStateToForms = (formsMap) => {
    return R.keys(formsMap).reduce((acc, formName) => {
        return {
            ...acc,
            [formName]: addStateToForm(formsMap[formName])
        }
    }, {})
}

const initializeResponseData = (taskConfig) => {
    const { structure, forms } = taskConfig
    const formsWithState = addStateToForms(forms)

    const mergeLayoutAndData = (structure, depth) => {
        return {
            ...structure,
            form: structure?.form ? formsWithState[structure.form] : {},
            //currentSelectedForm: formsWithState[depth] ? R.keys(formsWithState[depth])[0] : "",
            subfolders: structure.subfolders.reduce((acc, subfolder) => {
                return {
                    ...acc,
                    [subfolder.moduleName]: mergeLayoutAndData(subfolder, depth + 1)
                }
            }, {})
        }
    }
    return mergeLayoutAndData(structure, 0)
}

const initializeNavPaths = (taskConfig) => {
    const { structure, forms } = taskConfig
    if (!taskConfig) {
        return []
    }
    const initializeNavPathsHelper = (structure, depth, path) => {
        const childTabs = structure.subfolders.map((subfolder) => {
            return initializeNavPathsHelper(subfolder, depth + 1, [...path, structure.moduleName], [])
        })
        const newTab = {
            path: [...path, structure.moduleName],
            hasForm: !!structure.form,
            label: structure.moduleName,
            subTabs: childTabs,
            depth,
            formTabs: [],
            maxFiles: structure.maxFiles,
            hideUnusedSubfolders: !!structure.hideUnusedSubfolders
        }

        return newTab
    }

    return initializeNavPathsHelper(structure, 0, [], [])
}

export const setCurrentTask = (taskId) => async (dispatch, getState) => {
    dispatch(setGlobalLoader(true))
    try {

        const task = await tasksApi.getTaskByID(taskId)
        //const res = await taskDocumentsApi.getTaskDocumentsByAuditUUID(task.field_audit_uuid)
        const { data } = await axios(
            `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/get?authorizer_object_class_id=1&build=${BUILD}&object_class_id=5`,
            {
                headers: {
                    // api_key: REACT_APP_LAMBDA_KEY,
                    uuid: task.field_audit_uuid
                }
            }
        );
        const docs = data?.results
        console.log(docs)
        const audit = await auditsApi.getAuditByUUID(task.field_audit_uuid)
        //const { records, success } = res
        if (!Array.isArray(docs)) {
            throw new Error("Unable to retrieve client audit task documents")
        }
        dispatch({
            type: "SET_AUDIT_TASK_DOCUMENTS",
            payload: docs
        })
        dispatch({
            type: "SET_CURRENT_AUDIT",
            payload: audit
        })
        let taskState = {
            taskMeta: {
                id: task.id,
                field_audit_module_name: task?.field_audit_module_name,
                field_audit_uuid: task?.field_audit_uuid,
                field_creation_date: task?.field_creation_date,
                field_description: task?.field_description,
                field_last_updated: task?.field_last_updated,
                field_task_answers: task?.field_task_answers,
                field_task_configuration: task?.field_task_configuration,
                field_updated_by: task?.field_updated_by,
                field_module_status: task?.field_module_status
            },
            config: task?.field_task_configuration,
            navigationTabs: initializeNavPaths(task?.field_task_configuration)
        }
        let responseData = task?.field_task_answers
        if (!responseData) {
            responseData = initializeResponseData(taskState.config)
        }
        dispatch({
            type: "SET_CURRENT_TASK_RESPONSE_STATE",
            payload: responseData
        })
        dispatch({
            type: "SET_CURRENT_TASK_STATE",
            payload: taskState
        })
        dispatch(setGlobalLoader(false))
    } catch (e) {
        dispatch(setGlobalLoader(false))
        dispatch(addAlertAction({
            title: "Error retrieving task record",
            content: "Unable to retrieve task record, please try again",
            severity: "error"
        }))
        console.log(e)
    }
}

export const saveCurrentTask = () => async (dispatch, getState) => {
    dispatch(setGlobalLoader(true))
    try {
        const { currentTaskResponseData, currentTask, user } = getState()
        const username = `${user.firstName} ${user.lastName}`
        const now = new Date().toISOString()
        let apiData = currentTaskResponseData
        if (apiData.moduleName === "AML-ATF Polices and Procedures") {
            if (apiData.subfolders['Report Summary'] && apiData.subfolders['Report Summary'].form && apiData.subfolders['Report Summary'].form.schema) {
                if (apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome']) {
                    if (validate_aml_atf_policies_deficiencies(currentTaskResponseData.form.schema)) {
                        apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome'].value = "Revise the compliance manual in accordance with the instructions in Schedule A"
                    }
                    else {
                        apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome'].value = ""
                    }

                }
            }
        }
        await tasksApi.editTask(
            currentTask?.taskMeta?.id,
            {
                field_module_status: "In Progress",
                field_task_answers: apiData,
                field_updated_by: user.email,
                field_last_updated: now
            }
        )
        dispatch(setGlobalLoader(false))
    } catch (e) {
        console.log(e)
        dispatch(setGlobalLoader(false))
        dispatch(addAlertAction({
            title: "Error saving task record",
            content: "Unable to save task record, please try again",
            severity: "error"
        }))
    }


}

export const submitCurrentTask = () => async (dispatch, getState) => {
    dispatch(setGlobalLoader(true))
    try {
        const { currentTaskResponseData, currentTask, user } = getState()
        const username = `${user.firstName} ${user.lastName}`
        const now = new Date().toISOString()
        let apiData = currentTaskResponseData
        if (apiData.moduleName === "AML-ATF Polices and Procedures") {
            if (apiData.subfolders['Report Summary'] && apiData.subfolders['Report Summary'].form && apiData.subfolders['Report Summary'].form.schema) {
                if (apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome']) {
                    if (validate_aml_atf_policies_deficiencies(currentTaskResponseData.form.schema)) {
                        apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome'].value = "Revise the compliance manual in accordance with the instructions in Schedule A"
                    }
                    else {
                        apiData.subfolders['Report Summary'].form.schema['AML-ATF Polices and Procedures Outcome'].value = ""
                    }

                }
            }
        }
        await tasksApi.editTask(
            currentTask?.taskMeta?.id,
            {
                field_module_status: "Completed",
                field_task_answers: apiData,
                field_updated_by: user.email,
                field_last_updated: now
            }
        )
        dispatch(setGlobalLoader(false))
    } catch (e) {
        console.log(e)
        dispatch(setGlobalLoader(false))
        dispatch(addAlertAction({
            title: "Error submitting task record",
            content: "Unable to submit task record, please try again",
            severity: "error"
        }))
    }

}

export const clearCurrentTask = () => {
    return {
        type: "CLEAR_CURRENT_TASK_STATE"
    }
}
