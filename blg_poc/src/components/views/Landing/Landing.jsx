import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BLGLogo from 'img/blgLogo.png';

import { Grid } from '@material-ui/core';
import CardItem from './LandingCard';

const useStyles = makeStyles(theme => ({
  mainHeader: {
    backgroundColor: '#002c5f',
    width: '100vw',
    height: 50,
  },
  secondaryHeader: {
    backgroundColor: '#fff',
    width: 'calc(100vw - 12vw)',
    height: 50,
    padding: '32px 6vw',
    borderBottom: '1px solid #d0d0d0',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: 66,
  },
  logo2: {
    height: 73,
    marginLeft: '6rem',
    imageRendering: '-webkit-optimize-contrast',
    msInterpolationMode: 'nearest-neighbor',
  },
  gridWrapper: {
    padding: '22px 6vw',
  },
  gridItem: {
    alignSelf: 'stretch',
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainHeader}></div>
      <div className={classes.secondaryHeader}>
        <img
          src={BLGLogo}
          className={classes.logo}
        />
      </div>
      <div className={classes.gridWrapper}>
        <Grid container spacing={3} className={classes.gridRow}>
          <Grid className={classes.gridItem} item xs>
            <CardItem
              name="Clients Management"
              text="View all your clients and manage your associated tasks."
              to="/management/client"
              buttonText="Manage Client"
            />
          </Grid>
          <Grid className={classes.gridItem} item xs>
            <CardItem
              name="Audit Management"
              text="View all your audits"
              to="/management/audit"
              buttonText="Manage Audits"
            />
          </Grid>
          <Grid className={classes.gridItem} item xs>
            {/* <CardItem
              name="Reporting"
              text="Dashboard and claim-related reports."
              to="/reporting"
              buttonText="View Reports"
            /> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const cardStyles = {
  backgroundColor: '#fff',
  margin: '15px',
  borderRadius: '2px',
  boxShadow: '2px 2px 10px 0px #00000017',
};

const Card = ({ children }) => {
  return <div style={cardStyles}>{children}</div>;
};

export default Landing;
