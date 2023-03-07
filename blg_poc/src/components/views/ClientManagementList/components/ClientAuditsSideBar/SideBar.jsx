import React, { useState, useEffect } from 'react';
import sidebarStyles from './sidebar.styles.js';
import { ReactComponent as CloseIcon } from 'img/close.svg';
//import Notes from './Notes/Notes';
import Audits from './Audits/Audits.js';
import ClientContactsTab from '../contacts/ClientContactsTab.js';
import ClientTab from './ClientDetailTab/Client.jsx';
import { useHistory } from 'react-router-dom';

const TABS = {
  AUDITS: 'Audits',
  NOTES: 'Notes',
  CONTACTS: 'Contacts',
  CLIENT: 'Client'
};

export default ({
  currentClient,
  open,
  handleClose

}) => {
  const classes = sidebarStyles();
  const [active, setActive] = useState(TABS.AUDITS);

  const history = useHistory();

  const tabs = [TABS.AUDITS, TABS.CONTACTS, TABS.CLIENT /*TABS.NOTES, TABS.FILES,  TABS.DRAFTDOCUMENT, TABS.ADDITIONALDOCUMENTS*/];

  // TODO make it so component unmounts
  React.useEffect(() => {
    if (currentClient === null) {
      setActive(TABS.AUDITS);
    }
  }, [currentClient]);

  const tabSelection = () => {
    switch (active) {
      case TABS.AUDITS:
        return <Audits currentClient={currentClient} />
      case TABS.NOTES:
        return null //<Notes matterId={matterId} />;
      case TABS.CONTACTS:
        return <ClientContactsTab currentClient={currentClient} />
      case TABS.CLIENT:
        return <ClientTab />
      default:
        return null;
    }
  };

  const handleCloseRequest = () => {
    handleClose();
    history.push({
      pathname: '/management/client',
    });
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