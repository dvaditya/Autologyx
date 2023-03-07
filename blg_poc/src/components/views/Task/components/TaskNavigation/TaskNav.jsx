import React, { useEffect, useState } from 'react';
import taskNavStyles from './taskNav.styles';

import { useDispatch, useSelector } from 'react-redux';
import NavItem from './NavItem';

const TaskNav = ({currentPath, setCurrentPath, currentTabIndex, currentDocumentsPath, setCurrentDocumentsPath, setCurrentTabIndex}) => {
  const classes = taskNavStyles();
  const navigationTabs = useSelector((state) => state.currentTask?.navigationTabs)
  if(!navigationTabs){
    return null
  } else {
    return <div style={{maxHeight:'70vh',width: "20%", overflowY: "auto", height: "fit-content", overflowX: "hidden", borderRight: '1.5px solid rgb(211, 222, 231)', borderLeft: '1.5px solid rgb(211, 222, 231)', borderBottom: '1.5px solid rgb(211, 222, 231)'}}>
      <NavItem  navMeta={navigationTabs} currentPath={currentPath} setCurrentPath={setCurrentPath} currentDocumentsPath={currentDocumentsPath} setCurrentDocumentsPath={setCurrentDocumentsPath} currentTabIndex={currentTabIndex} setCurrentTabIndex={setCurrentTabIndex} />
      </div>
  }
  
};

export default TaskNav;
