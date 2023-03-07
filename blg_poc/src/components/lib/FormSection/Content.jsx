import React from 'react';
import formSectionStyles from './formSection.styles';
const Content = ({ children }) => {
  const classes = formSectionStyles();
  return <div className={classes.content}>{children}</div>;
};
export default Content;
