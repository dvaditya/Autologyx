import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { animated, useSpring, useChain } from 'react-spring';
import { Breadcrumb, PageTitle } from 'components/lib';
import clientsDashboard from './clientsDashboard.styles';
import { setUser } from 'store/actions/userActions';
import {
  selectMatter,
  toggleMatterDetail,
  clearMatterState,
} from 'store/actions/clientActions';
import MatterTable from './components/Table/ClientTable';
import ClientContactsModal from "./components/contacts/ClientContactsModal"
import ClientSideBar from './components/ClientAuditsSideBar';
import AuditSideBar from "../Audits/AuditTasksSideBar/SideBar"
import { useHistory } from 'react-router-dom';

const R = require("ramda")

const Home = ({
  matterBarOpen,
  matterDetailOpen,
  setUser,
  selectMatter,
  toggleMatterDetail,
  clearMatterState,
}) => {
  const classes = clientsDashboard();
  const [clientContactsModalClient, setClientContactsModalClient] = useState(null)
  const [sidebarOpen, setSideBarOpen] = useState(false)

  const _id = new URLSearchParams(useLocation().search).get('id');
  const auditId = new URLSearchParams(useLocation().search).get('auditId');
  
  const history = useHistory()
  useEffect(() => {
    if (_id !== null) {
      selectMatter(_id);
      toggleMatterDetail(true);
      setSideBarOpen(true)
    }
  }, [_id]);

  useEffect(() => {
    setUser();

    return clearMatterState;
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
    history.push(`/management/client?id=${_id}`);
  }
  return (
    <div className={classes.root}>
      <animated.div style={mainContentSpring}>
        <div className={classes.pageContent}>
          <Breadcrumb path={['Home', 'Client Management']} />
          <PageTitle>Client Management</PageTitle>
          <MatterTable setClientContactsModalClient={setClientContactsModalClient} />
          <ClientContactsModal closeModel={() => {setClientContactsModalClient(null)}} open={!!clientContactsModalClient} client={clientContactsModalClient} />
        </div>
      </animated.div>
      <animated.div style={sideBarSpring} className={classes.sidebarWrapper}>
        {!auditId && <ClientSideBar currentClient={_id} sidebarOpen={sidebarOpen} handleClose={() => setSideBarOpen(false)} />}
        {auditId && <AuditSideBar auditId={auditId} handleClose={handleCloseAuditTasksSidebar}/>}
      </animated.div>
    </div>
  );
};

const mapStateToProps = state => ({
  matterBarOpen: state.matters.open,
  matterDetailOpen: state.matters.showMatterDetail,
});
export default connect(mapStateToProps, {
  setUser,
  selectMatter,
  toggleMatterDetail,
  clearMatterState,
})(Home);
