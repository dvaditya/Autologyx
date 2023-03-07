import React from 'react';
import { useDropzone } from 'react-dropzone';

import dropzoneStyles from './dropzone.styles';
import PublishIcon from '@material-ui/icons/Publish';
import { CircularProgress } from '@material-ui/core';
import SelectedFilesList from './SelectedFilesList';
import Button from '../Button';

const Zone = ({
  loading,
  onDrop,
  multiple,
  buttonText,
  promptText,
  selectedFiles,
  removeFile,
  maxFiles,
  handleUploadDocuments,
}) => {
  const classes = dropzoneStyles();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    maxFiles
  });

  return (
    <div className={classes.root}>
      {maxFiles > 0 && <div className={classes.uploadContainer} {...getRootProps()}>
        <input {...getInputProps()} />
        
          <p className={classes.promptText}>{promptText}</p>
        
      </div>}
      {maxFiles <= 0 && <div className={classes.uploadContainer} >
          <p className={classes.promptText}>{promptText}</p>
      </div>}
      { selectedFiles && <SelectedFilesList removeFile={removeFile} files={selectedFiles} /> }
      {loading ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress size={55} className={classes.loader} />
        </div>
      ) : null}
    </div>
  );
};

Zone.defaultProps = {
  maxFiles: 0,
  buttonText: 'Select a file',
  promptText: 'Select a file or drag here',
  loading: false,
  multiple: false,
  selectedFiles: false,
  onDrop: () => true,
  handleUploadDocuments: () => true,
};

export default Zone;
