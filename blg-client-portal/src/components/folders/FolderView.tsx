import React, { useContext, useMemo, useState } from "react";
import type { ModuleConfig } from "../../store/clientConfigReducer"
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import styles from '../../styles/components/divider.module.scss'
import FileUpload from "./file_upload/FileUpload";
import SavedFileItem from "./SavedFileItem";
import UnsavedFileItem from "./UnsavedFileItem";
import { getFileFolder } from "../../store/accessors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Alert, Checkbox } from "@mui/material";
import { style } from "@mui/system";

const R = require("ramda")

const FolderView =  (
    { 
        folder, 
        path, 
        defaultExpanded
     }: 
    { 
        folder: ModuleConfig, 
        path: Array<string>, 
        defaultExpanded: boolean,
    }) => {
    const [expanded, setExpanded] = useState(defaultExpanded)
    const { moduleName, instructions, maxFiles } = folder
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const filesFolder = getFileFolder(state, path)
    const maxFilesLeft = folder.maxFiles - (filesFolder.unsavedFiles.length + filesFolder.savedFiles.length)

    return <div className={styles.container} >
        <div className={styles.breadCrumbs}>{path.map((segment: string, index: number) => {
            let lastItem = index === path.length - 1
            if(index === 0) {
                return <div className={` ${styles.breadCrumb} ${path.length === 1 && styles.activeText}`}>{segment}</div>
            }
            else {
                return <><div className={`${styles.breadCrumb} ${lastItem && styles.active}`}>&nbsp;&nbsp;&nbsp;<span className={styles.breadCrumbIcon}><FontAwesomeIcon icon={faChevronRight} /></span>&nbsp;&nbsp;&nbsp;</div><div className={`${styles.breadCrumb} ${lastItem && styles.activeText}`}>{segment}</div></>
            }
        })}
        </div>
        {/* <div className={styles.dividerContent}>
            <div className={styles.nameAndTrash}>
                <div className={styles.dividerName}>
                    {moduleName} 
                </div>
            </div>
        </div> */}
        <div className={styles.instructions}>
            <Alert severity="info" sx={{color: '#aeaeaeb'}} >
                {instructions}
            </Alert>
        </div>
        {maxFiles > 0 && <div>
                <FileUpload path={path} maxFiles={maxFilesLeft} />
            </div>}
        <div style={{ display: true ? "block" : "none" }}>
            <div>
                {filesFolder.savedFiles.map((savedFile) => {
                    return <SavedFileItem key={savedFile.id} type={savedFile.type} name={savedFile.fileName} size={savedFile.size} path={path} id={savedFile.id} />
                })}
            </div>
            <div>
                {filesFolder.unsavedFiles.map((unSavedFile) => {
                    return <UnsavedFileItem key={unSavedFile.id} unSavedFile={unSavedFile}/>
                })}
            </div>
        </div>
    </div>
}

export default FolderView