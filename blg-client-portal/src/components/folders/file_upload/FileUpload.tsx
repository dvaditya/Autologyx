import React, { useCallback, useContext } from 'react'
import styles from "../../../styles/components/fileUpload.module.scss"
import { useDropzone, FileRejection, DropEvent, } from 'react-dropzone'
import { StoreContext, StoreContextType } from '../../../store/StoreProvider'
import { v4 as uuidv4 } from 'uuid';
import upLoadIcon from '../../../img/fileUploadIcon.png';
import { style } from '@mui/system';


const FileUpload = ({ path, maxFiles }: { path: Array<string>, maxFiles: number }) => {

    const { state, dispatch } = useContext(StoreContext) as StoreContextType

    const extensionRe = /(?:\.([^.]+))?$/;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        try {

            acceptedFiles.forEach((acceptedFile) => {
                const extension = extensionRe.exec(acceptedFile.name)?.[1]
                const newUnsavedFile = {
                    id: uuidv4(),
                    path,
                    fileName: acceptedFile.name,
                    fileObject: acceptedFile,
                    type: acceptedFile.type,
                    size: acceptedFile.size,
                    failed: false,
                    extension: extension ? extension : ""
                }
                const payload = {
                    path,
                    unSavedFile: newUnsavedFile
                }
                dispatch({
                    type: "SET_UNSAVED_FILE",
                    payload
                })
                dispatch({
                    type: "PUSH_FILE_UPLOAD",
                    payload: { ...newUnsavedFile }
                })
            })
        } catch (err) {
            // Show error dialog box on error.
            console.log(err)
        }
        // eslint-disable-next-line
    }, [path])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles })

    return (
        <div onClick={() => console.log("path", path)}>
            <div className={styles.fileUploadTitle}></div>
            <div className={`${styles.fileUploadContainer} ${maxFiles <= 0 && styles.noMoreFiles}`} >

                {maxFiles > 0 && <div {...getRootProps({ className: styles.dropzone })}>
                    <div className={styles.imageContainer}>
                        <img src={upLoadIcon} className={styles.image} />
                    </div>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <div className={`${styles.uploadTitle} ${styles.upLoadTitleContainer}`}>Drop the files here ...</div> :
                            <div className={styles.upLoadTitleContainer}>
                                <div className={styles.uploadTitle}>Drag files here, or click to upload </div>
                                <div className={styles.uploadSubTitle}>You can upload {maxFiles} more file{maxFiles > 1 && 's'}</div>
                            </div>
                    }
                </div>}
                {maxFiles <= 0 && <div className={styles.dropzone}>
                    <div className={styles.imageContainer}>
                        <img src={upLoadIcon} className={styles.image} />
                    </div>
                    <div className={`${styles.uploadTitle} ${styles.upLoadTitleContainer}`}>No more files can be added</div>
                </div>}
            </div>
        </div>

    )
}

export default FileUpload