import React, { useState } from 'react';
import currentDocumentStyles from './currentDocuments.styles';
//import alxConnect from '../../../../../../api/config';
//import RemoveDocumentModal from '../../../../TasksDashboard/RemoveDocumentModal';
//import { addAlert as addAlertAction } from '../../../../../../store/actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import CloudUploadOutline from '@material-ui/icons/CloudUploadOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from "@material-ui/core";
import {
  faFileImage,
  faFileAlt,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faTrashAlt,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import UploadModal from './UploadModal/UploadModal';
import { date } from 'utils';
import { get_build, get_build_prefix } from "utils/build";

// import { ReactComponent as DocxIcon } from 'img/upload-docx.svg';
// import { ReactComponent as PdfIcon } from 'img/upload-pdf.svg';
// import { ReactComponent as CsvIcon } from 'img/upload-csv.svg';
// import { ReactComponent as XlsxIcon } from 'img/upload-xlsx.svg';
import { ReactComponent as BinIcon } from 'img/bin.svg';
import axios from 'axios';
import { saveAs } from 'file-saver';


const R = require("ramda")

const { REACT_APP_LAMBDA_KEY, REACT_APP_API_URL } = process.env;
const BUILD = get_build()

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const getStructure = (path, structure) => {
  if (path.length === 0) {
      return null
  }
  else if (path.length === 1) {
      return structure
  } else {
      const newPath = R.drop(1, path)
      const newTarget = R.head(newPath)
      const newStructure = R.find(R.propEq('moduleName', newTarget), structure.subfolders)
      return getStructure(newPath, newStructure)
  }
}


const SingleDocument = ({ document }) => {
  const [downLoading, setDownloading] = useState(false)
  const classes = currentDocumentStyles();
  const dispatch = useDispatch()
  const renderIcon = (document) => {
    switch (document.field_document_extension) {
      case 'pdf':
        return <FontAwesomeIcon className={`${classes.fileImg} ${classes.red}`} icon={faFilePdf} />//<PdfIcon className={classes.docIcon}/>
      case 'docx':
        return <FontAwesomeIcon className={`${classes.fileImg} ${classes.blue}`} icon={faFileWord} />//<DocxIcon className={classes.docIcon}/>
      case 'csv':
        return <FontAwesomeIcon className={`${classes.fileImg} ${classes.green}`} icon={faFileExcel} />//<CsvIcon className={classes.docIcon}/>
      case 'xlsx':
        return <FontAwesomeIcon className={`${classes.fileImg} ${classes.green}`} icon={faFileExcel} />//<XlsxIcon className={classes.docIcon}/>
      default:
        return <FontAwesomeIcon className={`${classes.fileImg} ${classes.grey}`} icon={faFileAlt} />
    }
  }

  const handleDelete = async (e) => {
    try {
      setDownloading(true)
      e.preventDefault()
      const { data , status} = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}/documents/delete?build=${BUILD}&authorizer_object_class_id=1&object_class_id=5`,
        {
          method: "DELETE",
          headers: {
            // api_key: REACT_APP_LAMBDA_KEY, // TODO
            uuid: document.field_audit_uuid
          },
          data: {
            field_document_uuid: document.field_document_uuid
          }
        }
      );
      if (data?.error || status < 200 || status >= 300) {
        throw new Error("Error deleting document")
      }
      dispatch({
        type: "DELETE_CURRENT_TASK_DOCUMENT",
        payload: document.field_document_uuid
      })
    } catch (e) {
      setDownloading(false)
    }

  }

  const handleDownloadRequest = async (e) => {
    try {
      const uuid = document.field_document_uuid
      setDownloading(true)
      e.preventDefault()
      const { data } = await axios(
        `https://${get_build_prefix()}${REACT_APP_API_URL}//file/get?build=${BUILD}&authorizer_object_class_id=1&document_uuid=${uuid}`,
        {
          headers: {
            // api_key: REACT_APP_LAMBDA_KEY, //TODO
            uuid: document.field_audit_uuid
          }
        }
      );
      
      const downloadData = data?.base64 ? data.base64 : data?.presigned_download_url ? data.presigned_download_url : null

      if(downloadData) {
         const base64Response = await fetch(downloadData);
         const blob = await base64Response.blob();
         const f = new File([blob], document.field_document_name)
         saveAs(f)
      }
      setDownloading(false)
    } catch (e) {
      console.log(e)
      setDownloading(false)
    }
  }
  return <div className={classes.docsWrapper} key={document.id} >
    <a
      className={classes.document}
      href={"#"}
      target="_blank"
      style={{ display: 'flex', color: 'black' }}
      onClick={handleDownloadRequest}
    >
      {renderIcon(document)}
      <div className={classes.documentWrapper}>
        <span className={`${classes.documentTitle} ${classes.documentName}`}>{document.field_document_name}{document.extension}</span>
        <span className={classes.documentTitle}>{date.getDate(document.field_creation_date, false, 'MM')}</span>
        <span className={classes.documentTitle}>{bytesToSize(document.field_document_sizebytes)}</span>
      </div>
    </a>
    <div className={classes.docActions}>
      {downLoading && <div className={classes.deleteIcon} title="File deleting">
        <CircularProgress size={"18px"} />
      </div>
      }
      <div><BinIcon onClick={handleDelete} className={classes.deleteIcon} /></div>
    </div>
  </div>
}

const CurrentDocuments = ({ currentDocumentsPath }) => {
  const classes = currentDocumentStyles();
  //const dispatch = useDispatch();
  const [openedItem, setOpenItem] = useState({ opened: false, id: null });
  const [openUpload, setOpenUpload] = useState(false);
  const documents = useSelector(state => state.currentTaskDocuments.taskDocuments)

  const config = useSelector((state) => state.currentTask.config.structure)
  const auditUUID = useSelector(state => state.currentTask.taskMeta.field_audit_uuid)
  const structure = getStructure(currentDocumentsPath, config)
  const maxFiles = structure?.maxFiles ? structure.maxFiles : 0
  const filesLeft = maxFiles - documents.length

  const filterDocs = () => documents.filter((doc) => {
    return R.equals(doc.field_document_path.path, currentDocumentsPath)
  })

  if (!currentDocumentsPath || !currentDocumentsPath.length) {
    return null
  }

  const filteredDocs = filterDocs(documents)
  const lastItem = currentDocumentsPath[currentDocumentsPath.length - 1]
  return (
    <div className={classes.wrapper}>
      <div className={classes.breadCrumbs}>{currentDocumentsPath.map((pe, i) => <div className={`${classes.breadCrumb} ${lastItem === pe ? classes.lastBreadcrumb : null}`} key={pe}>{i > 0 && <React.Fragment>&nbsp;&nbsp;<FontAwesomeIcon icon={faChevronRight} />&nbsp;&nbsp;</React.Fragment>} {pe}</div>)}</div>
      <div style={{borderBottom: '1.5px solid rgb(211, 222, 231)'}}>
        <button onClick={() => setOpenUpload(true)} className={classes.uploadButton}>
          <CloudUploadOutline className={classes.icon} />
          Upload
        </button>
      </div>
      <div className={classes.documentsWrapper}>
        {documents.length ? (
          filteredDocs.map(document => <SingleDocument document={document} key={document.field_document_uuid} />)
        ) : (
          <p>No documents have been uploaded at this path.</p>
        )}
        <UploadModal open={openUpload} setOpen={setOpenUpload} path={currentDocumentsPath} numDocs={filteredDocs.length} maxDocs={maxFiles} auditUUID={auditUUID} />
      </div>
    </div>
  );
};

export default CurrentDocuments;
