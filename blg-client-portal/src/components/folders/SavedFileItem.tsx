import React, { SyntheticEvent, useCallback, useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider"
import type { StoreContextType } from "../../store/StoreProvider";
import FileImage from "./FileImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import styles from '../../styles/components/fileList.module.scss'
import { formatBytes } from "../../uitil/formatting"
import { saveAs } from 'file-saver';
import axios from "axios";
import { get_build, get_build_prefix } from "../../uitil/build";
import { FileDownload } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { faGgCircle } from "@fortawesome/free-brands-svg-icons";
const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;

const BUILD = get_build()

export default ({ type, name, size, path, id }: { type: string, name: string, size: number, path: string[], id: string }) => {
    const [downLoading, setDownloading] = useState(false)
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const uuid = state.extractedForm.fieldState.audit_uuid
    const handleDelete = async (e: SyntheticEvent) => {
        try {
            setDownloading(true)
            e.preventDefault()
            const { data } = await axios(
                `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/delete?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
                {
                    method: "DELETE",
                    headers: {
                        // api_key: REACT_APP_LAMBDA_KEY as string,
                        uuid
                    },
                    data: {
                        field_document_uuid: id
                    }
                }
            );
            if(data?.error) {
                throw new Error("Error deleting document")
            }
            dispatch({
                type: "DELETE_SAVED_FILE",
                payload: {
                    path,
                    id
                }
            })
        } catch(e) {
            setDownloading(false)
        }
        
    }

    const handleDownloadRequest = async (e: SyntheticEvent) => {
        try {
            setDownloading(true)
            e.preventDefault()
            const { data } = await axios(
                `https://${get_build_prefix()}${REACT_APP_API_URL}//file/get?build=${BUILD}&authorizer_object_class_id=1&document_uuid=${id}`,
                {
                    headers: {
                        // api_key: REACT_APP_LAMBDA_KEY as string,
                        uuid
                    }
                }
            );

            if(data?.base64){
                const b64Data = data?.base64
                const base64Response = await fetch(b64Data);
                const blob = await base64Response.blob();
                const f = new File([blob], name)
                saveAs(f)
            }
            
            else if(data?.presigned_download_url){
                const b64Data = data?.presigned_download_url
                const base64Response = await fetch(b64Data);
                const blob = await base64Response.blob();
                const f = new File([blob], name)
                saveAs(f)
                
            }

            setDownloading(false)
            
        } catch (e) {
            console.log(e)
            setDownloading(false)
        }
    }

    return <div className={styles.fileContainer}>
        <div className={styles.fileContents}>
            <div className={styles.img}>
                <FileImage type={type} />
            </div>
            <div className={styles.fileNameContents}>
                <div className={styles.fileName}>
                    <a className={styles.fileNameLink} href={"#"} onClick={handleDownloadRequest}>{name}</a>
                </div>
                {/* <div>
                    {formatBytes(!!size ? size : 0, 2)}
                </div> */}
            </div>
        </div>
        <div className={styles.actions}>
            {downLoading && <div className={styles.fileDelete} title="File uploading">
                <CircularProgress size={"20px"} />
            </div>}
            <div className={styles.fileDelete} onClick={handleDelete} title="Delete uploaded file">
                <FontAwesomeIcon className={styles.trashIcon} icon={faTimesCircle} />
            </div>
        </div>

    </div>
}