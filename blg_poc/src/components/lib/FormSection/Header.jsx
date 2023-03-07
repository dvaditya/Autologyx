import React from 'react';
import formSectionStyles from './formSection.styles';

const Header = ({ children }) => {
  const classes = formSectionStyles();

  return <div className={classes.header}>{children}</div>;
};
export default Header;
