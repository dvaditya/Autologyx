import { useState } from "react"
import NewClientContactModal from "./NewClientContactModal"
import Button from "components/lib/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default ({client}) => {
    const [createModelOpen, setCreateModelOpen] = useState(false)

    const handleOpenModel = () => {
        setCreateModelOpen(true)
    }

    const handleCloseModel = () => {
        setCreateModelOpen(false)
    }



    return <div>
        <NewClientContactModal open={createModelOpen} client={client} closeModel={handleCloseModel} />
        <div style={{display: "flex", justifyContent: "left", padding: "10px"}}><Button onClick={handleOpenModel} ><FontAwesomeIcon icon={faPlus} /><span style={{marginLeft: '7px', fontWeight: '700'}}>Add a Contact</span></Button></div>
    </div>
}