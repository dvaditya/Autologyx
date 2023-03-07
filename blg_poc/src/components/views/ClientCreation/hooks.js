import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { createMatter, getMatterByID, deleteMatterByID as deleteClient } from 'api/clients.api';
import { createClientContact } from "api/clientContacts.api"
import { setGlobalLoader, addAlert as addAlertAction } from 'store/actions/globalActions';
import { useHistory } from 'react-router-dom';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const useSaveNewClient = () => {
    const dispatch = useDispatch()
    const [serverSideErrors, setServerSideErrors] = useState({})
    const history = useHistory();
    const saveClient = async (values) => {
        setServerSideErrors({})
        dispatch(setGlobalLoader(true))
        let client
        let clientUUID
        let contact
        try {
            const res = await createMatter({
                field_company_name: values.field_company_name,
                field_active: true,
                field_street: values.field_street,
                field_city: values.field_city,
                field_province: values.field_province,
                field_country: values.field_country,
                field_postal_code: values.field_postal_code,
                field_categories_registration: values.field_categories_registration.join("|"),
                field_owner: values.field_owner
            })
            const { success, payload } = res
            if (success) {
                client = payload

            } else {
                if (typeof res.msg_body === "object") {
                    setServerSideErrors(res.msg_body)
                }
                dispatch(setGlobalLoader(false))
                setServerSideErrors({ global: "Unable to save client, please try again" })
                return
            }
        } catch (e) {
            console.log("e", e)
            dispatch(setGlobalLoader(false))
            setServerSideErrors({ global: "Unable to save client, please try again" })
            return
        }

        console.log("client uuid before", clientUUID)
        // wait for clientUUID to be set
        for (let counter = 0; counter < 5; counter++) {
            await timeout(5000)
            try {
                const res = await getMatterByID(client.id)
                clientUUID = res?.field_client_uuid
                if (clientUUID) {
                    break
                } else {
                    continue
                }
            } catch (e) {
                console.log(e)
                continue
            }
        }


        console.log("client uuid after", clientUUID)
        //clean up
        if (!clientUUID) {
            try {
                await deleteClient(client.id)
            } catch (e) {
                console.log("e", e)
            }
            dispatch(setGlobalLoader(false))
            setServerSideErrors({ global: "Unable to save client, please try again" })
            return
        }

        try {
            const res = await createClientContact({
                field_firstname: values.field_firstname,
                field_lastname: values.field_lastname,
                field_email: values.field_email,
                field_role: values.field_role,
                field_phone_number: values.field_phone_number,
                field_primary_contact: true,
                field_active_to_receive_audit_link: true,
                field_active: true,
                field_client_uuid: clientUUID,
                field_client_name: values.field_company_name,
                field_owner: values.field_owner
            })
            const { success, payload } = res
            dispatch(setGlobalLoader(false))
            if (success) {
                history.push("/management/client")
            } else {
                if (typeof res.msg_body === "object") {
                    setServerSideErrors(res.msg_body)
                }
                try {
                    await deleteClient(client.id)
                } catch (e) {
                    console.log("e", e)
                }
                dispatch(setGlobalLoader(false))
                serverSideErrors.global = "Unable to save client, please try again"
                return
            }
        } catch (e) {
            console.log("e", e)
            dispatch(setGlobalLoader(false))
            serverSideErrors.global = "Unable to save client contact, please try again"
        }
        dispatch(setGlobalLoader(false))
    }
    return { serverSideErrors, saveClient }
}