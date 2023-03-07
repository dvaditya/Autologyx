import { useContext, useEffect } from "react";
import { SavedFile, UnsavedFile } from "../store/filesReducer";
import { StoreContext, StoreContextType } from "../store/StoreProvider";
import { get_build, get_build_prefix } from "../uitil/build";
import axios from "axios";

const R = require("ramda")

const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;

const BUILD = get_build()

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const toBinary = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const getContentType = (extension: string) => {
    switch(extension) {
      case "zip": return "application/zip"
      case "jpg": return "image/jpeg"
      case "pdf": return "application/pdf"
      case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      case "doc": return "application/msword"
      default: return "application/octet-stream"
    }
  }

const uploadFile = async (unsavedFile: UnsavedFile, uuid: string) => {
    const b64File = await toBase64(unsavedFile.fileObject)
    if (unsavedFile.size > 6000000) {
        return handleLargeFiles(unsavedFile, uuid);
    }

    const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/create?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
        {
            method: "POST",
            headers: {
                // api_key: REACT_APP_LAMBDA_KEY as string,
                uuid
            },
            data: {
                "field_audit_module_name": unsavedFile.path[0],
                "field_audit_uuid": uuid,
                "field_document_extension": unsavedFile.extension,
                "field_document_name": unsavedFile.fileName,
                "field_document_sizebytes": unsavedFile.size,
                "field_document_typemimetype": unsavedFile.type,
                "field_document_uuid": unsavedFile.id,
                "field_name": "",
                "base64": b64File,
                "type": 5,
                "field_document_path": {"path": unsavedFile.path}
            }
        }
    );
    
    return data
}

const handleLargeFiles = async(unsavedFile: UnsavedFile, uuid: string) => {
    const binaryFile = await toBinary(unsavedFile.fileObject)
    const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/create?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
        {
            method: "POST",
            headers: {
                // api_key: REACT_APP_LAMBDA_KEY as string,
                uuid
            },
            data: {
                "field_audit_module_name": unsavedFile.path[0],
                "field_audit_uuid": uuid,
                "field_document_extension": unsavedFile.extension,
                "field_document_name": unsavedFile.fileName,
                "field_document_sizebytes": unsavedFile.size,
                "field_document_typemimetype": unsavedFile.type,
                "field_document_uuid": unsavedFile.id,
                "field_name": "",
                "request_presigned_url": true,
                "type": 5,
                "field_document_path": {"path": unsavedFile.path}
            }
        }
    );

    const contentType = getContentType(unsavedFile.extension);

    if(data && data.s3_upload_presigned_url) {
        await axios(
            `${data.s3_upload_presigned_url}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': contentType
                },
                data: binaryFile
            }
        );
    }

    return data;
};

export default () => {
    const MAX_FILES = 3
    const { state, dispatch } = useContext(StoreContext) as StoreContextType
    const { fileUploadQueue, inProgress, extractedForm } = state
    const uuid = extractedForm.fieldState.audit_uuid

    useEffect(() => {
        if (inProgress.length < 3) {
            const takeAmount = MAX_FILES - inProgress.length
            const newRecords = R.take(takeAmount, fileUploadQueue)
            if (!newRecords.length) {
                return
            }
            dispatch({
                type: "REMOVE_MULTIPLE_FILE_UPLOAD",
                payload: newRecords.reduce((acc: { [key: string]: boolean }, nr: UnsavedFile) => {
                    return {
                        ...acc,
                        [nr.id]: true
                    }
                }, {})
            })
            dispatch({
                type: "ADD_UNSAVED_IN_PROGRESS",
                payload: newRecords
            })
            newRecords.forEach(async (newRecord: UnsavedFile) => {
                try {
                    // dummy upload with random errors
                    /*await new Promise((resolve, reject) => {
                        const timeoutTime = Math.round(Math.random() * 1000)
                        if (timeoutTime < 700) {
                            setTimeout(resolve, timeoutTime)
                        } else {
                            setTimeout(reject, timeoutTime)
                        }

                    })*/
                    const res = await uploadFile(newRecord, uuid)
                    // create new SavedFile from UnsavedFile
                    const newSavedFile: SavedFile = {
                        id: newRecord.id,
                        path: newRecord.path,
                        fileName: newRecord.fileName,
                        type: newRecord.type,
                        extension: newRecord.extension,
                        size: newRecord.size,
                        dateCreated: res.field_creation_date,
                        createdBy: ""
                    }
                    // delete from unsaved
                    dispatch({
                        type: "DELETE_UNSAVED_FILE",
                        payload: {
                            path: newRecord.path,
                            id: newRecord.id
                        }
                    })
                    // add to saved
                    dispatch({
                        type: "SET_SAVED_FILE",
                        payload: {
                            path: newSavedFile.path,
                            savedFile: newSavedFile
                        }
                    })
                    //delete from inprogress
                    dispatch({
                        type: "REMOVE_UNSAVED_IN_PROGRESS",
                        payload: newSavedFile.id
                    })
                } catch(e) {
                    console.log(e)
                    // update unsaved - failed = true
                    const updatedUnsavedFile: UnsavedFile = {
                        ...newRecord,
                        failed: true
                    }
                    dispatch({
                        type: "UPDATE_UNSAVED_FILE",
                        payload: {
                            path: updatedUnsavedFile.path,
                            unSavedFile: updatedUnsavedFile
                        }
                    })
                    //delete from inprogress
                    dispatch({
                        type: "REMOVE_UNSAVED_IN_PROGRESS",
                        payload: newRecord.id
                    })
                    dispatch({
                        type: "ADD_ALERT",
                        payload: {
                            severity: "error",
                            message: `File ${newRecord.fileName} too large`,
                            id: "aaaaaaaaaa"
                        }
                    })
                }
            })
        }
    }, [inProgress, fileUploadQueue])
}