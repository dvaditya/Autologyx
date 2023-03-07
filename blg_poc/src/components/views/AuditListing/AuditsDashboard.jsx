import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { animated, useSpring, useChain } from 'react-spring';
import { Breadcrumb, PageTitle } from 'components/lib';
import auditsDashboardStyles from './auditsDashboard.styles';
import { setUser } from 'store/actions/userActions';
import {
  selectAudit,
  toggleAuditDetail,
  clearAuditState,
} from 'store/actions/auditActions';
import AuditTable from './components/Table/AuditTable';
import AuditSideBar from "../Audits/AuditTasksSideBar/SideBar"
import { useHistory } from 'react-router-dom';

const R = require("ramda")

const Home = ({
  matterBarOpen,
  matterDetailOpen,
  setUser,
  selectAudit,
  toggleAuditDetail,
  clearAuditState,
}) => {
  const classes = auditsDashboardStyles();
  const [sidebarOpen, setSideBarOpen] = useState(false)

  const auditId = new URLSearchParams(useLocation().search).get('auditId');
  
  const history = useHistory()
  useEffect(() => {
    if (auditId !== null) {
      selectAudit(auditId);
      toggleAuditDetail(true);
      setSideBarOpen(true)
    }
  }, [auditId]);

  useEffect(() => {
    setUser();

    return clearAuditState;
  }, []);

  const sidebarRef = React.useRef();
  const detailRef = React.useRef();

  const mainContentSpring = useSpring({
    width: sidebarOpen ? '75%' : '100%',
    overflowX: sidebarOpen ? 'hidden' : 'hidden',
  });

  const sideBarSpring = useSpring({
    width: sidebarOpen ? '25%' : '0%',
    overflowX: sidebarOpen ? 'visible' : 'hidden',
  });

  useChain(
    matterDetailOpen ? [sidebarRef, detailRef] : [detailRef, detailRef],
    [0, matterDetailOpen ? 0.1 : 0.6]
  );

  const handleCloseAuditTasksSidebar  = () => {
    history.push(`/management/audit`);
    setSideBarOpen(false)
  }
  return (
    <div className={classes.root}>
      <animated.div style={mainContentSpring}>
        <div className={classes.pageContent}>
          <Breadcrumb path={['Home', 'Audit Management']} />
          <PageTitle>Audit Management</PageTitle>
          <AuditTable />
        </div>
      </animated.div>
      <animated.div style={sideBarSpring} className={classes.sidebarWrapper}>
        {auditId && <AuditSideBar auditId={auditId} handleClose={handleCloseAuditTasksSidebar}/>}
      </animated.div>
    </div>
  );
};

const mapStateToProps = state => ({
  matterBarOpen: state.audits.open,
  matterDetailOpen: state.audits.showAuditDetail,
});
export default connect(mapStateToProps, {
  setUser,
  selectAudit,
  toggleAuditDetail,
  clearAuditState,
})(Home);
