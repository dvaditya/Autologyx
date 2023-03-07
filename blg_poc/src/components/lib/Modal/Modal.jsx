import React from 'react';
import Modal from 'react-modal';
import modalStyles from './Modal.styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 3,
  },
};

const ModalWrapper = ({ children, open, toggleOpen, footer, header }) => {
  const classes = modalStyles();
  function closeModal() {
    toggleOpen(false);
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="Example Modal"
      width={600}
      overlayClassName="modal-backing"
    >
      { header && <div className={classes.header}>{header()}</div> }
      {children}
      <div className={classes.footer}>{footer()}</div>
    </Modal>
  );
};

ModalWrapper.defaultProps = {
  open: false,
  toggleOpen: () => false,
  footer: () => null,
  header: () => null,
};

export default ModalWrapper;
