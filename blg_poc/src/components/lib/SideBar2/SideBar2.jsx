import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from 'img/close.svg';
import sidebarStyles from './sidebar.styles';

const SideBar = ({ tabs, initialTab, handleClose }) => {
  const classes = sidebarStyles();
  const [active, setActive] = useState('');
  const [tabsDict, setTabsDict] = useState({});

  React.useEffect(() => {
    const newTabsDict = {};

    tabs.map(t => {
      newTabsDict[t.title] = t;
    });

    setTabsDict(newTabsDict);
  }, [tabs]);

  React.useEffect(() => {
    setActive(initialTab);
  }, [initialTab]);

  const tabSelection = () => {
    const activeTab = tabsDict[active];
    if (typeof activeTab !== 'undefined') {
      let { Component } = tabsDict[active];
      return Component(tabsDict[active].props);
    } else return null;
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabsContainer}>
        {tabs.map(tab =>
          active === tab.title ? (
            <div
              key={tab}
              style={{
                fontWeight: 600,
                borderRight: '1px solid rgb(231, 234, 236)',
                borderLeft: '1px solid rgb(231, 234, 236)',
              }} // borderBottom: 0
              onClick={() => setActive(tab.title)}
              className={classes.tab}
            >
              {tab.title}
            </div>
          ) : (
            <div
              key={tab}
              onClick={() => setActive(tab.title)}
              className={classes.tab}
              style={{ borderBottom: '1px solid rgb(231, 234, 236)' }}
            >
              {tab.title}
            </div>
          )
        )}
        <div
          style={{
            width: '100%',
            borderBottom: '1px solid rgb(231, 234, 236)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <div onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className={classes.selectedContainer}>{tabSelection()}</div>
    </div>
  );
};

SideBar.defaultProps = {
  tabs: [],
  initialTab: '',
  handleClose: () => true,
};

export default SideBar;
