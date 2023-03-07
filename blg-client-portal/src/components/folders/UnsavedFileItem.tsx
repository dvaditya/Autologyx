import React, { SyntheticEvent, useCallback, useContext } from "react";
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import FileImage from "./FileImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faRetweet } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/components/fileList.module.scss'
import { UnsavedFile } from "../../store/filesReducer";
import { CircularProgress } from "@mui/material";
import { formatBytes } from "../../uitil/formatting"

import { saveAs } from 'file-saver';


export default ({ unSavedFile }: { unSavedFile: UnsavedFile }) => {
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const handleDelete = () => {
        dispatch({
            type: "DELETE_UNSAVED_FILE",
            payload: {
                path: unSavedFile.path,
                id: unSavedFile.id
            }
        })
    }
    const handleRetry = () => {
        const updatedUnsavedFile = {
            ...unSavedFile,
            failed: false
        }
        dispatch({
            type: "PUSH_FILE_UPLOAD",
            payload: { ...updatedUnsavedFile }
        })
        dispatch({
            type: "UPDATE_UNSAVED_FILE",
            payload: {
                path: updatedUnsavedFile.path,
                unSavedFile: updatedUnsavedFile
            }
        })
    }

    const handleDownloadRequest = (e: SyntheticEvent) => {
        e.preventDefault()
        saveAs(unSavedFile.fileObject)
    }
    return <div className={styles.fileContainer}>
        <div className={styles.fileContents}>
            <div className={styles.img}>
                <FileImage type={unSavedFile.type} />
            </div>
            <div className={styles.fileNameContents}>
                <div className={styles.fileName}>
                    <a className={styles.fileNameLink} href={"#"} onClick={handleDownloadRequest}>{unSavedFile.fileName}</a>
                </div>
                {/* <div>
                    {formatBytes(unSavedFile.size, 2)} {unSavedFile.failed && <span className={styles.itemFailed}>(upload failed)</span>}
                </div> */}

            </div>
        </div>
        <div className={styles.actions}>
            {!unSavedFile.failed && <div className={styles.fileDelete} title="File uploading">
                <CircularProgress size={"20px"} />
            </div>}
            {unSavedFile.failed && <div className={styles.fileDelete} onClick={handleRetry} title="Retry upload">
                <FontAwesomeIcon className={styles.trashIcon} icon={faRetweet} />
            </div>}
            {unSavedFile.failed && <div className={styles.fileDelete} onClick={handleDelete} title="Deleted failed file">
                <FontAwesomeIcon className={styles.trashIcon} icon={faTrashAlt} />
            </div>}
        </div>
    </div>
}