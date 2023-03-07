import React, { useState, useEffect } from 'react';
import sidebarStyles from './sidebar.styles.js';
import { ReactComponent as CloseIcon } from 'img/close.svg';
//import Notes from './Notes/Notes';
import Audit from './Audits/Audit.js';
import { useHistory } from 'react-router-dom';

const TABS = {
  TASKS: 'Modules',
  NOTES: 'Notes',
};

export default ({
  auditId,
  handleClose,
  handleBack

}) => {
  const classes = sidebarStyles();
  const [active, setActive] = useState(TABS.TASKS);

  const history = useHistory();

  const tabs = [TABS.TASKS, /*TABS.NOTES, TABS.FILES,  TABS.DRAFTDOCUMENT, TABS.ADDITIONALDOCUMENTS*/];

  // TODO make it so component unmounts
  React.useEffect(() => {
    if (auditId === null) {
      setActive(TABS.TASKS);
    }
  }, [auditId]);

  const tabSelection = () => {
    switch (active) {
      case TABS.TASKS:
        return <Audit auditId={auditId} />
      case TABS.NOTE:
        return null //<Notes matterId={matterId} />;
      default:
        return null;
    }
  };

  const handleCloseRequest = () => {
    handleClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabsContainer}>
        {tabs.map(tab =>
          active === tab ? (
            <div
              key={tab}
              style={{
                fontWeight: 600,
                borderRight: '1px solid rgb(231, 234, 236)',
                borderLeft: '1px solid rgb(231, 234, 236)',
              }} // borderBottom: 0
              onClick={() => setActive(tab)}
              className={classes.tab}
            >
              {tab}
            </div>
          ) : (
            <div
              key={tab}
              onClick={() => setActive(tab)}
              className={classes.tab}
              style={{ borderBottom: '1px solid rgb(231, 234, 236)' }}
            >
              {tab}
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
          <div onClick={handleCloseRequest} className={classes.closeButton}>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className={classes.selectedContainer}>{tabSelection()}</div>
    </div>
  );
};