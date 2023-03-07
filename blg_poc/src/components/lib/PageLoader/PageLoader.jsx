import React from 'react';
import { connect } from 'react-redux';
import pageLoaderStyles from './pageLoader.styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const PageLoader = ({ show, message }) => {
  const classes = pageLoaderStyles();
  return  (
    show ? <div className={classes.root}>
      <div>
        {message ? <div className={classes.message}>{message}</div> : null}
        </div>
        <CircularProgress size={60} />
      </div> : null
  ) ;
};

const mapStateToProps = ({ global }) => {
  return {
    show: global.globalLoader || global.globalLoaderItems.length,
    message: global.message
  };
};

export default connect(mapStateToProps)(PageLoader);
