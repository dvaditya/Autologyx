import React from 'react';
import formSectionStyles from './formSection.styles';

const Wrapper = ({ children }) => {
  const classes = formSectionStyles();

  return <div className={classes.wrapper}>{children}</div>;
};
export default Wrapper;
