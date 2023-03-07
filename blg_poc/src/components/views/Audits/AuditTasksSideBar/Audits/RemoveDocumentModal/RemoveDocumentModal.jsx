import React from 'react';
import { Modal, Button } from 'components/lib';
import useStyles from './removeDocumentModal.styles';

const RemoveDocumentModal = ({ open, toggleOpen, handleDelete }) => {
  const classes = useStyles();
  const renderHeader = () => <>Delete ALL Aaudit Documents</>;

  const renderFooter = () => {
    return (
      <div className={classes.footer}>
        <Button type="secondary" onClick={() => toggleOpen()}>
          Cancel
        </Button>
        <Button onClick={handleDelete} type="warning">
          Delete
        </Button>
      </div>
    );
  };
  return (
    <Modal
      open={open}
      toggleOpen={toggleOpen}
      footer={renderFooter}
      header={renderHeader}
    >
      <div className={classes.content}>
        Are you sure you want to all documents for this audit?
      </div>
    </Modal>
  );
};

export default RemoveDocumentModal;
