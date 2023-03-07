import React from 'react';
import { PageBar, NavBar } from '../';
import appBarStyles from './appbars.styles';
import { useSelector } from 'react-redux';

const AppBars = ({ children }) => {
  const classes = appBarStyles();
  const user = useSelector(state => state.user);

  return (
    <div className={classes.container}>
      <NavBar user={user} />
      <div className={classes.pageWrapper}>
        <PageBar />
        <div className={classes.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default AppBars;
