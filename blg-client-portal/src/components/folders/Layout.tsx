import React, { useContext, useState } from "react";
import FolderSelector from "./FolderSelector";
import FolderView from "./FolderView";
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import Submit from "../lib/Submit";
import '../../styles/styles.scss';
import { Alert, AlertTitle, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ModuleConfig } from "../../store/clientConfigReducer";
import styles from "../../styles/components/layout.module.scss";

const R = require("ramda")

const getFolder = (path: string[], moduleConfig: ModuleConfig): ModuleConfig => {
    if (path.length === 0) {
        return moduleConfig
    } else {
        const nextPath = R.drop(1, path)
        const nextTarget = R.find(R.propEq('moduleName', R.head(path)), moduleConfig.subfolders)
        return getFolder(nextPath, nextTarget)
    }
}

const getCurrentFolder = (path: string[], topLevelFolders: ModuleConfig[]): ModuleConfig | null => {
    if (path.length === 0) {
        return null
    } else {
        const topLevel = R.find(R.propEq("moduleName", path[0]), topLevelFolders)
        if (path.length === 1) {
            return topLevel
        } else {
            return getFolder(R.drop(1, path), topLevel)
        }
    }
}

export default () => {
    const [handleChange, setHandleChange] = useState(false)
    const { state } = useContext(StoreContext) as StoreContextType
    const { currentPath, clientAuditConfig: { subfolders } } = state
    const currentFolder = getCurrentFolder(currentPath, subfolders)
    return <div className='content-container main-content'>
        <Grid container spacing={2}>
            <Grid sx={{ minWidth: '300px' }} item xs={3}><FolderSelector /></Grid>
            <Grid item xs={8}>{currentFolder &&
                <FolderView
                    folder={currentFolder}
                    path={currentPath}
                    defaultExpanded={true}
                />}
            </Grid>
            <Grid sx={{ minWidth: '300px' }} item xs={3} >
                
            </Grid>
            <Grid item xs={8}>
                <div className={styles.confirmContainer}>
                    <div className={styles.confirmAlert}>
                        <Alert sx={{padding: '0px 30px!important'}} severity={'info'}>
                            <AlertTitle >Please make sure all of your files are uploaded into the correct folders before submitting, Please check the box to confirm all files are present and in the correct folders.</AlertTitle>
                            <FormControlLabel control={<Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                onChange={({ target }) => setHandleChange(target.checked)}
                            />} label="Confirm" />
                        </Alert>
                    </div>
                    <div className={styles.submitContainer}>
                        <span className={styles.submitButton}>
                            <Submit disabled={state.fileUploadQueue.length + state.inProgress.length !== 0 || !handleChange} />
                        </span>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>

}