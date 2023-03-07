import { getAuditByID, editaudit } from "api/clientAudits.api"
import { getTasksByAuditUUID, addTask } from "api/tasks.api";
import { getClientByUUID } from "api/clients.api";
import { setGlobalLoader, addError as addErrorAction, addAlert as addAlertAction, addGlobalLoaderItem, removeGlobalLoaderItem } from 'store/actions/globalActions';
import { getClientContacts, editClientContact } from "api/clientContacts.api";
import { getClientContacts as getClientContactsAction } from "./clientContactActions";

const R = require("ramda")

const getContactFieldsForExtract = (contact) => {
    const fieldNames = ["field_firstname",
        "field_lastname",
        "field_email",
        "field_primary_contact",
        "field_active_to_receive_audit_link",
        "field_active",
        "field_client_name",
        "field_owner",
        "field_role"
    ]
    return fieldNames.reduce((acc, field_name) => {
        return {
            ...acc,
            [field_name]: contact?.[field_name]
        }
    }, {})
}

const extractDeficiencies = (tasks) => {
    const getDeficienciesFromForm = (form) => {
        return R.keys(form.schema).reduce((acc, label) => {
            const field = form.schema[label]
            const outputKey = R.replace(/ /g, "_", label.toLocaleLowerCase())
            switch (field.type) {
                case "deficiencies": {
                    const value = field?.value?.notes
                    return !!value ? { ...acc, [outputKey]: value } : acc
                }
                case "select": {
                    const value = field?.value
                    return !!value ? { ...acc, [outputKey]: value } : acc
                }
                case "comments": {
                    const value = field?.value
                    return !!value ? { ...acc, [outputKey]: value } : acc
                }
                case "grouping": {
                    const value = field?.value
                    return !!value ? { ...acc, [outputKey]: value } : acc
                }
                case "summaryGrouping": {
                    const value = field?.value
                    return !!value ? { ...acc, [outputKey]: value } : acc
                }
                default: {
                    return acc
                }
            }
        }, {})
    }
    const extractDeficienciesHelper = (responseData) => {
        if (R.keys(responseData.form).length === 0 && R.keys(responseData.subfolders).length === 0) {
            return {
                defiencies: {},
                subfolders: {}
            }
        } else {
            return {
                defiencies: getDeficienciesFromForm(responseData.form),
                subfolders: R.keys(responseData.subfolders).reduce((acc, moduleName) => {
                    return {
                        ...acc,
                        [R.replace(/ /g, "_", moduleName.toLocaleLowerCase())]: extractDeficienciesHelper(responseData.subfolders[moduleName])
                    }
                }, {})
            }
        }
    }
    try {
        const deficiencies = tasks.reduce((acc, task) => {
            const responseData = task.field_task_answers
            const taskConfig = task.field_task_configuration
            if (!responseData || !taskConfig) {
                return acc
            } else {
                return {
                    ...acc,
                    [R.replace(/ /g, "_", taskConfig.structure.moduleName)]: extractDeficienciesHelper(responseData)
                }
            }


        }, {})
        console.log("deficiencies", deficiencies)
        return deficiencies
    } catch (e) {
        console.log(e)
    }


}


const extractDeficienciesAndSummaries = (tasks) => {
    const getDeficienciesFromForm = (form) => {
        return R.keys(form.schema).reduce((acc, label) => {
            const field = form.schema[label]
            const outputKey = R.replace(/ /g, "_", label.toLocaleLowerCase())
            let value = null
            switch (field.type) {
                case "deficiencies": {
                    value = field?.value?.notes
                    break
                }
                case "select":
                case "comments":
                case "grouping":
                case "summaryGrouping": {
                    value = field?.value
                    break
                }
                default: {
                    value = null
                }
            }

            if (value === null || value === "") {
                return acc
            }
            let newAcc = {...acc}
            if(form.extract_deficiencies) {
                newAcc = {
                    ...newAcc,
                    deficiencies: {
                        ...newAcc.deficiencies,
                        [outputKey]: value
                    },
                }
            }
            if (field.extract_for_summary) {
                newAcc =  {
                    ...newAcc,
                    summaryFields: {
                        ...newAcc.summaryFields,
                        [label]: value
                    }
                }
            } 
            return newAcc
        }, { deficiencies: {}, summaryFields: {} })
    }
    const extractDeficienciesHelper = (responseData, data) => {
        if (R.keys(responseData.form).length === 0 && R.keys(responseData.subfolders).length === 0) {
            return {
                deficiencies: {
                    deficiencies: {},
                    subfolders: {}
                }, summaryFields: {}
            }
        } else {
            const extractedForm = getDeficienciesFromForm(responseData.form)
            const subfolderData = R.keys(responseData.subfolders).reduce((acc, moduleName) => {
                const { deficiencies, summaryFields } = extractDeficienciesHelper(responseData.subfolders[moduleName])
                // if flag is set, return deficiencies and summary, else just set deficiencies to empty object but still return summary data
                return {
                    deficiencies: {
                        ...acc.deficiencies,
                        [R.replace(/ /g, "_", moduleName.toLocaleLowerCase())]: deficiencies
                    },
                    summaryFields: {
                        ...acc.summaryFields,
                        ...summaryFields
                    }
                }
            }, {
                deficiencies: {
                    deficiencies: {},
                }, summaryFields: {}
            })
            return {
                deficiencies: {
                    deficiencies: extractedForm.deficiencies,
                    subfolders: subfolderData.deficiencies
                },
                summaryFields: { ...extractedForm.summaryFields, ...subfolderData.summaryFields }
            }

        }
    }
    try {
        const deficiencies = tasks.reduce((acc, task) => {
            const responseData = task.field_task_answers
            const taskConfig = task.field_task_configuration
            if (!responseData || !taskConfig) {
                return acc
            } else {
                const { deficiencies, summaryFields } = extractDeficienciesHelper(responseData, { deficiencies: { deficiencies: {}, subfolders: {} }, summaryFields: {} })
                return {
                    deficiencies: {
                        ...acc.deficiencies,
                        [R.replace(/ /g, "_", taskConfig.structure.moduleName)]: deficiencies
                    },
                    summary_fields: [
                        ...acc.summary_fields,
                        {
                            module_name: taskConfig.structure.moduleName,
                            fields: summaryFields
                        }
                    ]
                }
            }


        }, { answers: {}, summary_fields: [] })
        console.log("deficiencies", deficiencies)
        return deficiencies
    } catch (e) {
        console.log(e)
    }


}


export const setCurrentAudit = (auditId) => async (dispatch, getState) => {
    try {

        dispatch(addGlobalLoaderItem("set_current_audit"))
        let audit = await getAuditByID(auditId)
        await dispatch(getClientContactsAction(audit.field_client_uuid))
        const { clientContacts } = getState()
        let primaryContact = R.find(R.propEq("field_primary_contact", true), clientContacts)
        if (!primaryContact) {
            primaryContact = {}
        }
        if (!audit?.field_tasks_created) {
            const configs = Array.isArray(audit?.field_audit_configuration?.configs) ? audit?.field_audit_configuration?.configs : []
            if (configs.length > 0) {
                // create task objetcs
                try {
                    await editaudit(auditId, { field_tasks_created: true })
                    const tasksPromises = configs.map((config, i) => {
                        return addTask({
                            field_audit_module_name: config?.structure?.moduleName,
                            field_audit_uuid: audit.field_uuid,
                            field_name: config?.structure?.moduleName,
                            field_task_configuration: config,
                            field_module_index: i,
                            field_module_status: "Pending",
                        })
                    })
                    const tasks = await Promise.all(tasksPromises)
                } catch (e) {
                    dispatch(addAlertAction({
                        severity: "error",
                        title: "Unable to create tasks",
                        content: "Please try again"
                    }));
                    console.log(e)
                    // add error message
                }


                // create tasks
                // update audit - set tasks created true
            }
        }
        dispatch({
            type: "SET_CURRENT_AUDIT",
            payload: audit
        })
        dispatch({
            type: "SET_AUDIT_TASKS_LOADING"
        })
        const res = await getTasksByAuditUUID(audit.field_uuid)
        let { records: { objects: records }, success } = res

        records = records.sort((a, b) => a.field_module_index - b.field_module_index)

        if (!success) {
            throw new Error("Unable to retrieve client audits")
        }

        if (audit.field_tasks_created && !audit.field_audit_answers && R.all((task) => task.field_module_status === "Completed", records)) {
            try {
                dispatch(addAlertAction({
                    severity: "info",
                    title: "Generating report",
                    content: "Please wait"
                }));

                const deficiencies = extractDeficienciesAndSummaries(records)
                console.log("deficiencies", deficiencies)
                const answersObject = {
                    contact: getContactFieldsForExtract(primaryContact),
                    ...deficiencies
                }
                const { success, payload } = await editaudit(auditId, { field_audit_answers: answersObject })
                if (!success) {
                    throw new Error("Unable to generate report")
                }
                for (let i = 0; i < 10; i++) {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    audit = await getAuditByID(auditId)
                    if (audit.field_audit_document) {
                        break
                    }
                }
                if (!audit.field_audit_document) {
                    throw new Error("Unable to generate report")
                }
                dispatch({
                    type: "SET_CURRENT_AUDIT",
                    payload: audit
                })
            } catch (e) {
                console.log(e)
                dispatch(addAlertAction({
                    severity: "error",
                    title: "Unable to generate report",
                    content: "Press Regenerate Report to try again"
                }));
            }

        }
        dispatch({
            type: "SET_AUDIT_TASKS",
            payload: records.sort((a, b) => a.field_module_index - b.field_module_index)
        })

        const client = await getClientByUUID(audit.field_client_uuid)
        dispatch({
            type: "SET_CURRENT_AUDIT_CLIENT",
            payload: client
        })
        dispatch(removeGlobalLoaderItem("set_current_audit"))
    } catch (e) {
        console.log(e)
        dispatch(removeGlobalLoaderItem("set_current_audit"))
        dispatch(addAlertAction({
            severity: "error",
            title: "Unable to retrieve client audit",
            content: "Please try again"
        }));
    }
}

export const regenerateAuditReport = () => async (dispatch, getState) => {
    try {
        const { currentAudit, auditTasks: { tasks: tasks } } = getState()
        let audit = currentAudit
        const auditId = audit.id
        dispatch(addGlobalLoaderItem("regenerate_report"))


        try {
            const { clientContacts } = getState()
            let primaryContact = R.find(R.propEq("field_primary_contact", true), clientContacts)
            const deficiencies = extractDeficienciesAndSummaries(tasks)
            const answersObject = {
                contact: getContactFieldsForExtract(primaryContact),
                ...deficiencies
            }
            dispatch(addAlertAction({
                severity: "info",
                title: "Generating report",
                content: "Please wait"
            }));
            const { success, payload } = await editaudit(auditId,
                {
                    field_audit_answers: answersObject,
                    field_review_audit_document_completed: "No",
                    field_check_to_send_to_client: false,
                    field_regenerate_audit_document: "Yes",
                    field_audit_document: null
                }
            )
            if (!success) {
                throw new Error("Unable to retrieve client audits")
            }
            for (let i = 0; i < 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                audit = await getAuditByID(auditId)
                if (audit.field_audit_document) {
                    break
                }
            }
            dispatch({
                type: "SET_CURRENT_AUDIT",
                payload: audit
            })
            if (!audit.field_audit_document) {
                throw new Error("Unable to retrieve client audits")
            }

        } catch (e) {
            console.log(e)
            dispatch(addAlertAction({
                severity: "error",
                title: "Unable to regenerate report",
                content: "Please try again"
            }));
        }
        dispatch(removeGlobalLoaderItem("regenerate_report"))
    } catch (e) {
        console.log(e)
        dispatch(removeGlobalLoaderItem("regenerate_report"))
        dispatch(addAlertAction({
            severity: "error",
            title: "Unable to regenerate report",
            content: "Please try again"
        }));
    }
}

export const clearCurrentAudit = () => {
    return {
        type: "CLEAR_CURRENT_AUDIT"
    }
}

export const editCurrentAudit = (auditId, clientUUID, data, updateContacts) => async (dispatch, getState) => {
    console.log(data)
    const patron_email = data.field_owner
    try {
        const { success, payload } = await editaudit(auditId, data)
        if (!success) {
            dispatch(addAlertAction(
                {
                    severity: "error",
                    title: "Unable to update client audit",
                    content: "Please try again"
                }));
            return
        } else {
            dispatch({
                type: "SET_CURRENT_AUDIT",
                payload: payload
            })
        }
        if (updateContacts) {
            try {
                const patron = R.find(R.propEq("email", patron_email), getState().users)
                const records = getState().clientContacts
                const contactPromises = records.map((contact) => {
                    return editClientContact(contact.id, {
                        patron: patron.id,
                        field_owner: patron_email
                    })
                })
                await Promise.all(contactPromises)
            } catch (e) {
                console.log(e)
                dispatch(addAlertAction({
                    severity: "error",
                    title: "Unable to update client audit",
                    content: "Please try again"
                }));
                return
            }
        }

    } catch (e) {
        dispatch(addAlertAction({
            severity: "error",
            title: "Unable to update client audit",
            content: "Please try again"
        }));
    }


}