import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ArrowRightIcon } from 'img/arrow-right.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as CloseIcon } from 'img/close-icon.svg';
import {
  toggleMatterDetail,
  hideMatterDetailOnly,
  editMatter,
  initiateRelativityCall as initiateRelativityCallAction,
  getRelativityData as getRelativityDataAction,
} from 'store/actions/matterActions';
import { getContracts } from 'store/actions/contractsActions';
import matterDetailStyles from './matterDetail.styles';
import DocumentGeneration from './DocumentForms/DocumentGeneration';

const TABS = {
  OVERVIEW: 'Overview',
  LEGAL_ASSESMENT: 'Legal Assessment',
  DISPOSITION_PLAN: 'Disposition Plan',
};

const MatterDetail = ({
  // connect props
  id,
  name,
  status,
  setCurrentTask,

  // parent props
  detailSpring,

  // actions
  hideMatterDetailOnly,
  toggleMatterDetail,
  editMatter,
  getContracts,
  initiateRelativityCallAction,
  getRelativityDataAction,
}) => {
  const classes = matterDetailStyles();
  const location = useLocation();
  const history = useHistory();
  const [tabState, setTabState] = React.useState(TABS.OVERVIEW);

  // TODO make it so component unmounts
  React.useEffect(() => {
    if (id !== null) {
      setTabState(TABS.OVERVIEW);
      initiateRelativityCallAction(id);
      getRelativityDataAction(id);
    }
  }, [id]);

  const removeIdQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('id')) {
      queryParams.delete('id');
      history.replace({
        search: queryParams.toString(),
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.closeBar}>
        <div
          onClick={() => {
            removeIdQueryParams();
            toggleMatterDetail(false);
            setCurrentTask('')
          }}
          className={classes.iconWrapper}
        >
          <CloseIcon className={classes.closeIcon} />
        </div>
        <div
          onClick={() => {
            removeIdQueryParams();
            hideMatterDetailOnly();
          }}
          className={classes.iconWrapper}
        >
          <ArrowRightIcon className={classes.hideIcon} />
        </div>
      </div>
      <div className={classes.detailWrapper} style={detailSpring}>
        <div>
          <div className={classes.detailNavWrapper}>
            {name}
          </div>
          <div>
          </div>
        </div>
        <div className={classes.detail}>
          <DocumentGeneration />
        </div>
      </div>
    </div>
  );
};

MatterDetail.defaultProps = {
  id: null,
};

const mapStateToProps = state => {
  if (state.matters.currentMatter !== null) {
    const { id, name, status } = state.matters.currentMatter;

    return {
      id,
      name,
      status,
    };
  }

  return {};
};

export default connect(mapStateToProps, {
  toggleMatterDetail,
  hideMatterDetailOnly,
  editMatter,
  getContracts,
  initiateRelativityCallAction,
  getRelativityDataAction,
})(MatterDetail);
