import React from 'react';
import { connect } from 'react-redux';
import { removeAlert as removeAlertAction } from 'store/actions/globalActions';
import { Fade } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from 'components/lib';
import alertActions from 'store/alerts/alert.actions';

const ALXAlert = ({
  id,
  title,
  content,
  type,
  buttonText,
  data,
  removeAlert,
  timeout,
  severity,
}) => {
  const Action = () => {
    React.useEffect(() => {
      setTimeout(() => removeAlert(id), timeout);
    }, [id]);

    return (
      <Button
        color="inherit"
        size="small"
        onClick={() => {
          if (type) {
            alertActions[type](data);
            removeAlert(id);
          } else {
            removeAlert(id);
          }
        }}
      >
        {buttonText}
      </Button>
    );
  };
  return (
    <Fade in={true}>
      <Alert severity={severity} action={<Action />}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Fade>
  );
};

ALXAlert.defaultProps = {
  id: -1,
  title: '',
  content: '',
  type: false,
  severity: 'success',
  buttonText: 'Close',
  data: {},
  timeout: 8000,
};

const Alerts = ({ alertsList, removeAlertAction }) => {
  return (
    <div className="alert-wrapper">
      {alertsList.map(alert => (
        <ALXAlert removeAlert={removeAlertAction} key={alert.id} {...alert} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return {
    alertsList: global.alertsList,
  };
};

export default connect(mapStateToProps, { removeAlertAction })(Alerts);
