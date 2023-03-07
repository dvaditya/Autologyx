import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navBarStyles from './navBar.styles';
import {
  Dashboard as DashboardIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Add as AddIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
} from '@material-ui/icons';
import NavItem from './NavItem';
import BLGLogo from 'img/BLG_White.png';
import {get_build} from "../../../utils/build"
import { Tooltip } from '@material-ui/core';
const NavBar = ({ user }) => {
  const classes = navBarStyles();
  const location = useLocation();
  const BUILD = get_build()

  return (
    <div className={classes.root}>
      {[
        {
          path: '/management/client',
          active: '/management/client' === location.pathname,
          title: 'Client management',
          renderIcon: () => <DashboardIcon className={classes.navItem} />,
        },
        {
          path: '/management/audit',
          active: '/management/audit' === location.pathname,
          title: 'Audit management',
          renderIcon: () => (
            <FormatListBulletedIcon className={classes.navItem} />
          ),
        },
        {
          path: '/management/create',
          active: '/management/create' === location.pathname,
          title: 'Add new client',
          renderIcon: () => <AddIcon className={classes.navItem} />,
        },
        {
          path: `https://${BUILD}.autologyx.com/system/admin/housekeeping/outgoing-messages/list/1/`,
          title: 'Email management (Opens in a new window)',
          renderIcon: () => <EmailIcon className={classes.navIcon} />,
          external: true
        },
        
      ].map((l, i) => {
        return <NavItem key={l.path} {...l} />
      })}
    </div>
  );
};

export default NavBar;
