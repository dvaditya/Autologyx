import React from 'react';
import { connect } from 'react-redux';
import pageBarStyles from './pageBar.styles';
import SettingsIcon from '@material-ui/icons/Settings';
//import { toggleConfig as toggleConfigAction } from 'store/actions/configActions';
import { Link } from 'react-router-dom';
import BLGLogo from '../../../img/BLG_White.png';

const PageBar = ({ user, toggleConfigAction }) => {
  const classes = pageBarStyles();
  const { firstName, lastName } = user;

  return (
    <div className={classes.root}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img
            className={classes.logo}
            src={BLGLogo}
            alt="BLG Logo"
          />
        </div>
      </Link>
      <div className={classes.nameWrapper}>
        {/*user.title === "Admin" ?
          <div className={classes.icon}>
            <SettingsIcon />
          </div> :
          null*/
        }
        <div className={classes.avatar}>
          {firstName[0]}
          {lastName[0]}
        </div>{' '}
        {firstName} {lastName}
      </div>
    </div>
  );
};

PageBar.defaultProps = {
  user: {
    firstName: ' ',
    lastName: ' ',
  },
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, {  })(PageBar);
