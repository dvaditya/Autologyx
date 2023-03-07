import React from 'react';
import { Modal, Button } from 'components/lib';
import useStyles from './removeDocumentModal.styles';

const RemoveDocumentModal = ({ open, toggleOpen, handleDelete }) => {
  const classes = useStyles();
  const renderHeader = () => <>Remove Document</>;

  const renderFooter = () => {
    return (
      <div className={classes.footer}>
        <Button type="secondary" onClick={() => toggleOpen(null)}>
          Cancel
        </Button>
        <Button onClick={handleDelete} type="warning">
          Remove
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
        Are you sure you want to remove this document?
      </div>
    </Modal>
  );
};

export default RemoveDocumentModal;
