import React, { useContext, useEffect, useMemo, useState } from "react";
import type { ModuleConfig } from "../../store/clientConfigReducer"
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import { getFileFolder } from "../../store/accessors";
import styles from '../../styles/components/sidebar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faFile, faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { ModuleState } from "../../store/filesReducer";

const R = require("ramda")

const FolderNav =  ({ folder, lastItem, path, defaultExpanded }: { folder: ModuleConfig, path: Array<string>, defaultExpanded: boolean, lastItem:string }) => {
   
    const [expanded, setExpanded] = useState(defaultExpanded)
    const { moduleName, instructions, maxFiles, subfolders, noClientDisplay } = folder // maxFiles 0 cant upload, lose count, have * if docs in sub folder or gray if not
    const { state, dispatch } = useContext(StoreContext) as StoreContextType

    const handleDividerClick = () => {
        setExpanded(!expanded)
    }

    const handleSetPath = () => {
        dispatch({
            type: "SET_CURRENT_PATH",
            payload: path
        })
    }

    const handleFolderOnCLick = () => {
        handleSetPath()
        handleDividerClick()
    }

    const hasDocsAtOrBelow = (fileFolder: ModuleState) => {
        if(fileFolder.savedFiles.length) {
            return true
        }
        return R.any(hasDocsAtOrBelow, R.values(fileFolder.subFolders))
    }

    const fileFolder = getFileFolder(state, path)
    const numDocs = fileFolder.savedFiles.length
    const docsAtOrBelow = hasDocsAtOrBelow(fileFolder)
    
    const getfilteredSubfolders = (subfolders: Array<ModuleConfig>) : Array<ModuleConfig> => {
        if(!folder.hideUnusedSubfolders) {
            return subfolders
        }
        const lastWithDocs = R.findLastIndex((subFolder: ModuleConfig) => {
            const newPath = [...path, subFolder.moduleName]
            const subFolderFilesFolder = getFileFolder(state, [...path, subFolder.moduleName])
            return subFolderFilesFolder.savedFiles.length > 0 || subFolderFilesFolder.unsavedFiles.length > 0
        }, subfolders)
        // console.log('from getFilteredSubFolders', R.take(lastWithDocs + 2), subfolders)
        return R.take(lastWithDocs + 2, subfolders)
    }
    let filteredSubfolders = getfilteredSubfolders(subfolders)
    filteredSubfolders = filteredSubfolders.filter(folder => !folder.noClientDisplay)
    let currentFolder = state.currentPath[state.currentPath.length - 1]
    
    if(folder.noClientDisplay) {
        return null
    }
    return <div className={styles.folderContainer} >
        <div className={`${styles.sidebarItem} ${currentFolder === moduleName ? styles.active : ''} ${lastItem === moduleName && styles.borderBottom}`} onClick={handleFolderOnCLick} >
            <div className={styles.dividerName} style={{ marginLeft: path.length === 1 ? "0px" : `${15 * path.length - 20}px` }}>
                {filteredSubfolders.length ? <div className={styles.actionButton} >
                <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronRight} /></div> : <div className={styles.noChevron}></div>}
                <FontAwesomeIcon icon={(filteredSubfolders.length > 0 ? expanded : currentFolder === moduleName) ? faFolderOpen : faFolder} color="#0c8ce9" /> 
                <h5 className={styles.folderName}>{moduleName}</h5>
            </div>
            <div className={styles.numberFilesContainer}>
                <FontAwesomeIcon icon={faFile} className={styles.fileIcon} color={docsAtOrBelow ? "#169A16" : '#666666'} />
                <span style={{color: docsAtOrBelow ? "#169A16" : '#666666'}}>{Boolean(maxFiles) && `${numDocs}`} {docsAtOrBelow && filteredSubfolders.length && !expanded ? `*` : ''}</span>
            </div>
        </div>
        <div style={{ display: expanded ? "block" : "none" }}>
            <div>
                {
                    filteredSubfolders.map((subfolder, index) => {
                        return <FolderNav key={subfolder.moduleName} lastItem={''} folder={subfolder} path={[...path, subfolder.moduleName]} defaultExpanded={false} />
                    })
                }
            </div>

        </div>
    </div>
}

export default FolderNav