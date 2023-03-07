import React from 'react';
import selectedFilesListStyles from './selectedFilesList.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFileImage,
    faFileAlt,
    faFilePdf,
    faFileWord,
    faFileExcel,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
// import { ReactComponent as DocxIcon } from 'img/upload-docx.svg';
// import { ReactComponent as PdfIcon } from 'img/upload-pdf.svg';
// import { ReactComponent as XlsxIcon } from 'img/upload-xlsx.svg';

const getImage = (type) => {

    // <DocxIcon className={classes.docIcon}/>
    // <XlsxIcon className={classes.docIcon}/>

  const classes = selectedFilesListStyles();
    const img = () => {
        switch(type){
            case 'image/png':
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.orange}`} icon={faFileImage} />
            case 'application/pdf':
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.red}`} icon={faFilePdf} />
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.blue}`} icon={faFileWord} />
            case '.docx':
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.blue}`} icon={faFileWord} />
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.green}`} icon={faFileExcel} />
            default:
                return <FontAwesomeIcon className={`${classes.fileImg} ${classes.grey}`} icon={faFileAlt} />
        }
    }
    return img
} 

const File = ({ type, name, size, handleFileDelete, id, showDelete }) => {

  const FileImg = getImage(type)

  const classes = selectedFilesListStyles();

  return (
      <div className={classes.fileContainer}>
          <div className={classes.fileContents}>
              <div className={classes.img}>
                  <FileImg />
              </div>
              <div className={classes.fileNameContents}>
                  <div className={classes.fileName}>
                      {name}
                  </div>
                  <div>
                      {size}
                  </div>
              </div>
          </div>
          { showDelete && <div className={classes.fileDelete} onClick={() => handleFileDelete(id)}>
              <FontAwesomeIcon className={classes.trashIcon} icon={faTrashAlt} />
          </div>}

      </div>
  )
}

File.defaultProps = {
  showDelete: true,  
  handleFileDelete: () => null
}

const SelectedFilesList = ({ files, removeFile }) => {
  const classes = selectedFilesListStyles();
  return (
    <div className={classes.fileListContainer}>
      {files.map(file =>
        <File 
        key={file.name} 
        handleFileDelete={() => removeFile(file.name)} 
        type={file.type} name={file.name} 
        size={(file.size / 1028) > 1020 ?  `${((file.size / 1028) / 1028).toFixed(2)}MB` : `${(file.size / 1028).toFixed(2)}KB` }
        id={file.name}    
    />
        )}
        </div>
  );
};

SelectedFilesList.defaultProps = {
  files: [],
};

export { SelectedFilesList as default, File,};