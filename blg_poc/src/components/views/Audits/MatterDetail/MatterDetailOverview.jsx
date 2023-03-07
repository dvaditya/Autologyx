import React from 'react';
import { connect } from 'react-redux';
import matterDetailOverviewStyles from './matterDetailOverview.styles';
import { editMatter } from 'store/actions/matterActions';
import { animated, useSpring } from 'react-spring';
import {
  SubHeader,
} from 'components/lib';
const MatterDetailOverview = ({
}) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div style={props}>
      <SubHeader>Document Generation</SubHeader>
    </animated.div>
  );
};

MatterDetailOverview.defaultProps = {
  ase_manager_email: '',
  lawyer_email: '',
  team_admin_email: '',
};

const mapStateToProps = state => {
  if (state.matters.currentMatter !== null) {
    const {
      id,
      name,
      claim_detail,
      claim_summary,
      ase_manager_name,
      ase_manager_email,
      lawyer_name,
      lawyer_email,
      team_admin_name,
      team_admin_email,
      days_delay,
      claimant,
      phase,
      risk,
      claim_value,
      claim_amount,
      sensitivity,
      type,
      legal_assessment_recommendation,
      legal_assessment,
    } = state.matters.currentMatter;
    return {
      id,
      name,
      claim_detail,
      claim_summary,
      ase_manager_name,
      ase_manager_email,
      lawyer_name,
      lawyer_email,
      team_admin_name,
      team_admin_email,
      days_delay,
      claimant,
      phase,
      risk,
      claim_value,
      claim_amount,
      sensitivity,
      type,
      legal_assessment_recommendation,
      legal_assessment,
    };
  }

  return {};
};

export default connect(mapStateToProps, {
  editMatter,
})(MatterDetailOverview);
