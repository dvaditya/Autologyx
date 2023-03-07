import React from 'react';
import pageTitleStyles from './PageTitle.styles';
const PageTitle = ({ children }) => {
  const classes = pageTitleStyles();
  return <div className={classes.title}>{children}</div>;
};

export default PageTitle;
