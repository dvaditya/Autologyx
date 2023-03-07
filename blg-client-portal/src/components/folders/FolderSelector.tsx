import React, { Dispatch, useContext } from "react";
import { ReducerAction, RootState } from "../../store/rootReducer";
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import type { ModuleConfig } from "../../store/clientConfigReducer"
import FolderNav from "./FolderNav";
import styles from "../../styles/components/sidebar.module.scss"

export default () => {
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const { clientAuditConfig: { subfolders }, appConfig: { currentModule } } = state
    const handleClick = (index: number) => () => {
        dispatch({
            type: "SET_CURRENT_MODULE",
            payload: index
        })
    }
    let modules = subfolders[subfolders.length - 1]?.moduleName
    // console.log('folder module', state)
    return <div className={styles.sidebarContainer}>
    <div className={styles.parentFolders}>
        {
        subfolders.map((subfolder: ModuleConfig, index: number) => {
            const path = [subfolder.moduleName]
            return <FolderNav key={subfolder.moduleName} lastItem={modules} folder={subfolder} path={path} defaultExpanded={false} />
        })
    }
    </div>
    </div>

}