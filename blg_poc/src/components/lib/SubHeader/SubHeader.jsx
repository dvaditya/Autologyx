import React from 'react';
import SubHeaderStyles from './SubHeader.styles';

const SubHeader = ({ children }) => {
  const classes = SubHeaderStyles();
  return <div className={classes.subHeader}>{children}</div>;
};

export default SubHeader;
