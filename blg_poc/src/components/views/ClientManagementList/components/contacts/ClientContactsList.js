import React from "react"
import ClientContact from "./ClientContact"
import clientContactStyles from "./clientContacts.styles"

export default ({contacts, isActiveAudit}) => {
    const classes = clientContactStyles()
    return <div className={classes.clientContactsList}>
        {contacts.map((contact) => {
            return <ClientContact key={contact.id} contact={contact} isActiveAudit={isActiveAudit} />
        })}
    </div>
}