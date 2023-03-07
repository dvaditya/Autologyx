import React, { useState } from 'react';
import { Button, Modal, DropZone } from 'components/lib';
import { ReactComponent as CloseIcon } from 'img/close.svg';
import {
  addAlert as addAlertAction,
  setGlobalLoader,
} from 'store/actions/globalActions';
import useUploadModalStyles from './uploadModal.styles';
import { useDispatch } from 'react-redux';
import alxConnect from 'api/config';
import { v4 as uuidv4 } from 'uuid';
import { get_build, get_build_prefix } from 'utils/build';
import axios from 'axios';

const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;



const UploadModal = ({ open, setOpen, path, numDocs, maxDocs, auditUUID }) => {
  const [documents, setDocuments] = useState([]);
  const classes = useUploadModalStyles();
  const dispatch = useDispatch();

  const BUILD = get_build()

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const toBinary = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const getContentType = (extension) => {
    switch(extension) {
      case "zip": return "application/zip"
      case "jpg": return "image/jpeg"
      case "pdf": return "application/pdf"
      case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      case "doc": return "application/msword"
      default: return "application/octet-stream"
    }
  }

  const uploadFile = async (acceptedFile) => {
    const extensionRe = /(?:\.([^.]+))?$/;
    const extension = extensionRe.exec(acceptedFile.name)?.[1]
    const unsavedFile = {
      id: uuidv4(),
      path,
      fileName: acceptedFile.name,
      fileObject: acceptedFile,
      type: acceptedFile.type,
      size: acceptedFile.size,
      failed: false,
      extension: extension ? extension : ""
    }
    const b64File = await toBase64(unsavedFile.fileObject)
    if (unsavedFile.size > 6000000) {
      return handleLargeFiles(unsavedFile, auditUUID);
    }
    const { data } = await axios(
      `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/create?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
      {
        method: "POST",
        headers: {
          // api_key: REACT_APP_LAMBDA_KEY, // TODO
          uuid: auditUUID
        },
        data: {
          "field_audit_module_name": unsavedFile.path[0],
          "field_audit_uuid": auditUUID,
          "field_document_extension": unsavedFile.extension,
          "field_document_name": unsavedFile.fileName,
          "field_document_sizebytes": unsavedFile.size,
          "field_document_typemimetype": unsavedFile.type,
          "field_document_uuid": unsavedFile.id,
          "field_name": "",
          "base64": b64File,
          "type": 5,
          "field_document_path": { "path": unsavedFile.path }
        }
      }
    );

    return data
  }

  const handleLargeFiles = async(unsavedFile) => {
    const binaryFile = await toBinary(unsavedFile.fileObject)
    const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/create?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
        {
            method: "POST",
            headers: {
                // api_key: REACT_APP_LAMBDA_KEY as string,
                uuid: auditUUID
            },
            data: {
                "field_audit_module_name": unsavedFile.path[0],
                "field_audit_uuid": auditUUID,
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

  const handleSave = async () => {
    dispatch(setGlobalLoader(true));
    let failed = []

    for (const acceptedFile of documents) {
      try {
        const result = await uploadFile(acceptedFile)
        if (result?.id) {
          dispatch({
            type: "ADD_AUDIT_TASK_DOCUMENT",
            payload: result
          })
        } else {
          failed = [...failed, acceptedFile]
        }

      } catch (e) {
        console.log(e)
        failed = [...failed, acceptedFile]
      }
    }

    if (failed.length) {
      dispatch(
        addAlertAction({
          severity: 'error',
          title: 'Error uploading all documents',
          content:
            'Not all documents have been accepted due to the format or size',
        })
      );
      setDocuments(failed)
      dispatch(setGlobalLoader(false))
    } else {
      dispatch(setGlobalLoader(false))
      setOpen(false);
      setDocuments([]);
    }



    /*Promise.all(
      documents.map(async file => {
        try {
          const { success } = await tasks.v1.addAttachment(file, id)

          if (success) {
            setOpen(false);
            fetchDocuments()
            setDocuments([]);
          }
        } catch (e) {
          dispatch(
            addAlertAction({
              severity: 'error',
              title: 'Error uploading all documents',
              content:
                'Not all documents have been accepted due to the format or size',
            })
          );
          return false;
        }
      })
    ).then(() => dispatch(setGlobalLoader(false)));*/
  };

  const handleMultipleDrop = React.useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      setDocuments(state => {
        return [...state, file];
      });
    });
  }, []);

  const header = () => {
    return (
      <div className={classes.headerContainer}>
        <div>File Upload</div>
        <div className={classes.closeIcon}>
          <CloseIcon onClick={() => {
            setDocuments([]);
            setOpen(false);
          }} style={{ width: 25, height: 25, }} />
        </div>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className={classes.buttonContainer}>
        <Button type="primary" onClick={handleSave} disabled={documents.length === 0}>
          Save
        </Button>
      </div>
    );
  };
  const maxFiles = maxDocs - numDocs
  const filesLeft = maxFiles - documents.length

  const prompt = filesLeft > 0 ? `Drag and drop ${filesLeft > 1 && "up to "} ${filesLeft} file${filesLeft > 1 && "s"} here, or click to select files` : "No more files can be added"

  return (
    <Modal
      open={open}
      header={null}
      footer={footer}
      className={classes.modal}
    >
      <div className={classes.root}>
        {header()}
        <div className={classes.dropZoneContainer}>
          <DropZone
            maxFiles={filesLeft}
            selectedFiles={documents.length ? documents : null}
            onDrop={handleMultipleDrop}
            disabled={false}
            buttonText="Upload documents"
            multiple
            promptText={prompt}
            removeFile={file => {
              setDocuments(
                documents.filter(document => {
                  return document.path !== file;
                })
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
