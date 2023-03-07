import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'components/lib';
import globalErrorsStyles from './globalErrors.styles';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

const GlobalErrors = ({ errors }) => {
  const classes = globalErrorsStyles();
  const footer = () => {
    return (
      <div className={classes.footer}>
        <Button type="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  };

  const header = () => {
    return <>System Error</>;
  };

  if (errors.length) {
    return (
      <Modal
        open={true}
        footer={footer}
        header={header}
        className={classes.modal}
      >
        <div className={classes.root}>
          <WarningOutlinedIcon />
          <div className={classes.paragraphMain}>
            Oops, it seems there has been an issue here.
          </div>
          <div className={classes.paragraph}>
            Please check your network connection. If this problem persists,
            contact your administrator.
          </div>
          <Button classNames={classes.reportProblemButton} type="secondary">
            Report problem
          </Button>
        </div>
      </Modal>
    );
  }
  return null;
};

GlobalErrors.defaultProps = {
  errors: [],
};

const mapStateToProps = ({ global }) => {
  return { errors: global.errors };
};

export default connect(mapStateToProps)(GlobalErrors);
