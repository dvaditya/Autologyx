import { clientContacts as clientContactsAPI } from 'api'
import {
    addError as addErrorAction,
    addAlert as addAlertAction,
    setGlobalLoader,
} from 'store/actions/globalActions';

const R = require("ramda")

export const getClientContacts = (clientUUID) => async (dispatch, getState) => {
    try {
        dispatch(setGlobalLoader(true))
        const res = await clientContactsAPI.getClientContacts(clientUUID)
        console.log("res", res)
        const { records, success } = res
        dispatch(setGlobalLoader(false))
        if (!success) {
            throw new Error("Unable to retrieve contacts")
        }
        dispatch({
            type: "SET_CLIENT_CONTACTS",
            payload: records?.objects ? records?.objects : []
        })
    } catch (e) {
        dispatch(setGlobalLoader(false))
        console.log(e)
        dispatch(addAlertAction(
            {severity: "error", title: "Unable to retrieve contacts", content: "Unable to retrieve contacts, please try again"}
        ));
    }
}

export const clearClientContacts = () => {
    return {
        type: "CLEAR_CLIENT_CONTACTS"
    }
}

export const appendClientContact = (clientContact) => async (dispatch, getState) => {

    const { clientContacts } = getState()
    let contactsToUpdate = []
    if (clientContact.field_primary_contact) {
        const currentPrimaryContacts = clientContacts.filter((contact) => contact.field_primary_contact && contact.id != clientContact.id).map((contact) => {
            return {
                id: contact.id,
                field_primary_contact: false
            }
        })
        contactsToUpdate = [...contactsToUpdate, ...currentPrimaryContacts]
    }
    try {
        dispatch(setGlobalLoader(true))
        const promises = contactsToUpdate.map((contact) => {
            return clientContactsAPI.editClientContact(contact.id, R.omit(['id'], contact))
        })
        Promise.all(promises).then((vals) => {
            dispatch(setGlobalLoader(false))
            vals.forEach((val) => {
                const { success, payload } = val
                dispatch({
                    "type": "UPDATE_CLIENT_CONTACT",
                    payload
                })
            })
            dispatch({
                type: "APPEND_CLIENT_CONTACT",
                payload: clientContact
            })
        }).catch((err) => {
            dispatch(setGlobalLoader(false))
            console.log(err)
            dispatch(addAlertAction({
                title: "Error saving record",
                content: "Unable to save client contact, please try again",
                severity: "error"
            }))
        })
    } catch (e) {
        console.log(e)
        dispatch(setGlobalLoader(false))
        dispatch(addAlertAction({
            title: "Error saving record",
            content: "Unable to save client contact, please try again",
            severity: "error"
        }))
    }


}

export const editClientContact = (clientContact) => async (dispatch, getState) => {
    const { clientContacts } = getState()
    let contactsToUpdate = [clientContact]
    if (clientContact.field_primary_contact) {
        const currentPrimaryContacts = clientContacts.filter((contact) => contact.field_primary_contact && contact.id != clientContact.id).map((contact) => {
            return {
                id: contact.id,
                field_primary_contact: false
            }
        })
        contactsToUpdate = [...contactsToUpdate, ...currentPrimaryContacts]
    }
    try {
        dispatch(setGlobalLoader(true))
        const promises = contactsToUpdate.map((contact) => {
            return clientContactsAPI.editClientContact(contact.id, R.omit(['id'], contact))
        })
        Promise.all(promises).then((vals) => {
            dispatch(setGlobalLoader(false))
            vals.forEach((val) => {
                const { success, payload } = val
                dispatch({
                    "type": "UPDATE_CLIENT_CONTACT",
                    payload
                })
            })
        }).catch((err) => {
            dispatch(setGlobalLoader(false))
            console.log(err)
            dispatch(addAlertAction({
                title: "Error saving record",
                content: "Unable to save client contact, please try again",
                severity: "error"
            }))
        })
    } catch (e) {
        console.log(e)
        dispatch(setGlobalLoader(false))
        dispatch(addAlertAction({
            title: "Error saving record",
            content: "Unable to save client contact, please try again",
            severity: "error"
        }))
    }
}

export const deleteClientContact = (clientContactId) => async (dispatch, getState) => {
    try {
        dispatch(setGlobalLoader(true))
        const { success, payload } = await clientContactsAPI.editClientContact(clientContactId, { "field_active": false })
        if (!success) {
            dispatch(addAlertAction({
                title: "Error deleting record",
                content: "Unable to delete client contact, please try again",
                severity: "error"
            }))
            dispatch(setGlobalLoader(false))
            return
        }
        dispatch({
            type: "DELETE_CLIENT_CONTACT",
            id: clientContactId
        })
        dispatch(setGlobalLoader(false))
    } catch (e) {
        console.log(e)
        dispatch(addAlertAction({
            title: "Error deleting record",
            content: "Unable to delete client contact, please try again",
            severity: "error"
        }))
        dispatch(setGlobalLoader(false))
    }
}