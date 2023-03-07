import { Tooltip } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import navItemStyles from './navItem.styles';

const NavItem = ({ path, active, renderIcon, external, title }) => {
  const classes = navItemStyles();
  if(external) {
    return (
      <a href={path} target="_blank">
        <Tooltip title={title} arrow placement='right'>
          <div className={classes.navWrapper}>
            <div className={`${classes.navItem} ${active ? 'active' : ''}`}>
              {renderIcon()}
            </div>
          </div>
        </Tooltip>
      </a>
    );
  }
  return (
    <Link to={path} external={external}>
      <Tooltip title={title} arrow placement='right'>
        <div className={classes.navWrapper}>
          <div className={`${classes.navItem} ${active ? 'active' : ''}`}>
            {renderIcon()}
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};

NavItem.defaultProps = {
  path: '',
  active: false,
  renderIcon: () => null,
};

export default NavItem;
