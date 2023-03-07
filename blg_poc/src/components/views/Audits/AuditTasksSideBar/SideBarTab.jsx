import React from 'react';
import sidebarTabStyles from './sidebarTab.styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const SideBarTab = ({ title, open, setOpen, currentTask, setCurrentTask }) => {
  const classes = sidebarTabStyles(open);

  const currentTaskClickHandler = () => {
    setOpen(false);
    setCurrentTask('');
  };

  const createTaskClickHandler = () => {
    setOpen(!open);
    if (currentTask) {
      setCurrentTask('');
    }
  };

  if (currentTask) {
    return (
      <div onClick={() => currentTaskClickHandler()} className={classes.root}>
        {title}
        {currentTask ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
    );
  }

  return (
    <div onClick={() => createTaskClickHandler()} className={classes.root}>
      {title}
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </div>
  );
};

export default SideBarTab;
