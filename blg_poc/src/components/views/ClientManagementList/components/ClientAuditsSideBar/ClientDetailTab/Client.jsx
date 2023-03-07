import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "components/lib"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ClientContactStyles from './clientDetails.styles'
import EditClientModal from "./EditClientModal"

const ClientTab = () => {

    const [editClientModal, setEditClientModal] = useState(false)

    const classes = ClientContactStyles()
    const currentClient = useSelector(state => state.matters.currentMatter)
    const addressFields = Boolean(currentClient.field_street || currentClient.field_province || currentClient.field_city || currentClient.field_country || currentClient.field_postal_code)

    const handleCloseEditContactModal = () => {
        setEditClientModal(false)
    }

    return(
        <React.Fragment>
            <div className={classes.clientContainer}>
                <div className={classes.title}>Selected client</div>
                <div className={classes.content}>
                    {currentClient.field_company_name}
                </div>
                {currentClient.field_categories_registration ? <div className={classes.registration}>
                    <div style={{marginBottom: 7, color: '#0c8ce9'}}>Catagories registration:</div>  
                    <div style={{marginBottom: 7}}>{currentClient.field_categories_registration}</div>
                </div> : <div className={classes.registration}>No catagories registration details provided.</div>}
                {addressFields ? <div style={{marginBottom: 7}} className={classes.address}>
                    <div style={{marginBottom: 7, color: '#0c8ce9'}}>Address:</div>  
                    <div style={{marginBottom: 7}}>{currentClient.field_street}</div>
                    <div style={{marginBottom: 7}}>{currentClient.field_province}</div>
                    <div style={{marginBottom: 7}}>{currentClient.field_city}</div>
                    <div style={{marginBottom: 7}}>{currentClient.field_country}</div>
                    <div style={{marginBottom: 7}}>{currentClient.field_postal_code}</div>
                </div> : <div className={classes.address} >No address details present</div>}
                <div className={classes.editClient} onClick={() => setEditClientModal(true)}>
                   <FontAwesomeIcon icon={faPen} /> Edit Client Details
                </div>
            </div>
            <EditClientModal open={editClientModal} closeModel={handleCloseEditContactModal} client={currentClient} />
        </React.Fragment>
    )
}

export default ClientTab